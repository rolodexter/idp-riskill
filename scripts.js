// Handle responsive widget sizing and content density switching
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger/mobile menu interactivity
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');

    // --- Responsive KPI micro mode based on window size ---
    const kpiWidgets = document.querySelectorAll('.kpi-widget');
    function setKpiMicroMode(forceMicro) {
        kpiWidgets.forEach(widget => {
            widget.classList.remove('standard', 'compact', 'expanded', 'micro');
            if (forceMicro) {
                widget.classList.add('micro');
                simplifyContent(widget, 'micro');
            } else {
                // Let ResizeObserver re-assign correct mode
                // updateWidgetDensity(widget, widget.getBoundingClientRect());
            }
        });
    }
    function checkKpiDensityForBreakpoint() {
        // Check both hamburger visibility AND if mobile menu overlay is active
        const hamburger = document.getElementById('hamburger-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        
        // Check if hamburger is visible via CSS OR if mobile menu is active
        const hamburgerVisible = hamburger && window.getComputedStyle(hamburger).display !== 'none';
        const menuActive = mobileMenuOverlay && mobileMenuOverlay.classList.contains('active');
        
        // If either condition is true, use micro mode
        if (hamburgerVisible || menuActive) {
            setKpiMicroMode(true);
        } else if (window.innerWidth > 700 && window.innerWidth <= 1000) {
            // Force compact mode for intermediate widths
            kpiWidgets.forEach(widget => {
                widget.classList.remove('standard', 'micro', 'expanded');
                widget.classList.add('compact');
                simplifyContent(widget, 'compact');
            });
        } else {
            setKpiMicroMode(false);
        }
    }
    // Enhanced resize handler with debouncing and forced rechecks
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        // Immediate check for quicker feedback
        requestAnimationFrame(function() {
            checkKpiDensityForBreakpoint();
            forceMicroModeOnMobile();
        });
        
        // Delayed check to ensure CSS media queries have been fully applied
        resizeTimer = setTimeout(function() {
            checkKpiDensityForBreakpoint();
            forceMicroModeOnMobile();
        }, 150);
    });
    
    // Triple-check approach for initial micro mode on mobile devices
    // 1. Immediate check via requestAnimationFrame
    requestAnimationFrame(checkKpiDensityForBreakpoint);
    
    // 2. Explicit mobile check that doesn't rely solely on CSS visibility
    function forceMicroModeOnMobile() {
        // Check screen width directly for mobile devices
        if (window.innerWidth <= 700) {
            setKpiMicroMode(true);
        }
    }
    requestAnimationFrame(forceMicroModeOnMobile);
    
    // 3. Delayed check to ensure CSS has fully applied (especially for mobile/Safari)
    setTimeout(function() {
        checkKpiDensityForBreakpoint();
        forceMicroModeOnMobile();
    }, 100);


    if (hamburger && mobileMenuOverlay && closeMobileMenu) {
        const kpiWidgets = document.querySelectorAll('.kpi-widget');
        hamburger.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            // Force all KPI widgets to micro mode
            kpiWidgets.forEach(widget => {
                widget.classList.remove('standard', 'compact', 'expanded');
                widget.classList.add('micro');
                simplifyContent(widget, 'micro');
            });
        });
        function restoreKpiDensity() {
            kpiWidgets.forEach(widget => {
                // Let ResizeObserver re-assign correct mode
                widget.classList.remove('micro');
                // Optionally, trigger updateWidgetDensity manually if needed
                // updateWidgetDensity(widget, widget.getBoundingClientRect());
            });
        }
        closeMobileMenu.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            restoreKpiDensity();
        });
        // Optional: close menu when clicking outside or pressing Escape
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                restoreKpiDensity();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                mobileMenuOverlay.classList.remove('active');
                restoreKpiDensity();
            }
        });
    }

    // ResizeObserver to detect container size changes
    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            const element = entry.target;
            if (element.classList.contains('kpi-widget')) {
                updateWidgetDensity(element, entry.contentRect);
            }
        }
    });

    // Get all widgets
    const widgets = document.querySelectorAll('.kpi-widget');
    widgets.forEach(widget => {
        // Start observing each widget
        resizeObserver.observe(widget);
        
        // Add hover effect for glassmorphism enhancement
        widget.addEventListener('mouseenter', () => {
            widget.style.backdropFilter = 'blur(12px)';
            widget.style.background = 'rgba(255, 255, 255, 0.08)';
        });
        
        widget.addEventListener('mouseleave', () => {
            widget.style.backdropFilter = 'blur(8px)';
            widget.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // Menu item glow effect
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.textShadow = '0 0 10px rgba(62, 149, 255, 0.7)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.textShadow = 'none';
        });
    });
});

// Function to update widget density based on container size
function updateWidgetDensity(widget, rect) {
    const { width, height } = rect;
    const area = width * height;
    const aspectRatio = width / height;
    
    // Remove any existing density classes
    widget.classList.remove('micro', 'standard', 'compact', 'expanded');
    
    // Check if we should override based on window width
    if (window.innerWidth <= 700) {
        // Force micro mode on small screens
        widget.classList.add('micro');
        simplifyContent(widget, 'micro');
        return;
    }
    
    // Check if hamburger menu is active - another condition for forcing micro mode
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
        widget.classList.add('micro');
        simplifyContent(widget, 'micro');
        return;
    }
    
    // Check if we're in the compact breakpoint range (701-1000px)
    if (window.innerWidth > 700 && window.innerWidth <= 1000) {
        widget.classList.add('compact');
        simplifyContent(widget, 'compact');
        return;
    }
    
    // Determine layout orientation based on aspect ratio
    let orientation = 'balanced';
    if (aspectRatio > 1.8) {
        orientation = 'horizontal';
    } else if (aspectRatio < 0.8) {
        orientation = 'vertical';
    }
    
    // Add data attribute for orientation-specific styling
    widget.setAttribute('data-orientation', orientation);
    
    // If no overrides, use area-based density with intelligent content prioritization
    if (area < 6000) {
        widget.classList.add('micro');
        simplifyContent(widget, 'micro');
    } else if (area < 16000) {
        widget.classList.add('compact');
        simplifyContent(widget, 'compact');
    } else if (area < 30000) {
        widget.classList.add('standard');
        simplifyContent(widget, 'standard');
    } else {
        // Note: Per strategic guidance, we're no longer using expanded mode for KPI widgets
        widget.classList.add('standard');
        simplifyContent(widget, 'standard');
    }
}

// Function to adjust content based on density mode and strategic content formulas
function simplifyContent(widget, densityMode) {
    const kpiLabel = widget.querySelector('.kpi-label');
    const kpiTrend = widget.querySelector('.kpi-trend');
    const kpiValue = widget.querySelector('.kpi-value');
    const urgencySignal = widget.querySelector('.urgency-signal');
    const indicator = widget.querySelector('.indicator');
    const orientation = widget.getAttribute('data-orientation');
    
    // Reset all possible modifications
    if (kpiLabel) kpiLabel.style.display = '';
    if (kpiTrend) kpiTrend.style.display = '';
    if (kpiValue) {
        kpiValue.style.fontSize = '';
        kpiValue.style.fontWeight = '';
    }
    if (urgencySignal) urgencySignal.style.display = '';
    
    // Apply content strategy based on density mode
    switch(densityMode) {
        case 'micro':
            // Micro Mode: Focus on critical alerts and core metrics
            if (kpiLabel) kpiLabel.style.display = 'none';
            if (kpiTrend) kpiTrend.style.display = 'none';
            if (kpiValue) {
                kpiValue.style.fontSize = 'var(--text-lg)';
                kpiValue.style.fontWeight = 'var(--font-bold)';
            }
            if (widget.classList.contains('crisis')) {
                // Make crisis widgets pulse in micro mode per strategic notes
                if (indicator) indicator.classList.add('pulsing-urgent');
            }
            break;
            
        case 'compact':
            // Compact Mode: Before/after transformations and key metrics
            if (kpiLabel) kpiLabel.style.display = 'block';
            if (kpiTrend) kpiTrend.style.display = 'flex';
            
            // Apply orientation-specific layout adjustments
            if (orientation === 'horizontal') {
                widget.classList.add('horizontal-layout');
            } else if (orientation === 'vertical') {
                widget.classList.add('vertical-layout');
            }
            
            // For transition widgets (showing before→after), enhance visibility with process flow animation
            if (kpiValue && (kpiValue.textContent.includes('→'))) {
                kpiValue.classList.add('transition-highlight');
                
                // Extract before and after values for process flow visualization
                const valueParts = kpiValue.textContent.split('→');
                if (valueParts.length === 2) {
                    const beforeValue = valueParts[0].trim();
                    const afterValue = valueParts[1].trim();
                    
                    // Create process flow visualization if it doesn't exist
                    if (!widget.querySelector('.process-flow')) {
                        const processFlow = document.createElement('div');
                        processFlow.className = 'process-flow';
                        processFlow.innerHTML = `
                            <div class="process-before">${beforeValue}</div>
                            <div class="process-arrow">
                                <i class="ph-bold ph-arrow-right"></i>
                            </div>
                            <div class="process-after">${afterValue}</div>
                        `;
                        
                        // Add process flow after kpi-trend
                        const kpiContent = widget.querySelector('.kpi-content');
                        if (kpiContent) {
                            kpiContent.appendChild(processFlow);
                        }
                    }
                }
            }
            break;
            
        case 'standard':
            // Standard Mode: Progress bars, recovery potential, full context
            if (kpiLabel) kpiLabel.style.display = 'block';
            if (kpiTrend) {
                kpiTrend.style.display = 'flex';
                
                // Enhance recovery/automation metrics visualization
                const trendValue = kpiTrend.querySelector('.trend-value');
                if (trendValue && trendValue.textContent.includes('%')) {
                    // Extract percentage value for the progress bar
                    const percentText = trendValue.textContent;
                    const percentMatch = percentText.match(/\d+/);
                    
                    if (percentMatch) {
                        const percentValue = parseInt(percentMatch[0]);
                        // Set the custom property for the progress bar width
                        trendValue.style.setProperty('--percentage-value', percentValue);
                        trendValue.classList.add('percentage-highlight');
                        
                        // Add automation opportunity visualization
                        const kpiLabel = widget.querySelector('.kpi-label');
                        if (kpiLabel && (kpiLabel.textContent.includes('Documents') || 
                                         kpiLabel.textContent.includes('Dates'))) {
                            widget.classList.add('automation-opportunity');
                        }
                        
                        // Add transformation visualization
                        if (widget.classList.contains('improvement') || 
                            widget.classList.contains('optimization')) {
                            widget.classList.add('transformation-highlight');
                        }
                    }
                }
            }
            break;
    }
    
    // Special treatment for crisis widgets across all modes
    if (widget.classList.contains('crisis')) {
        widget.classList.add('priority-content');
    }
}

// Enhanced Widget Functionality for Financial Anomalies and Supply Chain Management
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements for better performance
    const domCache = {
        // Financial Anomalies elements
        filterBtn: document.querySelector('.financial-anomalies .filter-btn'),
        filterPanel: document.querySelector('.financial-anomalies .filter-panel'),
        anomalyItems: document.querySelectorAll('.anomaly-item'),
        expandBtn: document.querySelector('.financial-anomalies .expand-btn'),
        financialAnomaliesWidget: document.querySelector('.financial-anomalies'),
        anomalyContainer: document.querySelector('.financial-anomalies .anomaly-list'),
        
        // Supply Chain elements
        supplyChainWidget: document.querySelector('.kpi-widget.supply-chain'),
        supplyChainDropdown: document.querySelector('.kpi-dropdown'),
        supplierItems: document.querySelectorAll('.supplier-item'),
        
        // Empty state elements
        emptyStateContainers: document.querySelectorAll('.placeholder-content')
    };
    
    // Error handling utility
    const errorHandler = {
        logError: function(component, error) {
            console.error(`Error in ${component}:`, error);
            // Could be extended to show user-facing error messages
        },
        showUIError: function(container, message) {
            if (!container) return;
            
            const errorElement = document.createElement('div');
            errorElement.className = 'ui-error-message';
            errorElement.innerHTML = `
                <i class="ph-fill ph-warning"></i>
                <span>${message}</span>
            `;
            container.appendChild(errorElement);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (errorElement.parentNode) {
                    errorElement.parentNode.removeChild(errorElement);
                }
            }, 5000);
        }
    };
    
    // Empty state handler
    const emptyStateHandler = {
        checkAndApply: function() {
            // Check all containers that might have empty states
            domCache.emptyStateContainers.forEach(container => {
                if (!container.children.length || 
                    (container.children.length === 1 && container.children[0].classList.contains('empty-state-message'))) {
                    this.showEmptyState(container);
                }
            });
            
            // Check anomaly list specifically
            if (domCache.anomalyContainer && 
                (!domCache.anomalyContainer.children.length || 
                 (domCache.anomalyContainer.querySelectorAll('.anomaly-item:not([style*="display: none"])')).length === 0)) {
                this.showEmptyState(domCache.anomalyContainer, 'No anomalies match the current filters');
            }
        },
        
        showEmptyState: function(container, customMessage) {
            // Don't add if already has empty state
            if (container.querySelector('.empty-state-message')) return;
            
            const message = customMessage || 'No data available';
            const emptyStateElement = document.createElement('div');
            emptyStateElement.className = 'empty-state-message';
            emptyStateElement.innerHTML = `
                <i class="ph-fill ph-info"></i>
                <p>${message}</p>
            `;
            container.appendChild(emptyStateElement);
        },
        
        removeEmptyState: function(container) {
            const emptyState = container.querySelector('.empty-state-message');
            if (emptyState) {
                emptyState.parentNode.removeChild(emptyState);
            }
        }
    };
    
    // Initialize empty states
    try {
        emptyStateHandler.checkAndApply();
    } catch (error) {
        errorHandler.logError('Empty State Initialization', error);
    }
    
    // Financial Anomalies Widget - Filter Button Toggle
    if (domCache.filterBtn && domCache.filterPanel) {
        // Store event handler references for cleanup
        const filterBtnClickHandler = function(e) {
            try {
                e.stopPropagation();
                domCache.filterPanel.style.display = domCache.filterPanel.style.display === 'none' ? 'block' : 'none';
            } catch (error) {
                errorHandler.logError('Filter Button Click', error);
            }
        };
        
        domCache.filterBtn.addEventListener('click', filterBtnClickHandler);
        
        // Close filter panel when clicking outside
        const documentClickHandler = function(e) {
            try {
                if (!domCache.filterPanel.contains(e.target) && e.target !== domCache.filterBtn) {
                    domCache.filterPanel.style.display = 'none';
                }
            } catch (error) {
                errorHandler.logError('Document Click Handler', error);
            }
        };
        
        document.addEventListener('click', documentClickHandler);
        
        // Filter checkboxes functionality
        const filterCheckboxes = domCache.filterPanel.querySelectorAll('input[type="checkbox"]');
        filterCheckboxes.forEach(checkbox => {
            const checkboxChangeHandler = function() {
                try {
                    const filterType = this.parentElement.textContent.trim().toLowerCase();
                    let visibleItemCount = 0;
                    
                    domCache.anomalyItems.forEach(item => {
                        const itemText = item.textContent.toLowerCase();
                        if (itemText.includes(filterType)) {
                            item.style.display = this.checked ? 'flex' : 'none';
                        }
                        
                        // Count visible items for empty state handling
                        if (item.style.display !== 'none') {
                            visibleItemCount++;
                        }
                    });
                    
                    // Handle empty state if all items are filtered out
                    if (visibleItemCount === 0 && domCache.anomalyContainer) {
                        emptyStateHandler.showEmptyState(domCache.anomalyContainer, 'No anomalies match the current filters');
                    } else if (domCache.anomalyContainer) {
                        emptyStateHandler.removeEmptyState(domCache.anomalyContainer);
                    }
                } catch (error) {
                    errorHandler.logError('Filter Checkbox Change', error);
                }
            };
            
            checkbox.addEventListener('change', checkboxChangeHandler);
            
            // Store handler reference for potential cleanup
            checkbox._changeHandler = checkboxChangeHandler;
        });
    }
    
    // Supply Chain Management Widget - Dropdown Toggle
    if (domCache.supplyChainWidget && domCache.supplyChainDropdown) {
        const supplyChainClickHandler = function(e) {
            try {
                e.stopPropagation();
                domCache.supplyChainDropdown.style.display = domCache.supplyChainDropdown.style.display === 'none' ? 'block' : 'none';
            } catch (error) {
                errorHandler.logError('Supply Chain Widget Click', error);
            }
        };
        
        domCache.supplyChainWidget.addEventListener('click', supplyChainClickHandler);
        
        // Close dropdown when clicking outside
        const documentClickHandler = function(e) {
            try {
                if (!domCache.supplyChainDropdown.contains(e.target) && !domCache.supplyChainWidget.contains(e.target)) {
                    domCache.supplyChainDropdown.style.display = 'none';
                }
            } catch (error) {
                errorHandler.logError('Document Click Handler for Supply Chain', error);
            }
        };
        
        document.addEventListener('click', documentClickHandler);
        
        // Add hover effect to supplier items with proper memory management
        domCache.supplierItems.forEach(item => {
            const mouseEnterHandler = function() {
                try {
                    this.style.transform = 'translateX(5px)';
                } catch (error) {
                    errorHandler.logError('Supplier Item Mouse Enter', error);
                }
            };
            
            const mouseLeaveHandler = function() {
                try {
                    this.style.transform = 'translateX(0)';
                } catch (error) {
                    errorHandler.logError('Supplier Item Mouse Leave', error);
                }
            };
            
            item.addEventListener('mouseenter', mouseEnterHandler);
            item.addEventListener('mouseleave', mouseLeaveHandler);
            
            // Store handler references for potential cleanup
            item._mouseEnterHandler = mouseEnterHandler;
            item._mouseLeaveHandler = mouseLeaveHandler;
        });
    }
    
    // Expand button functionality for Financial Anomalies widget
    if (domCache.expandBtn && domCache.financialAnomaliesWidget) {
        const expandBtnClickHandler = function(e) {
            try {
                e.stopPropagation();
                domCache.financialAnomaliesWidget.classList.toggle('expanded');
                
                // Update icon based on expanded state
                const icon = this.querySelector('i');
                if (domCache.financialAnomaliesWidget.classList.contains('expanded')) {
                    icon.classList.remove('ph-arrows-out');
                    icon.classList.add('ph-arrows-in');
                } else {
                    icon.classList.remove('ph-arrows-in');
                    icon.classList.add('ph-arrows-out');
                }
            } catch (error) {
                errorHandler.logError('Expand Button Click', error);
            }
        };
        
        domCache.expandBtn.addEventListener('click', expandBtnClickHandler);
    }
    
    // Cleanup function to prevent memory leaks
    // This would be called when components are destroyed or page is unloaded
    window._cleanupEventListeners = function() {
        // Example cleanup code - would need to be called at appropriate lifecycle points
        // document.removeEventListener('click', documentClickHandler);
        // And other event listener removals
    };
    
    // Add unload handler to clean up event listeners
    window.addEventListener('beforeunload', function() {
        if (window._cleanupEventListeners) {
            window._cleanupEventListeners();
        }
    });
});
