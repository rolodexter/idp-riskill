/**
 * Widget Tray - For IDP Riskill dashboard
 * Manages hidden widgets with drag-and-drop functionality
 * Enforces 5-widget constraint in the KPI row
 */
class WidgetTray {
    constructor() {
        this.init();
    }

    init() {
        // Initialize after DOM content is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('Initializing Widget Tray System');
        this.findOrCreateTrayElement();
        this.setupDragAndDrop();
        this.setupWidgets();
        this.loadWidgetPositions();
    }

    findOrCreateTrayElement() {
        // First check if tray already exists in DOM
        let tray = document.querySelector('.widget-tray');
        
        if (!tray) {
            // Get the KPI row
            const kpiRow = document.querySelector('.kpi-row');
            if (!kpiRow) {
                console.error('KPI row not found, cannot initialize Widget Tray');
                return;
            }
            
            // Create tray widget
            tray = document.createElement('div');
            tray.className = 'kpi-widget widget-tray';
            tray.id = 'widget-tray';
            
            // Add widget title
            const trayTitle = document.createElement('div');
            trayTitle.className = 'widget-title';
            trayTitle.textContent = 'Hidden Widgets';
            tray.appendChild(trayTitle);
            
            // Create tray content area
            const trayContent = document.createElement('div');
            trayContent.className = 'widget-tray-content';
            
            // Add empty state message
            const emptyState = document.createElement('div');
            emptyState.className = 'widget-tray-empty';
            emptyState.textContent = 'Drag widgets here to hide them';
            trayContent.appendChild(emptyState);
            
            // Add content to tray
            tray.appendChild(trayContent);
            
            // Add to KPI row as the last widget
            kpiRow.appendChild(tray);
        }
        
        // Store reference
        this.tray = tray;
        this.trayContent = tray.querySelector('.widget-tray-content');
    }

    setupDragAndDrop() {
        const kpiRow = document.querySelector('.kpi-row');
        const trayContent = this.trayContent;
        
        if (!kpiRow || !trayContent || !window.Sortable) {
            console.error('Missing required elements or Sortable library for drag-and-drop');
            return;
        }
        
        // Initialize Sortable on KPI row
        this.kpiRowSortable = window.Sortable.create(kpiRow, {
            group: 'widgets',
            animation: 150,
            ghostClass: 'widget-drag-ghost',
            chosenClass: 'widget-drag-chosen',
            filter: '.widget-tray', // Don't allow dragging the tray itself
            onStart: () => {
                kpiRow.classList.add('sorting');
            },
            onEnd: (evt) => {
                kpiRow.classList.remove('sorting');
                
                // Enforce 5 widgets in row constraint
                this.enforceWidgetConstraints();
                
                // If widget moved to tray, create mini widget
                if (evt.to === trayContent && evt.from !== trayContent) {
                    this.createMiniWidget(evt.item);
                }
                
                this.saveWidgetPositions();
            }
        });
        
        // Initialize Sortable on widget tray
        this.trayContentSortable = window.Sortable.create(trayContent, {
            group: 'widgets',
            animation: 150,
            ghostClass: 'widget-drag-ghost',
            chosenClass: 'widget-drag-chosen',
            onAdd: (evt) => {
                // Remove the empty state message if present
                const emptyState = trayContent.querySelector('.widget-tray-empty');
                if (emptyState) {
                    emptyState.remove();
                }
            },
            onEnd: () => {
                this.saveWidgetPositions();
            }
        });
    }
    
    /**
     * Creates a mini widget representation in the tray for a widget
     * that was moved from the KPI row
     */
    createMiniWidget(originalWidget) {
        const widgetId = originalWidget.id || '';
        const widgetTitle = originalWidget.querySelector('.kpi-label')?.textContent || 'Widget';
        const widgetValue = originalWidget.querySelector('.kpi-value')?.textContent || '';
        
        const miniWidget = document.createElement('div');
        miniWidget.className = 'mini-widget';
        miniWidget.setAttribute('data-original-id', widgetId);
        miniWidget.setAttribute('data-widget-title', widgetTitle);
        
        miniWidget.innerHTML = `
            <div class="mini-widget-label">${widgetTitle}</div>
            <div class="mini-widget-value">${widgetValue}</div>
        `;
        
        // Replace the original widget with this mini representation
        originalWidget.parentNode.replaceChild(miniWidget, originalWidget);
        
        // Check for empty state
        if (this.trayContent.querySelector('.widget-tray-empty')) {
            this.trayContent.querySelector('.widget-tray-empty').remove();
        }
        
        return miniWidget;
    }
    
    /**
     * Enforces the constraint of exactly 5 widgets in the KPI row
     * (not counting the tray itself)
     */
    enforceWidgetConstraints() {
        const kpiRow = document.querySelector('.kpi-row');
        const widgets = Array.from(kpiRow.children).filter(el => 
            el.classList.contains('kpi-widget') && !el.classList.contains('widget-tray')
        );
        
        // Always ensure 5 widgets in row (not counting tray)
        if (widgets.length < 5) {
            // Need to move widgets from tray to row
            const needed = 5 - widgets.length;
            const miniWidgets = Array.from(this.trayContent.children).filter(
                el => el.classList.contains('mini-widget')
            );
            
            for (let i = 0; i < Math.min(needed, miniWidgets.length); i++) {
                const miniWidget = miniWidgets[i];
                const widgetId = miniWidget.getAttribute('data-original-id');
                const widgetTitle = miniWidget.getAttribute('data-widget-title');
                
                // Create a placeholder widget to replace mini widget
                const newWidget = this.createPlaceholderWidget(widgetId, widgetTitle);
                
                // Add back to row
                kpiRow.insertBefore(newWidget, this.tray);
                
                // Remove mini widget
                miniWidget.remove();
            }
            
            // Add empty state if tray is now empty
            if (this.trayContent.children.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'widget-tray-empty';
                emptyState.textContent = 'Drag widgets here to hide them';
                this.trayContent.appendChild(emptyState);
            }
        } 
        else if (widgets.length > 5) {
            // Need to move widgets from row to tray
            const excess = widgets.length - 5;
            
            // Move the last 'excess' widgets to tray (excluding the tray itself)
            for (let i = 0; i < excess; i++) {
                // Get last widget that's not the tray
                const lastWidget = [...kpiRow.children]
                    .filter(el => el.classList.contains('kpi-widget') && !el.classList.contains('widget-tray'))
                    .pop();
                    
                if (lastWidget) {
                    this.createMiniWidget(lastWidget);
                }
            }
        }
    }
    
    /**
     * Creates a placeholder widget based on minimal info
     */
    createPlaceholderWidget(id, title) {
        const widget = document.createElement('div');
        widget.className = 'kpi-widget';
        widget.id = id || `widget-${Date.now()}`;
        
        const widgetTitle = document.createElement('div');
        widgetTitle.className = 'widget-title';
        widgetTitle.textContent = title || 'Widget';
        
        const valueDiv = document.createElement('div');
        valueDiv.className = 'kpi-value';
        valueDiv.textContent = '--';
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'kpi-label';
        labelDiv.textContent = title || 'Widget';
        
        const sparklineDiv = document.createElement('div');
        sparklineDiv.className = 'kpi-sparkline';
        
        widget.appendChild(widgetTitle);
        widget.appendChild(valueDiv);
        widget.appendChild(labelDiv);
        widget.appendChild(sparklineDiv);
        
        return widget;
    }

    /**
     * Saves current widget positions to localStorage
     */
    saveWidgetPositions() {
        try {
            const kpiRow = document.querySelector('.kpi-row');
            const widgets = Array.from(kpiRow.children)
                .filter(el => el.classList.contains('kpi-widget') && !el.classList.contains('widget-tray'))
                .map(el => {
                    return {
                        id: el.id || '',
                        title: el.querySelector('.widget-title')?.textContent || '',
                        label: el.querySelector('.kpi-label')?.textContent || '',
                        value: el.querySelector('.kpi-value')?.textContent || ''
                    };
                });
            
            const hiddenWidgets = Array.from(this.trayContent.children)
                .filter(el => el.classList.contains('mini-widget'))
                .map(el => {
                    return {
                        id: el.getAttribute('data-original-id') || '',
                        title: el.getAttribute('data-widget-title') || '',
                        label: el.querySelector('.mini-widget-label')?.textContent || '',
                        value: el.querySelector('.mini-widget-value')?.textContent || ''
                    };
                });
            
            localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
            localStorage.setItem('dashboardHiddenWidgets', JSON.stringify(hiddenWidgets));
            console.log('Saved widget positions');
        } catch (error) {
            console.error('Failed to save widget positions:', error);
        }
    }
    
    /**
     * Loads widget positions from localStorage
     */
    loadWidgetPositions() {
        try {
            const savedWidgets = localStorage.getItem('dashboardWidgets');
            const savedHiddenWidgets = localStorage.getItem('dashboardHiddenWidgets');
            
            if (savedWidgets) {
                // In a full implementation, we'd restore the exact widget layout
                // This is just a placeholder for now
                console.log('Found saved widget positions:', JSON.parse(savedWidgets));
            }
            
            if (savedHiddenWidgets) {
                console.log('Found saved hidden widgets:', JSON.parse(savedHiddenWidgets));
            }
            
            // Ensure 5 widgets constraint
            setTimeout(() => this.enforceWidgetConstraints(), 100);
        } catch (error) {
            console.error('Failed to load widget positions:', error);
        }
    }
    
    /**
     * Sets up the initial widgets if needed
     */
    setupWidgets() {
        // Make sure the tray has a title
        if (!this.tray.querySelector('.widget-title')) {
            const title = document.createElement('div');
            title.className = 'widget-title';
            title.textContent = 'Hidden Widgets';
            this.tray.insertBefore(title, this.tray.firstChild);
        }
    }
}

// Auto-initialize
new WidgetTray();
