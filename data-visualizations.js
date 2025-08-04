/**
 * Enhanced Data Visualizations for Riskill Dashboard
 * Provides advanced chart functionality for KPI widgets and data displays
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all visualizations
    initializeAllVisualizations();
    
    // Add resize handler for responsive charts
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Redraw charts on resize
            initializeAllVisualizations();
        }, 250);
    });
});

/**
 * Initialize all data visualizations
 */
function initializeAllVisualizations() {
    try {
        // Initialize different chart types
        initializeSparklines();
        initializeMicroTrends();
        initializeDonutCharts();
        initializeProgressBars();
        
        // Add animation effects to enterprise KPI widgets
        addEnterpriseKpiAnimations();
    } catch (error) {
        console.error('Error initializing data visualizations:', error);
    }
}

/**
 * Initialize sparkline charts
 * Creates mini trend visualizations for KPI widgets
 */
function initializeSparklines() {
    try {
        const sparklineContainers = document.querySelectorAll('.sparkline');
        
        sparklineContainers.forEach(container => {
            // Get data from data attributes or use sample data
            const dataString = container.getAttribute('data-values') || '65,59,80,81,56,72,90,77';
            const dataLabels = container.getAttribute('data-labels') || 'Mon,Tue,Wed,Thu,Fri,Sat,Sun,Today';
            const color = container.getAttribute('data-color') || '#2B7FFF';
            
            const values = dataString.split(',').map(Number);
            const labels = dataLabels.split(',');
            
            // Clear previous chart if any
            container.innerHTML = '';
            
            // Create SVG element
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('sparkline-svg');
            container.appendChild(svg);
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            container.appendChild(tooltip);
            
            // Draw sparkline
            drawSparkline(svg, values, labels, color, tooltip);
        });
    } catch (error) {
        console.error('Error initializing sparklines:', error);
    }
}

/**
 * Draw a sparkline chart
 */
function drawSparkline(svg, values, labels, color, tooltip) {
    try {
        const width = svg.clientWidth;
        const height = svg.clientHeight;
        
        // Calculate min and max for scaling
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min || 1; // Avoid division by zero
        
        // Calculate points
        const points = values.map((value, i) => {
            const x = (i / (values.length - 1)) * width;
            const y = height - ((value - min) / range) * height;
            return [x, y];
        });
        
        // Create path for line
        const pathLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathLine.classList.add('sparkline-line');
        pathLine.setAttribute('stroke', color);
        
        // Create path for area
        const pathArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathArea.classList.add('sparkline-area');
        pathArea.setAttribute('fill', color);
        
        // Generate path data
        let lineData = 'M' + points.map(p => p[0] + ',' + p[1]).join(' L');
        let areaData = lineData + 
            ' L' + points[points.length-1][0] + ',' + height + 
            ' L' + points[0][0] + ',' + height + 'Z';
        
        pathLine.setAttribute('d', lineData);
        pathArea.setAttribute('d', areaData);
        
        // Add paths to SVG
        svg.appendChild(pathArea);
        svg.appendChild(pathLine);
        
        // Add dots for data points with hover effect
        points.forEach((point, i) => {
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.classList.add('sparkline-dot');
            dot.setAttribute('cx', point[0]);
            dot.setAttribute('cy', point[1]);
            dot.setAttribute('stroke', color);
            
            // Add hover effects and tooltip
            dot.addEventListener('mouseenter', function(e) {
                this.classList.add('highlight');
                tooltip.textContent = `${labels[i]}: ${values[i]}`;
                tooltip.style.left = `${point[0]}px`;
                tooltip.style.top = `${point[1] - 25}px`;
                tooltip.classList.add('visible');
            });
            
            dot.addEventListener('mouseleave', function() {
                this.classList.remove('highlight');
                tooltip.classList.remove('visible');
            });
            
            svg.appendChild(dot);
        });
        
        // Highlight the last point (most recent)
        const lastDot = svg.querySelectorAll('circle')[points.length - 1];
        if (lastDot) {
            lastDot.setAttribute('r', '4');
            lastDot.setAttribute('stroke-width', '2');
        }
    } catch (error) {
        console.error('Error drawing sparkline:', error);
    }
}

/**
 * Initialize donut charts
 * Creates interactive donut charts for data quality and other metrics
 */
function initializeDonutCharts() {
    try {
        const donutContainers = document.querySelectorAll('.donut-chart');
        
        donutContainers.forEach(container => {
            // Get data from data attributes or use sample data
            const dataString = container.getAttribute('data-values') || '70,20,10';
            const labelsString = container.getAttribute('data-labels') || 'Complete,Partial,Missing';
            const colorsString = container.getAttribute('data-colors') || '#4CAF50,#FFC107,#F44336';
            const centerText = container.getAttribute('data-center-text') || '70%';
            const centerLabel = container.getAttribute('data-center-label') || 'Complete';
            
            const values = dataString.split(',').map(Number);
            const labels = labelsString.split(',');
            const colors = colorsString.split(',');
            
            // Clear previous chart if any
            container.innerHTML = '';
            
            // Create SVG element
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', '0 0 100 100');
            container.appendChild(svg);
            
            // Create center text element
            const centerElement = document.createElement('div');
            centerElement.className = 'donut-hole';
            centerElement.innerHTML = `${centerText}<div class="donut-label">${centerLabel}</div>`;
            container.appendChild(centerElement);
            
            // Draw donut chart
            drawDonutChart(svg, values, labels, colors);
            
            // Create legend if needed
            if (container.getAttribute('data-show-legend') === 'true') {
                const legend = document.createElement('div');
                legend.className = 'chart-legend';
                
                labels.forEach((label, i) => {
                    const legendItem = document.createElement('div');
                    legendItem.className = 'legend-item';
                    
                    const colorBox = document.createElement('div');
                    colorBox.className = 'legend-color';
                    colorBox.style.backgroundColor = colors[i];
                    
                    const labelText = document.createElement('span');
                    labelText.textContent = label;
                    
                    legendItem.appendChild(colorBox);
                    legendItem.appendChild(labelText);
                    legend.appendChild(legendItem);
                });
                
                container.parentNode.appendChild(legend);
            }
        });
    } catch (error) {
        console.error('Error initializing donut charts:', error);
    }
}

/**
 * Draw a donut chart
 */
function drawDonutChart(svg, values, labels, colors) {
    try {
        const total = values.reduce((sum, value) => sum + value, 0);
        let startAngle = 0;
        
        values.forEach((value, i) => {
            // Calculate angles for this segment
            const percentage = value / total;
            const angle = percentage * 360;
            const endAngle = startAngle + angle;
            
            // Create donut segment
            const segment = createDonutSegment(50, 50, 40, 25, startAngle, endAngle, colors[i]);
            segment.classList.add('donut-segment');
            
            // Add tooltip functionality
            segment.setAttribute('data-tooltip', `${labels[i]}: ${value}%`);
            
            svg.appendChild(segment);
            
            // Update start angle for next segment
            startAngle = endAngle;
        });
    } catch (error) {
        console.error('Error drawing donut chart:', error);
    }
}

/**
 * Create a donut chart segment
 */
function createDonutSegment(cx, cy, outerRadius, innerRadius, startAngle, endAngle, fill) {
    // Convert angles to radians
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    // Calculate points
    const outerStartX = cx + outerRadius * Math.cos(startRad);
    const outerStartY = cy + outerRadius * Math.sin(startRad);
    const outerEndX = cx + outerRadius * Math.cos(endRad);
    const outerEndY = cy + outerRadius * Math.sin(endRad);
    
    const innerStartX = cx + innerRadius * Math.cos(endRad);
    const innerStartY = cy + innerRadius * Math.sin(endRad);
    const innerEndX = cx + innerRadius * Math.cos(startRad);
    const innerEndY = cy + innerRadius * Math.sin(startRad);
    
    // Create path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Determine if the angle is greater than 180 degrees
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    // Create path data
    const pathData = [
        `M ${outerStartX} ${outerStartY}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
        `L ${innerStartX} ${innerStartY}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEndX} ${innerEndY}`,
        'Z'
    ].join(' ');
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', fill);
    
    return path;
}

/**
 * Initialize progress bars
 * Creates animated progress bars for data completeness and other metrics
 */
/**
 * Initialize micro-trend sparklines for KPI widgets
 * Creates compact trend visualizations specifically for enterprise KPI widgets
 */
function initializeMicroTrends() {
    try {
        const microTrends = document.querySelectorAll('.micro-trend.sparkline');
        
        microTrends.forEach(container => {
            // Get data from data attributes
            const dataString = container.getAttribute('data-values') || '65,70,75,80,85,90,95';
            const dataLabels = container.getAttribute('data-labels') || 'Jan,Feb,Mar,Apr,May,Jun,Jul';
            const color = container.getAttribute('data-color') || '#2B7FFF';
            
            const values = dataString.split(',').map(Number);
            const labels = dataLabels.split(',');
            
            // Clear previous chart if any
            container.innerHTML = '';
            
            // Create SVG element with smaller dimensions for micro-trends
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('sparkline-svg');
            container.appendChild(svg);
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            container.appendChild(tooltip);
            
            // Draw sparkline with smoother animation
            drawSparkline(svg, values, labels, color, tooltip, true);
        });
    } catch (error) {
        console.error('Error initializing micro-trends:', error);
    }
}

/**
 * Add subtle animations to enterprise KPI widgets
 */
function addEnterpriseKpiAnimations() {
    try {
        const kpiWidgets = document.querySelectorAll('.enterprise-kpi');
        
        kpiWidgets.forEach((widget, index) => {
            // Add staggered fade-in animation
            widget.style.opacity = '0';
            widget.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                widget.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                widget.style.opacity = '1';
                widget.style.transform = 'translateY(0)';
            }, 100 * index);
            
            // Add pulse animation to benchmark indicators
            const benchmark = widget.querySelector('.benchmark');
            if (benchmark) {
                setTimeout(() => {
                    benchmark.classList.add('pulse-once');
                }, 1000 + (100 * index));
            }
            
            // Add click handler for action buttons
            const actionButton = widget.querySelector('.action-button');
            if (actionButton) {
                actionButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const widget = this.closest('.enterprise-kpi');
                    const icon = this.querySelector('i');
                    
                    // Toggle expanded state
                    if (widget.classList.contains('expanded')) {
                        // Collapse the widget
                        widget.classList.remove('expanded');
                        icon.classList.remove('ph-minus');
                        icon.classList.add('ph-plus');
                        
                        // Find and hide the detail panel
                        const detailPanel = widget.querySelector('.kpi-detail-panel');
                        if (detailPanel) {
                            detailPanel.style.maxHeight = '0';
                            setTimeout(() => {
                                detailPanel.style.display = 'none';
                            }, 300);
                        }
                    } else {
                        // Expand the widget
                        widget.classList.add('expanded');
                        icon.classList.remove('ph-plus');
                        icon.classList.add('ph-minus');
                        
                        // Find and show the detail panel
                        let detailPanel = widget.querySelector('.kpi-detail-panel');
                        
                        // If no detail panel exists, create one
                        if (!detailPanel) {
                            detailPanel = document.createElement('div');
                            detailPanel.className = 'kpi-detail-panel';
                            detailPanel.innerHTML = createDetailPanelContent(widget);
                            widget.appendChild(detailPanel);
                            
                            // Initialize any charts in the detail panel
                            setTimeout(() => {
                                initializeDetailPanelCharts(detailPanel);
                            }, 100);
                        }
                        
                        // Show the detail panel with animation
                        detailPanel.style.display = 'block';
                        setTimeout(() => {
                            detailPanel.style.maxHeight = detailPanel.scrollHeight + 'px';
                        }, 10);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error adding enterprise KPI animations:', error);
    }
}

/**
 * Create content for the KPI detail panel based on widget type
 */
function createDetailPanelContent(widget) {
    // Determine widget type
    const widgetClasses = widget.className;
    const kpiLabel = widget.querySelector('.kpi-label').textContent;
    let content = '';
    
    // Create different content based on widget type
    if (widgetClasses.includes('crisis')) { // Deal Intelligence
        content = `
            <div class="detail-panel-header">
                <h4>Deal Value Details</h4>
                <div class="time-selector">
                    <button class="time-option selected" data-period="week">Week</button>
                    <button class="time-option" data-period="month">Month</button>
                    <button class="time-option" data-period="quarter">Quarter</button>
                    <button class="time-option" data-period="year">Year</button>
                </div>
            </div>
            <div class="detail-panel-content">
                <div class="detail-chart-container" data-chart-type="line" data-values="65.2,67.8,68.9,69.5,70.1,70.8,71.3" data-labels="Jun,Jul,Aug,Sep,Oct,Nov,Dec"></div>
                <div class="detail-metrics">
                    <div class="metric-item">
                        <span class="metric-label">YoY Growth</span>
                        <span class="metric-value">+12.4%</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Industry Avg</span>
                        <span class="metric-value">63.8T</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Forecast Q1</span>
                        <span class="metric-value">73.5T</span>
                    </div>
                </div>
                <div class="detail-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Period</th>
                                <th>Value</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dec 2024</td>
                                <td>71.3T</td>
                                <td class="positive">+0.5T</td>
                            </tr>
                            <tr>
                                <td>Nov 2024</td>
                                <td>70.8T</td>
                                <td class="positive">+0.7T</td>
                            </tr>
                            <tr>
                                <td>Oct 2024</td>
                                <td>70.1T</td>
                                <td class="positive">+0.6T</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (widgetClasses.includes('data-quality')) { // Data Quality
        content = `
            <div class="detail-panel-header">
                <h4>Data Quality Analysis</h4>
                <div class="time-selector">
                    <button class="time-option selected" data-period="week">Week</button>
                    <button class="time-option" data-period="month">Month</button>
                    <button class="time-option" data-period="quarter">Quarter</button>
                    <button class="time-option" data-period="year">Year</button>
                </div>
            </div>
            <div class="detail-panel-content">
                <div class="detail-chart-container" data-chart-type="bar" data-values="62.1,65.4,68.9,71.2,73.8,76.5,78.4" data-labels="Jun,Jul,Aug,Sep,Oct,Nov,Dec"></div>
                <div class="detail-metrics">
                    <div class="metric-item">
                        <span class="metric-label">Completeness</span>
                        <span class="metric-value">82.3%</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Accuracy</span>
                        <span class="metric-value">76.9%</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Consistency</span>
                        <span class="metric-value">79.2%</span>
                    </div>
                </div>
                <div class="quality-breakdown">
                    <h5>Quality Components</h5>
                    <div class="progress-container">
                        <div class="progress-label">Completeness</div>
                        <div class="progress-bar" data-percentage="82" data-color="#4CAF50"></div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">Accuracy</div>
                        <div class="progress-bar" data-percentage="77" data-color="#2196F3"></div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">Consistency</div>
                        <div class="progress-bar" data-percentage="79" data-color="#9C27B0"></div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-label">Timeliness</div>
                        <div class="progress-bar" data-percentage="85" data-color="#FF9800"></div>
                    </div>
                </div>
            </div>
        `;
    } else if (widgetClasses.includes('opportunity')) { // Gov Contracts
        content = `
            <div class="detail-panel-header">
                <h4>Government Contracts</h4>
                <div class="time-selector">
                    <button class="time-option selected" data-period="week">Week</button>
                    <button class="time-option" data-period="month">Month</button>
                    <button class="time-option" data-period="quarter">Quarter</button>
                    <button class="time-option" data-period="year">Year</button>
                </div>
            </div>
            <div class="detail-panel-content">
                <div class="detail-chart-container" data-chart-type="line" data-values="12,18,24,31,38,42,47" data-labels="Jun,Jul,Aug,Sep,Oct,Nov,Dec"></div>
                <div class="detail-metrics">
                    <div class="metric-item">
                        <span class="metric-label">Avg Value</span>
                        <span class="metric-value">$2.4M</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Win Rate</span>
                        <span class="metric-value">68%</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Pipeline</span>
                        <span class="metric-value">23</span>
                    </div>
                </div>
                <div class="detail-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Agency</th>
                                <th>Contracts</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dept of Defense</td>
                                <td>12</td>
                                <td>$28.4M</td>
                            </tr>
                            <tr>
                                <td>Dept of Energy</td>
                                <td>8</td>
                                <td>$16.2M</td>
                            </tr>
                            <tr>
                                <td>Dept of Education</td>
                                <td>6</td>
                                <td>$9.8M</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (widgetClasses.includes('supply-chain')) { // Critical Suppliers
        content = `
            <div class="detail-panel-header">
                <h4>Critical Suppliers</h4>
                <div class="time-selector">
                    <button class="time-option selected" data-period="week">Week</button>
                    <button class="time-option" data-period="month">Month</button>
                    <button class="time-option" data-period="quarter">Quarter</button>
                    <button class="time-option" data-period="year">Year</button>
                </div>
            </div>
            <div class="detail-panel-content">
                <div class="detail-chart-container" data-chart-type="bar" data-values="8,7,7,6,6,6,6" data-labels="Jun,Jul,Aug,Sep,Oct,Nov,Dec"></div>
                <div class="detail-metrics">
                    <div class="metric-item warning">
                        <span class="metric-label">Risk Level</span>
                        <span class="metric-value">Medium</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">On-Time</span>
                        <span class="metric-value">83%</span>
                    </div>
                    <div class="metric-item critical">
                        <span class="metric-label">Stock Risk</span>
                        <span class="metric-value">High</span>
                    </div>
                </div>
                <div class="supplier-risk-matrix">
                    <h5>Supplier Risk Matrix</h5>
                    <div class="risk-matrix">
                        <div class="risk-quadrant high-impact high-likelihood">High Impact<br>High Likelihood<br><span class="count">2</span></div>
                        <div class="risk-quadrant high-impact low-likelihood">High Impact<br>Low Likelihood<br><span class="count">1</span></div>
                        <div class="risk-quadrant low-impact high-likelihood">Low Impact<br>High Likelihood<br><span class="count">1</span></div>
                        <div class="risk-quadrant low-impact low-likelihood">Low Impact<br>Low Likelihood<br><span class="count">2</span></div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Generic content for other widget types
        content = `
            <div class="detail-panel-header">
                <h4>${kpiLabel} Details</h4>
            </div>
            <div class="detail-panel-content">
                <p>Detailed information will be available soon.</p>
            </div>
        `;
    }
    
    return content;
}

/**
 * Initialize charts and other interactive elements in the detail panel
 */
function initializeDetailPanelCharts(detailPanel) {
    try {
        // Initialize progress bars in the detail panel
        const progressBars = detailPanel.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage') || '75';
            const color = bar.getAttribute('data-color') || '#2B7FFF';
            
            // Clear previous content
            bar.innerHTML = '';
            
            // Create progress fill
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.backgroundColor = color;
            progressFill.style.width = '0%';
            bar.appendChild(progressFill);
            
            // Animate progress bar
            setTimeout(() => {
                progressFill.style.transition = 'width 1s ease-out';
                progressFill.style.width = percentage + '%';
            }, 100);
        });
        
        // Initialize charts in the detail panel
        const chartContainers = detailPanel.querySelectorAll('.detail-chart-container');
        chartContainers.forEach(container => {
            const chartType = container.getAttribute('data-chart-type') || 'line';
            const dataString = container.getAttribute('data-values') || '10,20,30,40,50,60,70';
            const labelsString = container.getAttribute('data-labels') || 'Mon,Tue,Wed,Thu,Fri,Sat,Sun';
            
            const values = dataString.split(',').map(Number);
            const labels = labelsString.split(',');
            
            // Clear previous chart if any
            container.innerHTML = '';
            
            // Create canvas for chart
            const canvas = document.createElement('canvas');
            container.appendChild(canvas);
            
            // Draw chart based on type
            if (chartType === 'line') {
                drawDetailLineChart(canvas, values, labels);
            } else if (chartType === 'bar') {
                drawDetailBarChart(canvas, values, labels);
            }
        });
        
        // Add event listeners to time selector buttons
        const timeButtons = detailPanel.querySelectorAll('.time-option');
        timeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove selected class from all buttons
                timeButtons.forEach(btn => btn.classList.remove('selected'));
                
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Update chart data based on selected time period (would fetch real data in production)
                const period = this.getAttribute('data-period');
                console.log(`Time period changed to: ${period}`);
                
                // In a real implementation, we would update the chart data here
                // For now, just add a subtle animation to simulate data change
                const chartContainer = detailPanel.querySelector('.detail-chart-container');
                if (chartContainer) {
                    chartContainer.classList.add('updating');
                    setTimeout(() => {
                        chartContainer.classList.remove('updating');
                    }, 500);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing detail panel charts:', error);
    }
}

/**
 * Draw a detailed line chart on canvas
 */
function drawDetailLineChart(canvas, values, labels) {
    try {
        const ctx = canvas.getContext('2d');
        const width = canvas.parentNode.clientWidth;
        const height = 200;
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Calculate scales
        const padding = 40;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        const maxValue = Math.max(...values) * 1.1; // Add 10% padding
        const minValue = Math.min(...values) * 0.9; // Subtract 10% padding
        
        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw grid lines
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i <= 4; i++) {
            const y = padding + (chartHeight * (i / 4));
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
        }
        ctx.stroke();
        
        // Draw data points and line
        ctx.beginPath();
        ctx.strokeStyle = '#2B7FFF';
        ctx.lineWidth = 2;
        
        const points = values.map((value, index) => {
            const x = padding + (chartWidth * (index / (values.length - 1)));
            const y = height - padding - (chartHeight * ((value - minValue) / (maxValue - minValue)));
            return [x, y];
        });
        
        // Draw line
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.stroke();
        
        // Draw points
        points.forEach((point, i) => {
            ctx.beginPath();
            ctx.fillStyle = '#2B7FFF';
            ctx.arc(point[0], point[1], 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw value above point
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(values[i], point[0], point[1] - 10);
        });
        
        // Draw x-axis labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        points.forEach((point, i) => {
            ctx.fillText(labels[i], point[0], height - padding + 15);
        });
    } catch (error) {
        console.error('Error drawing detail line chart:', error);
    }
}

/**
 * Draw a detailed bar chart on canvas
 */
function drawDetailBarChart(canvas, values, labels) {
    try {
        const ctx = canvas.getContext('2d');
        const width = canvas.parentNode.clientWidth;
        const height = 200;
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Calculate scales
        const padding = 40;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        const maxValue = Math.max(...values) * 1.1; // Add 10% padding
        
        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw grid lines
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i <= 4; i++) {
            const y = padding + (chartHeight * (i / 4));
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
        }
        ctx.stroke();
        
        // Draw bars
        const barWidth = (chartWidth / values.length) * 0.8;
        const barSpacing = (chartWidth / values.length) * 0.2;
        
        values.forEach((value, index) => {
            const x = padding + (index * (barWidth + barSpacing));
            const barHeight = (value / maxValue) * chartHeight;
            const y = height - padding - barHeight;
            
            // Create gradient for bar
            const gradient = ctx.createLinearGradient(x, y, x, height - padding);
            gradient.addColorStop(0, '#2B7FFF');
            gradient.addColorStop(1, 'rgba(43, 127, 255, 0.5)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw value above bar
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + (barWidth / 2), y - 5);
            
            // Draw x-axis label
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillText(labels[index], x + (barWidth / 2), height - padding + 15);
        });
    } catch (error) {
        console.error('Error drawing detail bar chart:', error);
    }
}

function initializeProgressBars() {
    try {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(container => {
            // Get data from data attributes
            const percentage = container.getAttribute('data-percentage') || '75';
            const color = container.getAttribute('data-color') || '#2B7FFF';
            
            // Clear previous content
            container.innerHTML = '';
            
            // Create progress fill
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.backgroundColor = color;
            progressFill.style.width = '0%'; // Start at 0 for animation
            
            container.appendChild(progressFill);
            
            // Animate the progress bar
            setTimeout(() => {
                progressFill.style.width = `${percentage}%`;
            }, 100);
        });
    } catch (error) {
        console.error('Error initializing progress bars:', error);
    }
}

/**
 * Update KPI widgets with enhanced visualizations
 * Adds sparklines and other visualizations to KPI widgets
 */
function enhanceKpiWidgets() {
    try {
        // Enhance Data Quality KPI
        const dataQualityKpi = document.querySelector('.kpi-widget.data-quality');
        if (dataQualityKpi) {
            // Add data quality donut chart
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            chartContainer.innerHTML = `
                <div class="donut-chart" 
                     data-values="78,15,7" 
                     data-labels="Complete,Partial,Missing" 
                     data-colors="#4CAF50,#FFC107,#F44336" 
                     data-center-text="78%" 
                     data-center-label="Complete"
                     data-show-legend="true">
                </div>
            `;
            
            // Find the right place to insert the chart
            const kpiContent = dataQualityKpi.querySelector('.kpi-content');
            if (kpiContent) {
                kpiContent.appendChild(chartContainer);
            }
        }
        
        // Enhance other KPIs with sparklines
        const kpiWidgets = document.querySelectorAll('.kpi-widget:not(.data-quality)');
        kpiWidgets.forEach(widget => {
            // Skip widgets that don't need sparklines
            if (widget.classList.contains('no-sparkline')) return;
            
            // Create sparkline container
            const sparklineContainer = document.createElement('div');
            sparklineContainer.className = 'sparkline';
            
            // Set different data for different widgets
            if (widget.classList.contains('revenue')) {
                sparklineContainer.setAttribute('data-values', '65,72,78,75,82,87,90');
                sparklineContainer.setAttribute('data-color', '#4CAF50');
            } else if (widget.classList.contains('supply-chain')) {
                sparklineContainer.setAttribute('data-values', '90,85,82,78,75,72,70');
                sparklineContainer.setAttribute('data-color', '#FF9800');
            } else if (widget.classList.contains('anomalies')) {
                sparklineContainer.setAttribute('data-values', '10,15,12,18,14,9,7');
                sparklineContainer.setAttribute('data-color', '#F44336');
            } else {
                // Default data
                sparklineContainer.setAttribute('data-values', '65,59,80,81,56,72,90');
                sparklineContainer.setAttribute('data-color', '#2B7FFF');
            }
            
            // Find the right place to insert the sparkline
            const kpiContent = widget.querySelector('.kpi-content');
            if (kpiContent) {
                kpiContent.appendChild(sparklineContainer);
            }
        });
    } catch (error) {
        console.error('Error enhancing KPI widgets:', error);
    }
}

/**
 * Enhance Financial Anomalies widget with advanced visualizations
 */
function enhanceFinancialAnomalies() {
    try {
        const anomaliesWidget = document.querySelector('.financial-anomalies');
        if (!anomaliesWidget) return;
        
        // Add trend visualization to the header
        const header = anomaliesWidget.querySelector('.widget-header');
        if (header) {
            const trendContainer = document.createElement('div');
            trendContainer.className = 'sparkline anomaly-trend';
            trendContainer.setAttribute('data-values', '12,15,10,18,14,9,7');
            trendContainer.setAttribute('data-color', '#F44336');
            trendContainer.setAttribute('data-labels', 'Mon,Tue,Wed,Thu,Fri,Sat,Today');
            
            header.appendChild(trendContainer);
        }
        
        // Add progress bars to anomaly categories
        const anomalyStats = document.createElement('div');
        anomalyStats.className = 'anomaly-stats data-animate-in';
        anomalyStats.innerHTML = `
            <div class="stat-item">
                <div class="stat-label">Missing Dates <span>32%</span></div>
                <div class="progress-bar" data-percentage="32" data-color="#F44336"></div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Unlinked Transactions <span>45%</span></div>
                <div class="progress-bar" data-percentage="45" data-color="#FF9800"></div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Duplicate Entries <span>23%</span></div>
                <div class="progress-bar" data-percentage="23" data-color="#2B7FFF"></div>
            </div>
        `;
        
        // Insert after the filter panel
        const filterPanel = anomaliesWidget.querySelector('.filter-panel');
        if (filterPanel && filterPanel.parentNode) {
            filterPanel.parentNode.insertBefore(anomalyStats, filterPanel.nextSibling);
        }
    } catch (error) {
        console.error('Error enhancing Financial Anomalies widget:', error);
    }
}

// Initialize enhanced visualizations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a slight delay to ensure all elements are properly rendered
    setTimeout(() => {
        enhanceKpiWidgets();
        enhanceFinancialAnomalies();
        
        // Initialize all visualizations
        initializeDonutCharts();
        initializeSparklines();
        initializeProgressBars();
    }, 500);
});
