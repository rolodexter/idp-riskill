/**
 * Advanced Data Visualizations for Riskill Dashboard
 * Provides highly refined, fine-lined chart functionality with sophisticated styling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all refined visualizations
    initializeRefinedVisualizations();
    
    // Add resize handler for responsive charts
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Redraw charts on resize
            initializeRefinedVisualizations();
        }, 250);
    });
});

/**
 * Initialize all advanced data visualizations
 */
function initializeRefinedVisualizations() {
    try {
        // Initialize different chart types with advanced styling
        initializeRefinedSparklines();
        initializeRefinedDonutCharts();
        
        // Initialize IDP-specific visualizations
        initializeBusinessUnitChart();
        initializeCustomerSegmentChart();
        initializeSupplierNetworkMap();
        initializeEmployeeSpecializationTracker();
        initializeMegaProjectMonitor();
        initializePremiumProjectsChart();
        initializePricingStrategyChart();
        initializeProductCategoryChart();
        
        // Add grid lines to charts for better readability
        addChartGridLines();
        
        // Add time labels to charts
        addTimeLabels();
        
        // Add subtle hover effects to widgets
        addRefinedWidgetInteractions();
        
        // Add view report buttons
        addViewReportButtons();
    } catch (error) {
        console.error('Error initializing advanced visualizations:', error);
    }
}

/**
 * Initialize advanced sparkline charts with ultra-thin lines and sophisticated styling
 */
function initializeRefinedSparklines() {
    try {
        const sparklineContainers = document.querySelectorAll('.micro-trend.sparkline');
        
        sparklineContainers.forEach(container => {
            // Get data from data attributes
            const dataString = container.getAttribute('data-values') || '0,0';
            const dataLabels = container.getAttribute('data-labels') || '';
            const color = container.getAttribute('data-color') || 'rgba(255, 255, 255, 0.5)';
            
            const values = dataString.split(',').map(Number);
            const labels = dataLabels.split(',');
            
            // Clear previous chart if any
            container.innerHTML = '';
            
            // Create SVG element with proper viewBox for scaling
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('sparkline-svg');
            svg.setAttribute('preserveAspectRatio', 'none');
            container.appendChild(svg);
            
            // Create tooltip with enhanced styling
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            container.appendChild(tooltip);
            
            // Draw advanced sparkline
            drawRefinedSparkline(svg, values, labels, color, tooltip);
        });
    } catch (error) {
        console.error('Error initializing advanced sparklines:', error);
    }
}

/**
 * Draw an advanced sparkline chart with ultra-thin lines and sophisticated styling
 */
function drawRefinedSparkline(svg, values, labels, color, tooltip) {
    try {
        // Ensure we have proper dimensions that fit within the widget
        const containerWidth = svg.parentElement.clientWidth || 100;
        const containerHeight = svg.parentElement.clientHeight || 40;
        
        // Set SVG dimensions with proper viewBox for scaling
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
        svg.setAttribute('preserveAspectRatio', 'none');
        
        const width = containerWidth;
        const height = containerHeight;
        
        // Calculate min and max for scaling
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min || 1; // Avoid division by zero
        
        // Calculate points with padding to ensure they stay within bounds
        const horizontalPadding = width * 0.05; // 5% padding on each side
        const verticalPadding = height * 0.15; // 15% padding top and bottom for better visualization
        
        const points = values.map((value, i) => {
            const x = horizontalPadding + ((i / (values.length - 1)) * (width - (horizontalPadding * 2)));
            const y = height - verticalPadding - ((value - min) / range) * (height - (verticalPadding * 2));
            return [x, y];
        });
        
        // Create subtle area fill below the line
        const pathArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathArea.classList.add('sparkline-area');
        
        // Generate area path data with bezier curves for smoothness
        let areaPathData = 'M' + points[0][0] + ',' + points[0][1];
        
        // Use bezier curves for smoother lines
        for (let i = 0; i < points.length - 1; i++) {
            const x0 = points[i][0];
            const y0 = points[i][1];
            const x1 = points[i+1][0];
            const y1 = points[i+1][1];
            
            // Calculate control points for smooth curve
            const cp1x = x0 + (x1 - x0) / 3;
            const cp1y = y0;
            const cp2x = x1 - (x1 - x0) / 3;
            const cp2y = y1;
            
            areaPathData += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
        }
        
        // Complete the area path
        areaPathData += ` L${points[points.length-1][0]},${height - 1}`;
        areaPathData += ` L${points[0][0]},${height - 1}`;
        areaPathData += ' Z';
        
        pathArea.setAttribute('d', areaPathData);
        pathArea.setAttribute('fill', color);
        pathArea.setAttribute('fill-opacity', '0.08');
        svg.appendChild(pathArea);
        
        // Create path for the ultra-thin line
        const pathLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathLine.classList.add('sparkline-line');
        pathLine.setAttribute('stroke', color);
        pathLine.setAttribute('stroke-width', '0.75');
        pathLine.setAttribute('stroke-linecap', 'round');
        pathLine.setAttribute('stroke-linejoin', 'round');
        pathLine.setAttribute('fill', 'none');
        
        // Generate line path data (same as area but without closing)
        let linePathData = 'M' + points[0][0] + ',' + points[0][1];
        
        // Use the same bezier curves for the line
        for (let i = 0; i < points.length - 1; i++) {
            const x0 = points[i][0];
            const y0 = points[i][1];
            const x1 = points[i+1][0];
            const y1 = points[i+1][1];
            
            // Calculate control points for smooth curve
            const cp1x = x0 + (x1 - x0) / 3;
            const cp1y = y0;
            const cp2x = x1 - (x1 - x0) / 3;
            const cp2y = y1;
            
            linePathData += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
        }
        
        pathLine.setAttribute('d', linePathData);
        svg.appendChild(pathLine);
        
        // Add invisible interactive points for tooltips
        const dataPoints = [];
        points.forEach((point, i) => {
            const hitArea = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            hitArea.setAttribute('cx', point[0]);
            hitArea.setAttribute('cy', point[1]);
            hitArea.setAttribute('r', '8'); // Larger invisible hit area
            hitArea.setAttribute('fill', 'transparent');
            hitArea.setAttribute('stroke', 'transparent');
            hitArea.setAttribute('data-index', i);
            hitArea.classList.add('data-point-hit-area');
            
            // Store data point for tooltip
            dataPoints.push({
                element: hitArea,
                value: values[i],
                label: labels[i] || '',
                x: point[0],
                y: point[1]
            });
            
            svg.appendChild(hitArea);
        });
        
        // Add hover interaction with enhanced tooltip
        svg.addEventListener('mousemove', function(e) {
            const rect = svg.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            
            // Find closest point
            let closestPoint = null;
            let minDistance = Infinity;
            
            dataPoints.forEach(point => {
                const distance = Math.abs(point.x - mouseX);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPoint = point;
                }
            });
            
            if (closestPoint && minDistance < 20) { // Only show if mouse is close enough
                // Create visible point indicator
                const visiblePoint = document.querySelector('.visible-point') || 
                                     document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                
                if (!visiblePoint.classList.contains('visible-point')) {
                    visiblePoint.classList.add('visible-point');
                    visiblePoint.setAttribute('r', '3');
                    visiblePoint.setAttribute('stroke', '#fff');
                    visiblePoint.setAttribute('stroke-width', '0.5');
                    svg.appendChild(visiblePoint);
                }
                
                visiblePoint.setAttribute('cx', closestPoint.x);
                visiblePoint.setAttribute('cy', closestPoint.y);
                visiblePoint.setAttribute('fill', color);
                
                // Create vertical guide line
                const guideLine = document.querySelector('.guide-line') || 
                                  document.createElementNS('http://www.w3.org/2000/svg', 'line');
                
                if (!guideLine.classList.contains('guide-line')) {
                    guideLine.classList.add('guide-line');
                    guideLine.setAttribute('stroke', 'rgba(255,255,255,0.15)');
                    guideLine.setAttribute('stroke-width', '0.5');
                    guideLine.setAttribute('stroke-dasharray', '2,2');
                    svg.insertBefore(guideLine, visiblePoint);
                }
                
                guideLine.setAttribute('x1', closestPoint.x);
                guideLine.setAttribute('y1', height - 1);
                guideLine.setAttribute('x2', closestPoint.x);
                guideLine.setAttribute('y2', closestPoint.y);
                
                // Show enhanced tooltip
                tooltip.innerHTML = `<strong>${closestPoint.value}</strong><br><span>${closestPoint.label}</span>`;
                tooltip.classList.add('visible');
                
                // Position tooltip (ensure it stays within widget bounds)
                const tooltipWidth = tooltip.offsetWidth || 80;
                const tooltipHeight = tooltip.offsetHeight || 30;
                
                let tooltipX = closestPoint.x - (tooltipWidth / 2);
                tooltipX = Math.max(0, Math.min(tooltipX, containerWidth - tooltipWidth));
                
                let tooltipY = closestPoint.y - tooltipHeight - 10;
                if (tooltipY < 0) tooltipY = closestPoint.y + 15; // Show below if not enough space above
                
                tooltip.style.left = tooltipX + 'px';
                tooltip.style.top = tooltipY + 'px';
            } else {
                // Hide tooltip and point indicator when not hovering near a point
                tooltip.classList.remove('visible');
                
                const visiblePoint = document.querySelector('.visible-point');
                if (visiblePoint) visiblePoint.remove();
                
                const guideLine = document.querySelector('.guide-line');
                if (guideLine) guideLine.remove();
            }
        });
        
        // Hide tooltip when mouse leaves
        svg.addEventListener('mouseleave', function() {
            tooltip.classList.remove('visible');
            
            const visiblePoint = document.querySelector('.visible-point');
            if (visiblePoint) visiblePoint.remove();
            
            const guideLine = document.querySelector('.guide-line');
            if (guideLine) guideLine.remove();
        });
        
    } catch (error) {
        console.error('Error drawing advanced sparkline:', error);
    }
}

/**
 * Initialize refined donut charts for data quality widget
 */
function initializeRefinedDonutCharts() {
    try {
        // Data quality chart
        const dataQualityChart = document.getElementById('data-quality-chart');
        if (dataQualityChart) {
            // Clear previous content
            dataQualityChart.innerHTML = '';
            
            // Get container dimensions to ensure chart fits
            const containerWidth = dataQualityChart.clientWidth || 40;
            const containerHeight = dataQualityChart.clientHeight || 40;
            const size = Math.min(containerWidth, containerHeight);
            
            // Create SVG element with proper dimensions
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            dataQualityChart.appendChild(svg);
            
            // Data quality segments
            const dataQualitySegments = [
                { value: 78.4, color: 'rgba(43, 127, 255, 0.9)' },  // Complete data
                { value: 21.6, color: 'rgba(255, 255, 255, 0.1)' }   // Incomplete data
            ];
            
            // Draw refined donut chart
            drawRefinedDonutChart(svg, dataQualitySegments);
            
            // Add percentage in the middle
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '20');
            text.setAttribute('y', '22');
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', 'rgba(255, 255, 255, 0.9)');
            text.textContent = '78.4%';
            svg.appendChild(text);
            
            // Add label below
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', '20');
            label.setAttribute('y', '30');
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '4');
            label.setAttribute('fill', 'rgba(255, 255, 255, 0.5)');
            label.textContent = 'complete';
            svg.appendChild(label);
        }
    } catch (error) {
        console.error('Error initializing refined donut charts:', error);
    }
}

/**
 * Draw a refined donut chart with thin lines and subtle styling
 */
function drawRefinedDonutChart(svg, segments) {
    try {
        // Get SVG dimensions from viewBox
        const viewBox = svg.getAttribute('viewBox').split(' ');
        const svgSize = parseFloat(viewBox[2]) || 40;
        
        // Calculate center and radius based on SVG size
        const cx = svgSize / 2;
        const cy = svgSize / 2;
        const outerRadius = (svgSize / 2) * 0.75; // 75% of half the size
        const innerRadius = outerRadius * 0.8; // 80% of outer radius
        
        let startAngle = 0;
        const total = segments.reduce((sum, segment) => sum + segment.value, 0);
        
        segments.forEach(segment => {
            const angle = (segment.value / total) * 360;
            const endAngle = startAngle + angle;
            
            // Create donut segment
            const path = createRefinedDonutSegment(
                cx, cy, outerRadius, innerRadius, 
                startAngle, endAngle, segment.color
            );
            
            svg.appendChild(path);
            startAngle = endAngle;
        });
    } catch (error) {
        console.error('Error drawing refined donut chart:', error);
    }
}

/**
 * Create a refined donut chart segment with thin stroke
 */
function createRefinedDonutSegment(cx, cy, outerRadius, innerRadius, startAngle, endAngle, fill) {
    // Convert angles to radians
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    // Calculate points
    const outerStartX = cx + outerRadius * Math.cos(startRad);
    const outerStartY = cy + outerRadius * Math.sin(startRad);
    const outerEndX = cx + outerRadius * Math.cos(endRad);
    const outerEndY = cy + outerRadius * Math.sin(endRad);
    
    const innerStartX = cx + innerRadius * Math.cos(startRad);
    const innerStartY = cy + innerRadius * Math.sin(startRad);
    const innerEndX = cx + innerRadius * Math.cos(endRad);
    const innerEndY = cy + innerRadius * Math.sin(endRad);
    
    // Create path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Determine if the angle is greater than 180 degrees
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    // Generate path data
    let pathData = `M ${outerStartX} ${outerStartY}`;
    pathData += ` A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`;
    pathData += ` L ${innerEndX} ${innerEndY}`;
    pathData += ` A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`;
    pathData += ' Z';
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', fill);
    
    return path;
}

/**
 * Add advanced interactions to widgets
 */
function addRefinedWidgetInteractions() {
    try {
        const kpiWidgets = document.querySelectorAll('.kpi-widget');
        
        kpiWidgets.forEach(widget => {
            // Add subtle hover effects
            widget.addEventListener('mouseenter', function() {
                // Highlight this widget with subtle elevation
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            });
            
            widget.addEventListener('mouseleave', function() {
                // Reset widget
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.borderColor = '';
            });
            
            // Add click interaction for action button
            const actionButton = widget.querySelector('.action-button');
            if (actionButton) {
                actionButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    // Toggle expanded state
                    const isExpanded = this.classList.contains('expanded');
                    
                    if (isExpanded) {
                        this.classList.remove('expanded');
                        this.style.transform = '';
                    } else {
                        this.classList.add('expanded');
                        this.style.transform = 'rotate(45deg)';
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error adding advanced widget interactions:', error);
    }
}

/**
 * Add grid lines to charts for better readability
 */
function addChartGridLines() {
    try {
        const sparklineContainers = document.querySelectorAll('.micro-trend.sparkline');
        
        sparklineContainers.forEach(container => {
            // Create grid container
            const grid = document.createElement('div');
            grid.className = 'chart-grid';
            
            // Add horizontal grid lines
            for (let i = 1; i <= 3; i++) {
                const gridLine = document.createElement('div');
                gridLine.className = 'chart-grid-line';
                grid.appendChild(gridLine);
            }
            
            // Insert grid behind the SVG
            container.insertBefore(grid, container.firstChild);
        });
    } catch (error) {
        console.error('Error adding chart grid lines:', error);
    }
}

/**
 * Add time labels to charts
 */
function addTimeLabels() {
    try {
        const sparklineContainers = document.querySelectorAll('.micro-trend.sparkline');
        
        sparklineContainers.forEach(container => {
            const dataLabels = container.getAttribute('data-labels');
            if (!dataLabels) return;
            
            const labels = dataLabels.split(',');
            if (labels.length < 2) return;
            
            // Create time labels container
            const timeLabels = document.createElement('div');
            timeLabels.className = 'time-labels';
            
            // Add first and last label only
            const firstLabel = document.createElement('span');
            firstLabel.textContent = labels[0];
            timeLabels.appendChild(firstLabel);
            
            const lastLabel = document.createElement('span');
            lastLabel.textContent = labels[labels.length - 1];
            timeLabels.appendChild(lastLabel);
            
            // Add labels after the sparkline
            container.parentNode.insertBefore(timeLabels, container.nextSibling);
        });
    } catch (error) {
    }
}

/**
 * Add view report buttons to widgets
 */
/**
 * Initialize Business Unit Revenue Comparison Chart
 */
function initializeBusinessUnitChart() {
    try {
        const chartContainer = document.getElementById('business-unit-chart');
        if (!chartContainer) return;
        
        // Clear previous chart if any
        chartContainer.innerHTML = '';
        
        // Create SVG element with proper viewBox for scaling
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('business-unit-chart');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 100 60');
        chartContainer.appendChild(svg);
        
        // Business unit data from IDP reference documents
        const businessUnits = [
            { code: 'Z001', value: 10.3, color: 'rgba(255, 59, 48, 0.85)', label: 'Z001' },
            { code: 'P001', value: 11.0, color: 'rgba(0, 122, 255, 0.85)', label: 'P001' },
            { code: 'S001', value: 7.9, color: 'rgba(88, 86, 214, 0.85)', label: 'S001' },
            { code: 'P003', value: 6.4, color: 'rgba(255, 149, 0, 0.85)', label: 'P003' },
            { code: 'S002', value: 7.8, color: 'rgba(52, 199, 89, 0.85)', label: 'S002' }
        ];
        
        // Draw horizontal bars for business units
        const barHeight = 8;
        const barSpacing = 12;
        const maxValue = Math.max(...businessUnits.map(unit => unit.value));
        const barWidth = 80; // Maximum width of bars
        
        businessUnits.forEach((unit, index) => {
            // Calculate bar width based on value
            const width = (unit.value / maxValue) * barWidth;
            const y = 10 + (index * barSpacing);
            
            // Create bar group
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            
            // Draw bar background
            const barBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            barBg.setAttribute('x', '10');
            barBg.setAttribute('y', y);
            barBg.setAttribute('width', barWidth);
            barBg.setAttribute('height', barHeight);
            barBg.setAttribute('rx', '1');
            barBg.setAttribute('fill', 'rgba(255, 255, 255, 0.05)');
            group.appendChild(barBg);
            
            // Draw actual bar
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', '10');
            bar.setAttribute('y', y);
            bar.setAttribute('width', width);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('rx', '1');
            bar.setAttribute('fill', unit.color);
            group.appendChild(bar);
            
            // Add label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', '8');
            label.setAttribute('y', y + barHeight / 2 + 1);
            label.setAttribute('text-anchor', 'end');
            label.setAttribute('dominant-baseline', 'middle');
            label.setAttribute('fill', 'rgba(255, 255, 255, 0.7)');
            label.setAttribute('font-size', '6');
            label.textContent = unit.code;
            group.appendChild(label);
            
            // Add value
            const value = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            value.setAttribute('x', width + 15);
            value.setAttribute('y', y + barHeight / 2 + 1);
            value.setAttribute('dominant-baseline', 'middle');
            value.setAttribute('fill', 'rgba(255, 255, 255, 0.9)');
            value.setAttribute('font-size', '6');
            value.textContent = unit.value + 'T';
            group.appendChild(value);
            
            svg.appendChild(group);
        });
    } catch (error) {
        console.error('Error initializing business unit chart:', error);
    }
}

/**
 * Initialize Customer Segment Chart
 */
function initializeCustomerSegmentChart() {
    try {
        // Customer segment data from IDP reference documents
        const customerSegments = [
            { type: 'GOVERNMENT', percentage: 47, color: 'rgba(52, 199, 89, 0.85)' },
            { type: 'PORT_AUTHORITY', percentage: 18, color: 'rgba(0, 122, 255, 0.85)' },
            { type: 'MILITARY_NAVAL', percentage: 15, color: 'rgba(255, 59, 48, 0.85)' },
            { type: 'PRIVATE', percentage: 20, color: 'rgba(255, 149, 0, 0.85)' }
        ];
        
        // Add customer segment data to widget
        const customerWidget = document.querySelector('.customer-segments');
        if (customerWidget) {
            const dataContext = customerWidget.querySelector('.data-context');
            if (dataContext) {
                const segmentInfo = document.createElement('div');
                segmentInfo.className = 'segment-distribution';
                segmentInfo.style.display = 'flex';
                segmentInfo.style.marginTop = '8px';
                segmentInfo.style.gap = '4px';
                
                customerSegments.forEach(segment => {
                    const indicator = document.createElement('div');
                    indicator.style.height = '4px';
                    indicator.style.flex = segment.percentage;
                    indicator.style.backgroundColor = segment.color;
                    indicator.style.borderRadius = '1px';
                    indicator.title = `${segment.type}: ${segment.percentage}%`;
                    segmentInfo.appendChild(indicator);
                });
                
                dataContext.appendChild(segmentInfo);
            }
        }
    } catch (error) {
        console.error('Error initializing customer segment chart:', error);
    }
}

/**
 * Initialize Supplier Network Map
 */
function initializeSupplierNetworkMap() {
    try {
        // Supplier data from IDP reference documents
        const supplierRegions = [
            { region: 'US', count: 5, suppliers: ['Survitec Group', 'Viking Life-Saving', 'Switlik', 'Revere', 'Mustang'] },
            { region: 'Europe', count: 4, suppliers: ['Willem Pot Bv', 'Lalizas Sa', 'Acebi', 'Daniamant'] },
            { region: 'Other', count: 34, suppliers: ['Various international suppliers'] }
        ];
        
        // Update supplier network dropdown with actual data
        const supplierWidget = document.querySelector('.supplier-network');
        if (supplierWidget) {
            const dropdown = supplierWidget.querySelector('.kpi-dropdown');
            if (dropdown) {
                const supplierList = dropdown.querySelector('.supplier-list');
                if (supplierList) {
                    // Clear existing items
                    supplierList.innerHTML = '';
                    
                    // Add top suppliers from each region
                    supplierRegions.forEach(region => {
                        region.suppliers.slice(0, 2).forEach(supplier => {
                            const item = document.createElement('div');
                            item.className = 'supplier-item';
                            
                            const name = document.createElement('span');
                            name.className = 'supplier-name';
                            name.textContent = supplier;
                            
                            const status = document.createElement('span');
                            status.className = 'supplier-status';
                            status.textContent = region.region;
                            
                            item.appendChild(name);
                            item.appendChild(status);
                            supplierList.appendChild(item);
                        });
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error initializing supplier network map:', error);
    }
}

/**
 * Initialize Employee Specialization Tracker
 */
function initializeEmployeeSpecializationTracker() {
    try {
        // Employee data from IDP reference documents
        const employees = [
            { id: 'EMORALES', value: 400, specialization: 'Cross-Entity', color: 'rgba(88, 86, 214, 0.85)' },
            { id: 'FMAMONDE', value: 350, specialization: 'Mega-Projects', color: 'rgba(255, 59, 48, 0.85)' },
            { id: 'JCAMACHO', value: 280, specialization: 'Government', color: 'rgba(52, 199, 89, 0.85)' },
            { id: 'MREYES', value: 220, specialization: 'Naval', color: 'rgba(0, 122, 255, 0.85)' }
        ];
        
        // Update employee specialization widget with actual data
        const employeeWidget = document.querySelector('.employee-specialization');
        if (employeeWidget) {
            const dataContext = employeeWidget.querySelector('.data-context');
            if (dataContext) {
                // Create employee performance visualization
                const employeeViz = document.createElement('div');
                employeeViz.className = 'employee-viz';
                employeeViz.style.display = 'flex';
                employeeViz.style.flexDirection = 'column';
                employeeViz.style.gap = '6px';
                employeeViz.style.marginTop = '8px';
                
                // Add top employees
                employees.slice(0, 3).forEach(employee => {
                    const item = document.createElement('div');
                    item.className = 'employee-item';
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    item.style.gap = '8px';
                    
                    const id = document.createElement('div');
                    id.className = 'employee-id';
                    id.textContent = employee.id;
                    id.style.fontSize = '10px';
                    id.style.fontWeight = '500';
                    id.style.width = '70px';
                    id.style.color = 'rgba(255, 255, 255, 0.9)';
                    
                    const bar = document.createElement('div');
                    bar.className = 'employee-bar';
                    bar.style.height = '3px';
                    bar.style.flex = '1';
                    bar.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    bar.style.position = 'relative';
                    bar.style.borderRadius = '1px';
                    
                    const fill = document.createElement('div');
                    fill.className = 'employee-fill';
                    fill.style.position = 'absolute';
                    fill.style.left = '0';
                    fill.style.top = '0';
                    fill.style.height = '100%';
                    fill.style.width = (employee.value / 400 * 100) + '%';
                    fill.style.backgroundColor = employee.color;
                    fill.style.borderRadius = '1px';
                    
                    const value = document.createElement('div');
                    value.className = 'employee-value';
                    value.textContent = employee.value + 'B';
                    value.style.fontSize = '10px';
                    value.style.width = '40px';
                    value.style.textAlign = 'right';
                    value.style.color = 'rgba(255, 255, 255, 0.7)';
                    
                    bar.appendChild(fill);
                    item.appendChild(id);
                    item.appendChild(bar);
                    item.appendChild(value);
                    employeeViz.appendChild(item);
                });
                
                dataContext.appendChild(employeeViz);
            }
        }
    } catch (error) {
        console.error('Error initializing employee specialization tracker:', error);
    }
}

/**
 * Initialize Mega-Project Performance Monitor
 */
function initializeMegaProjectMonitor() {
    try {
        // Mega-project data from IDP reference documents
        const megaProjects = [
            { id: 'MP-Z001-2023-001', value: 671, status: 'In Progress', completion: 65 },
            { id: 'MP-Z001-2023-002', value: 580, status: 'Planning', completion: 15 },
            { id: 'MP-Z001-2022-005', value: 520, status: 'Completed', completion: 100 }
        ];
        
        // Update mega-project widget with actual data
        const megaProjectWidget = document.querySelector('.mega-projects');
        if (megaProjectWidget) {
            const dataContext = megaProjectWidget.querySelector('.data-context');
            if (dataContext) {
                // Create mega-project visualization
                const projectViz = document.createElement('div');
                projectViz.className = 'project-viz';
                projectViz.style.display = 'flex';
                projectViz.style.flexDirection = 'column';
                projectViz.style.gap = '8px';
                projectViz.style.marginTop = '8px';
                
                // Add top mega-projects
                megaProjects.forEach(project => {
                    const item = document.createElement('div');
                    item.className = 'project-item';
                    item.style.display = 'flex';
                    item.style.flexDirection = 'column';
                    item.style.gap = '4px';
                    
                    const header = document.createElement('div');
                    header.className = 'project-header';
                    header.style.display = 'flex';
                    header.style.justifyContent = 'space-between';
                    
                    const id = document.createElement('div');
                    id.className = 'project-id';
                    id.textContent = project.id;
                    id.style.fontSize = '10px';
                    id.style.fontWeight = '500';
                    id.style.color = 'rgba(255, 255, 255, 0.9)';
                    
                    const value = document.createElement('div');
                    value.className = 'project-value';
                    value.textContent = project.value + 'B';
                    value.style.fontSize = '10px';
                    value.style.fontWeight = '600';
                    value.style.color = 'rgba(255, 59, 48, 0.85)';
                    
                    const progress = document.createElement('div');
                    progress.className = 'project-progress';
                    progress.style.height = '3px';
                    progress.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    progress.style.position = 'relative';
                    progress.style.borderRadius = '1px';
                    
                    const fill = document.createElement('div');
                    fill.className = 'progress-fill';
                    fill.style.position = 'absolute';
                    fill.style.left = '0';
                    fill.style.top = '0';
                    fill.style.height = '100%';
                    fill.style.width = project.completion + '%';
                    fill.style.backgroundColor = getStatusColor(project.status);
                    fill.style.borderRadius = '1px';
                    
                    progress.appendChild(fill);
                    header.appendChild(id);
                    header.appendChild(value);
                    item.appendChild(header);
                    item.appendChild(progress);
                    projectViz.appendChild(item);
                });
                
                dataContext.appendChild(projectViz);
            }
        }
    } catch (error) {
        console.error('Error initializing mega-project monitor:', error);
    }
}

/**
 * Get color based on project status
 */
function getStatusColor(status) {
    switch(status) {
        case 'Completed': return 'rgba(52, 199, 89, 0.85)';
        case 'In Progress': return 'rgba(0, 122, 255, 0.85)';
        case 'Planning': return 'rgba(255, 149, 0, 0.85)';
        case 'At Risk': return 'rgba(255, 59, 48, 0.85)';
        default: return 'rgba(138, 146, 166, 0.85)';
    }
}

/**
 * Initialize Ultra-Premium International Projects Chart
 */
function initializePremiumProjectsChart() {
    try {
        // Premium international project data from IDP reference documents
        const premiumProjects = [
            { id: 'U001-2023-001', country: 'Singapore', value: 480, status: 'In Progress' },
            { id: 'U001-2023-002', country: 'UAE', value: 520, status: 'Planning' },
            { id: 'U002-2023-001', country: 'Qatar', value: 390, status: 'In Progress' }
        ];
        
        // Update premium projects widget with actual data
        const premiumWidget = document.querySelector('.premium-projects');
        if (premiumWidget) {
            const chartContainer = document.getElementById('premium-projects-chart');
            if (chartContainer) {
                // Create premium projects visualization
                const projectViz = document.createElement('div');
                projectViz.className = 'premium-viz';
                projectViz.style.display = 'flex';
                projectViz.style.flexDirection = 'column';
                projectViz.style.gap = '6px';
                projectViz.style.marginTop = '8px';
                
                // Add top premium projects
                premiumProjects.forEach(project => {
                    const item = document.createElement('div');
                    item.className = 'premium-item';
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    item.style.justifyContent = 'space-between';
                    
                    const info = document.createElement('div');
                    info.className = 'premium-info';
                    info.style.display = 'flex';
                    info.style.flexDirection = 'column';
                    
                    const id = document.createElement('div');
                    id.className = 'premium-id';
                    id.textContent = project.id;
                    id.style.fontSize = '10px';
                    id.style.fontWeight = '500';
                    id.style.color = 'rgba(255, 255, 255, 0.9)';
                    
                    const country = document.createElement('div');
                    country.className = 'premium-country';
                    country.textContent = project.country;
                    country.style.fontSize = '9px';
                    country.style.color = 'rgba(255, 255, 255, 0.6)';
                    
                    const value = document.createElement('div');
                    value.className = 'premium-value';
                    value.textContent = project.value + 'M';
                    value.style.fontSize = '10px';
                    value.style.fontWeight = '600';
                    value.style.color = getStatusColor(project.status);
                    
                    info.appendChild(id);
                    info.appendChild(country);
                    item.appendChild(info);
                    item.appendChild(value);
                    projectViz.appendChild(item);
                });
                
                chartContainer.appendChild(projectViz);
            }
        }
    } catch (error) {
        console.error('Error initializing premium projects chart:', error);
    }
}

/**
 * Initialize Pricing Strategy Intelligence Chart
 */
function initializePricingStrategyChart() {
    try {
        // Pricing strategy data from IDP reference documents
        const pricingData = [
            { category: 'Life Rafts', margin: 22.4, trend: '+3.8%' },
            { category: 'Fire Systems', margin: 18.7, trend: '+5.2%' },
            { category: 'Marine Equip', margin: 15.9, trend: '+2.1%' }
        ];
        
        // Update pricing strategy widget with actual data
        const pricingWidget = document.querySelector('.pricing-strategy');
        if (pricingWidget) {
            const chartContainer = document.getElementById('pricing-strategy-chart');
            if (chartContainer) {
                // Create pricing strategy visualization
                const pricingViz = document.createElement('div');
                pricingViz.className = 'pricing-viz';
                pricingViz.style.display = 'flex';
                pricingViz.style.flexDirection = 'column';
                pricingViz.style.gap = '6px';
                pricingViz.style.marginTop = '8px';
                
                // Add top pricing categories
                pricingData.forEach(item => {
                    const row = document.createElement('div');
                    row.className = 'pricing-row';
                    row.style.display = 'flex';
                    row.style.alignItems = 'center';
                    row.style.justifyContent = 'space-between';
                    
                    const category = document.createElement('div');
                    category.className = 'pricing-category';
                    category.textContent = item.category;
                    category.style.fontSize = '10px';
                    category.style.fontWeight = '500';
                    category.style.color = 'rgba(255, 255, 255, 0.9)';
                    
                    const data = document.createElement('div');
                    data.className = 'pricing-data';
                    data.style.display = 'flex';
                    data.style.alignItems = 'center';
                    data.style.gap = '8px';
                    
                    const margin = document.createElement('div');
                    margin.className = 'margin-value';
                    margin.textContent = item.margin + '%';
                    margin.style.fontSize = '10px';
                    margin.style.fontWeight = '600';
                    margin.style.color = 'rgba(52, 199, 89, 0.85)';
                    
                    const trend = document.createElement('div');
                    trend.className = 'margin-trend';
                    trend.textContent = item.trend;
                    trend.style.fontSize = '9px';
                    trend.style.color = 'rgba(52, 199, 89, 0.7)';
                    
                    data.appendChild(margin);
                    data.appendChild(trend);
                    row.appendChild(category);
                    row.appendChild(data);
                    pricingViz.appendChild(row);
                });
                
                chartContainer.appendChild(pricingViz);
            }
        }
    } catch (error) {
        console.error('Error initializing pricing strategy chart:', error);
    }
}

/**
 * Add view report buttons to widgets
 */
function addViewReportButtons() {
    try {
        const kpiWidgets = document.querySelectorAll('.kpi-widget');
        
        kpiWidgets.forEach(widget => {
            // Check if widget already has a view report button
            if (!widget.querySelector('.view-report-button')) {
                const actionsContainer = widget.querySelector('.kpi-actions');
                
                if (actionsContainer) {
                    // Create view report button
                    const viewReportButton = document.createElement('button');
                    viewReportButton.className = 'view-report-button';
                    viewReportButton.textContent = 'View Report';
                    viewReportButton.title = 'View detailed report';
                    
                    // Add click handler
                    viewReportButton.addEventListener('click', function() {
                        // Handle report view action
                        console.log('View report clicked for widget:', widget.className);
                        
                        // For IDP-specific widgets, show specialized reports
                        if (widget.classList.contains('mega-projects')) {
                            alert('Mega-Project Performance Report: Z001 Business Unit - 671B+ peso average deal value');
                        } else if (widget.classList.contains('business-units')) {
                            alert('Business Unit Revenue Report: P001 Volume Powerhouse - 11T+ peso total revenue');
                        } else if (widget.classList.contains('customer-segments')) {
                            alert('Customer Segment Analysis: 881 total customers - 47% Government sector');
                        } else if (widget.classList.contains('supplier-network')) {
                            alert('International Supplier Network: 43 suppliers across US, Europe, and other regions');
                        } else if (widget.classList.contains('employee-specialization')) {
                            alert('Employee Specialization Report: EMORALES - 400B+ peso specialist with cross-entity expertise');
                        } else if (widget.classList.contains('premium-projects')) {
                            alert('Ultra-Premium International Projects Report: Exclusive analysis of high-value international projects with diplomatic considerations, cross-border logistics, and premium client relationship metrics.');
                        } else if (widget.classList.contains('pricing-strategy')) {
                            alert('Pricing Strategy Intelligence Report: Advanced pricing optimization analysis with competitive positioning, margin enhancement opportunities, and dynamic pricing recommendations.');
                        } else if (widget.classList.contains('product-category')) {
                            alert('Product Category Intelligence Report: Detailed analysis of 7 high-growth product categories with market penetration metrics, cross-selling opportunities, and innovation pipeline insights.');
                        }
                    });
                    
                    actionsContainer.appendChild(viewReportButton);
                }
            }
        });
    } catch (error) {
        console.error('Error adding view report buttons:', error);
    }
}

// Initialize advanced visualizations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a slight delay to ensure all elements are properly rendered
    setTimeout(initializeRefinedVisualizations, 100);
});
