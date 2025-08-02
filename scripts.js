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
    
    // If no overrides, use area-based density
    if (area < 5000) {
        widget.classList.add('micro');
        simplifyContent(widget, 'micro');
    } else if (area < 15000) {
        widget.classList.add('compact');
        simplifyContent(widget, 'compact');
    } else if (area < 30000) {
        widget.classList.add('standard');
        simplifyContent(widget, 'standard');
    } else {
        widget.classList.add('expanded');
        simplifyContent(widget, 'expanded');
    }
}

// Function to adjust content based on density mode
function simplifyContent(widget, densityMode) {
    const kpiLabel = widget.querySelector('.kpi-label');
    const kpiTrend = widget.querySelector('.kpi-trend');
    
    if (densityMode === 'micro') {
        // Only show essential elements in micro mode
        if (kpiLabel) kpiLabel.style.display = 'none';
        if (kpiTrend) kpiTrend.style.display = 'none';
    } else {
        // Show all content in other modes
        if (kpiLabel) kpiLabel.style.display = 'block';
        if (densityMode === 'standard' || densityMode === 'compact' || densityMode === 'expanded') {
            if (kpiTrend) kpiTrend.style.display = 'flex';
        }
    }
}
