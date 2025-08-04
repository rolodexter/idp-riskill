/**
 * Enhanced Anomalies Widget
 * 
 * This file contains advanced animations, visualizations, and interactions
 * for the Anomalies widget in the IDP-Riskill dashboard.
 * 
 * Dependencies:
 * - GSAP (GreenSock Animation Platform)
 * - D3.js
 * - Tippy.js
 * - SortableJS
 * - Floating UI
 * - Observable Plot
 */

// Using global variables from CDN imports
// These will be loaded via script tags in the HTML

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing enhanced anomalies');
  
  // Check for required libraries
  const libraries = {
    gsap: typeof gsap !== 'undefined',
    d3: typeof d3 !== 'undefined',
    tippy: typeof tippy !== 'undefined',
    Sortable: typeof Sortable !== 'undefined',
    Plot: typeof Plot !== 'undefined',
    FloatingUIDOM: typeof FloatingUIDOM !== 'undefined'
  };
  
  // Log library availability
  console.log('Library availability:', libraries);
  
  // Initialize basic features that don't depend on external libraries
  initBasicEnhancements();
  
  // Initialize advanced features if libraries are available
  if (libraries.gsap && libraries.d3) {
    console.log('Initializing animations and visualizations');
    initAnimations();
  }
  
  // Initialize tooltips if tippy is available
  if (libraries.tippy) {
    console.log('Initializing enhanced tooltips');
    setupEnhancedTooltips();
  }
  
  // Initialize sortable if Sortable is available
  if (libraries.Sortable) {
    console.log('Initializing sortable anomalies');
    setupSortableAnomalies();
  }
  
  // Initialize context menus if FloatingUIDOM is available
  if (libraries.FloatingUIDOM) {
    console.log('Initializing context menus');
    setupContextMenus();
  }
});

/**
 * Initialize basic enhancements that don't depend on external libraries
 */
function initBasicEnhancements() {
  console.log('Setting up basic enhancements');
  
  // Get anomalies widget elements
  const anomaliesWidget = document.querySelector('.anomalies');
  if (!anomaliesWidget) {
    console.error('Anomalies widget not found');
    return;
  }
  
  // Set up filter button toggle
  const filterBtn = anomaliesWidget.querySelector('.filter-btn');
  const filterMenu = anomaliesWidget.querySelector('.filter-menu');
  
  if (filterBtn && filterMenu) {
    filterBtn.addEventListener('click', function() {
      filterMenu.style.display = filterMenu.style.display === 'none' ? 'block' : 'none';
    });
  }
  
  // Set up filter options
  const filterOptions = anomaliesWidget.querySelectorAll('.filter-option');
  const anomalyItems = anomaliesWidget.querySelectorAll('.anomaly-item');
  
  filterOptions.forEach(option => {
    option.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      
      // Update active state
      filterOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      anomalyItems.forEach(item => {
        if (type === 'all' || item.getAttribute('data-anomaly-type') === type) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
      
      // Hide filter menu
      filterMenu.style.display = 'none';
    });
  });
  
  // Add hover effects to anomaly items
  anomalyItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    item.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
}

/**
 * Initialize animations if GSAP is available
 */
function initAnimations() {
  console.log('Setting up animations with GSAP');
  
  // Get anomalies widget elements
  const anomaliesWidget = document.querySelector('.anomalies');
  if (!anomaliesWidget) {
    console.error('Anomalies widget not found');
    return;
  }
  
  const anomalyItems = anomaliesWidget.querySelectorAll('.anomaly-item');
  
  // Staggered entrance animation
  if (typeof gsap !== 'undefined') {
    gsap.from(anomalyItems, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
    
    // Pulse animation for type indicators
    const typeIndicators = anomaliesWidget.querySelectorAll('.anomaly-type-indicator');
    typeIndicators.forEach(indicator => {
      gsap.to(indicator, {
        scale: 1.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }
  
  // Set up micro-visualizations if d3 is available
  if (typeof d3 !== 'undefined') {
    setupMicroVisualizations();
  }
}

/**
 * Set up micro-visualizations using D3.js
 */
function setupMicroVisualizations() {
  console.log('Setting up micro-visualizations with D3');
  
  try {
    // Simple example: add a sparkline to each anomaly item
    const anomalyItems = document.querySelectorAll('.anomaly-item');
    
    anomalyItems.forEach(item => {
      // Create a small container for the sparkline
      const sparklineContainer = document.createElement('div');
      sparklineContainer.className = 'sparkline-container';
      item.appendChild(sparklineContainer);
      
      // Generate some random data for the sparkline
      const data = Array.from({length: 10}, () => Math.random() * 10);
      
      // Create SVG element
      const svg = d3.select(sparklineContainer)
        .append('svg')
        .attr('width', 50)
        .attr('height', 20);
      
      // Create scales
      const xScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, 50]);
      
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([20, 0]);
      
      // Create line generator
      const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));
      
      // Add path
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#888')
        .attr('stroke-width', 1)
        .attr('d', line);
    });
  } catch (error) {
    console.error('Error setting up micro-visualizations:', error);
  }
}

/**
 * Setup all enhancements for the Anomalies widget
 */
function setupEnhancements() {
  // Phase 1: Core Animation Enhancements
  setupGsapAnimations();
  setupCardFlipAnimations();
  
  // Phase 2: Data Visualization Enhancements
  setupMicroVisualizations();
  setupTrendVisualizations();
  
  // Phase 3: Interaction Enhancements
  setupEnhancedTooltips();
  setupSortableAnomalies();
  setupContextMenus();
}

/**
 * Setup GSAP animations for anomaly items
 */
function setupGsapAnimations() {
  try {
    const anomalyItems = document.querySelectorAll('.anomaly-item');
    if (!anomalyItems.length) return;
    
    // Reset initial state
    gsap.set(anomalyItems, { 
      opacity: 0, 
      y: 15 
    });
    
    // Staggered entrance animation
    gsap.to(anomalyItems, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out",
      clearProps: "all"
    });
    
    // Setup hover animations
    anomalyItems.forEach(item => {
      const indicator = item.querySelector('.anomaly-type-indicator');
      
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          duration: 0.2
        });
        
        if (indicator) {
          gsap.to(indicator, {
            scale: 1.2,
            opacity: 0.9,
            duration: 0.2
          });
        }
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          duration: 0.2
        });
        
        if (indicator) {
          gsap.to(indicator, {
            scale: 1,
            opacity: 0.7,
            duration: 0.2
          });
        }
      });
    });
    
    // Setup filter animation
    const filterBtn = document.querySelector('.anomalies .filter-btn');
    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        const filterMenu = document.querySelector('.filter-menu');
        if (filterMenu) {
          if (filterMenu.style.display === 'none') {
            filterMenu.style.display = 'block';
            gsap.from(filterMenu, {
              opacity: 0,
              y: -10,
              duration: 0.2,
              ease: "power2.out"
            });
          } else {
            gsap.to(filterMenu, {
              opacity: 0,
              y: -10,
              duration: 0.2,
              ease: "power2.in",
              onComplete: () => {
                filterMenu.style.display = 'none';
                gsap.set(filterMenu, { opacity: 1, y: 0 });
              }
            });
          }
        }
      });
    }
    
    // Setup filter option animations
    document.querySelectorAll('.filter-option').forEach(option => {
      option.addEventListener('click', () => {
        const type = option.getAttribute('data-type');
        const anomalyItems = document.querySelectorAll('.anomaly-item');
        
        // Animate filtered items
        anomalyItems.forEach(item => {
          if (type === 'all' || item.getAttribute('data-anomaly-type') === type) {
            gsap.fromTo(item, 
              { opacity: 0, scale: 0.95 },
              { 
                opacity: 1, 
                scale: 1, 
                duration: 0.3, 
                ease: "power1.out",
                clearProps: "scale"
              }
            );
            item.style.display = 'flex';
          } else {
            gsap.to(item, {
              opacity: 0,
              scale: 0.95,
              duration: 0.2,
              ease: "power1.in",
              onComplete: () => {
                item.style.display = 'none';
                gsap.set(item, { opacity: 1, scale: 1 });
              }
            });
          }
        });
      });
    });
  } catch (error) {
    console.error('Error setting up GSAP animations:', error);
  }
}

/**
 * Setup 3D card flip animations for anomaly items
 */
function setupCardFlipAnimations() {
  try {
    const anomalyItems = document.querySelectorAll('.anomaly-item');
    if (!anomalyItems.length) return;
    
    anomalyItems.forEach(item => {
      // Create front and back elements if they don't exist
      if (!item.querySelector('.card-front')) {
        // Store original content
        const originalContent = item.innerHTML;
        
        // Create card structure
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.innerHTML = originalContent;
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        
        // Get anomaly type and create detailed back content
        const type = item.getAttribute('data-anomaly-type') || 'unknown';
        const title = item.querySelector('.anomaly-details span')?.textContent || 'Unknown';
        
        cardBack.innerHTML = `
          <div class="anomaly-details-expanded">
            <div class="detail-header">${title}</div>
            <div class="detail-type">Type: ${type}</div>
            <div class="detail-impact">Impact: High</div>
            <div class="detail-chart"></div>
            <div class="detail-actions">
              <button class="action-btn investigate">Investigate</button>
              <button class="action-btn resolve">Resolve</button>
            </div>
          </div>
        `;
        
        // Clear item and add new structure
        item.innerHTML = '';
        item.appendChild(cardFront);
        item.appendChild(cardBack);
        
        // Add CSS class for 3D perspective
        item.classList.add('card-3d-container');
        
        // Add flip state tracking
        item.setAttribute('data-flipped', 'false');
        
        // Add click handler for flip
        item.addEventListener('click', () => {
          const isFlipped = item.getAttribute('data-flipped') === 'true';
          
          // Toggle flip state
          item.setAttribute('data-flipped', !isFlipped);
          
          // Animate with GSAP
          if (!isFlipped) {
            // Flip to back
            gsap.to(item, {
              rotationY: 180,
              duration: 0.6,
              ease: "power1.inOut"
            });
            
            gsap.to(cardFront, {
              opacity: 0,
              duration: 0.3
            });
            
            gsap.to(cardBack, {
              opacity: 1,
              delay: 0.3,
              duration: 0.3
            });
          } else {
            // Flip to front
            gsap.to(item, {
              rotationY: 0,
              duration: 0.6,
              ease: "power1.inOut"
            });
            
            gsap.to(cardBack, {
              opacity: 0,
              duration: 0.3
            });
            
            gsap.to(cardFront, {
              opacity: 1,
              delay: 0.3,
              duration: 0.3
            });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error setting up card flip animations:', error);
  }
}

/**
 * Setup D3.js micro-visualizations for anomaly items
 */
function setupMicroVisualizations() {
  try {
    const anomalyItems = document.querySelectorAll('.anomaly-item');
    if (!anomalyItems.length) return;
    
    anomalyItems.forEach(item => {
      // Find or create container for micro-visualization
      let microVizContainer = item.querySelector('.micro-viz');
      if (!microVizContainer) {
        microVizContainer = document.createElement('div');
        microVizContainer.className = 'micro-viz';
        
        // Insert after anomaly details
        const anomalyDetails = item.querySelector('.anomaly-details');
        if (anomalyDetails) {
          anomalyDetails.appendChild(microVizContainer);
        }
      }
      
      // Generate random data for demonstration
      // In production, this would use real anomaly data
      const dataPoints = 7;
      const data = Array.from({ length: dataPoints }, () => Math.floor(Math.random() * 100));
      
      // Create SVG with D3
      const width = 60;
      const height = 20;
      const svg = d3.select(microVizContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "micro-sparkline");
      
      // Create scales
      const x = d3.scaleLinear()
        .domain([0, dataPoints - 1])
        .range([0, width]);
      
      const y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);
      
      // Create line generator
      const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(d3.curveCatmullRom);
      
      // Add path
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", getColorForType(item.getAttribute('data-anomaly-type')))
        .attr("stroke-width", 1)
        .attr("d", line);
      
      // Add endpoint dot if last value is highest or lowest
      const lastValue = data[data.length - 1];
      const isExtreme = lastValue === d3.max(data) || lastValue === d3.min(data);
      
      if (isExtreme) {
        svg.append("circle")
          .attr("cx", x(data.length - 1))
          .attr("cy", y(lastValue))
          .attr("r", 2)
          .attr("fill", lastValue === d3.max(data) ? "#F44336" : "#4CAF50");
      }
    });
    
    // Create detailed chart for card back
    document.querySelectorAll('.detail-chart').forEach(container => {
      // Generate more detailed random data
      const dataPoints = 14;
      const data = Array.from({ length: dataPoints }, (_, i) => ({
        date: new Date(2025, 7, i + 1),
        value: Math.floor(Math.random() * 100),
        isAnomaly: Math.random() > 0.8
      }));
      
      // Create detailed chart with D3
      const width = 180;
      const height = 60;
      const margin = { top: 5, right: 5, bottom: 5, left: 5 };
      
      const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      
      const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right]);
      
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height - margin.bottom, margin.top]);
      
      // Add line
      const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
        .curve(d3.curveCatmullRom);
      
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#2B7FFF")
        .attr("stroke-width", 1)
        .attr("d", line);
      
      // Add area
      const area = d3.area()
        .x(d => x(d.date))
        .y0(height - margin.bottom)
        .y1(d => y(d.value))
        .curve(d3.curveCatmullRom);
      
      svg.append("path")
        .datum(data)
        .attr("fill", "#2B7FFF")
        .attr("fill-opacity", 0.1)
        .attr("d", area);
      
      // Add anomaly points
      svg.selectAll(".anomaly-point")
        .data(data.filter(d => d.isAnomaly))
        .enter()
        .append("circle")
        .attr("class", "anomaly-point")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .attr("fill", "#F44336");
    });
  } catch (error) {
    console.error('Error setting up micro-visualizations:', error);
  }
}

/**
 * Setup trend visualizations with Observable Plot
 */
function setupTrendVisualizations() {
  try {
    // Find the trend container in the header
    const trendContainer = document.querySelector('.anomalies .anomaly-trend');
    if (!trendContainer) return;
    
    // Clear existing content
    trendContainer.innerHTML = '';
    
    // Generate data for the plot
    const data = [
      { date: "2025-07-28", value: 12, isAnomaly: false },
      { date: "2025-07-29", value: 15, isAnomaly: false },
      { date: "2025-07-30", value: 10, isAnomaly: false },
      { date: "2025-07-31", value: 18, isAnomaly: true },
      { date: "2025-08-01", value: 14, isAnomaly: false },
      { date: "2025-08-02", value: 9, isAnomaly: false },
      { date: "2025-08-03", value: 7, isAnomaly: false }
    ];
    
    // Create plot with Observable Plot
    const plot = Plot.plot({
      width: 120,
      height: 40,
      margin: 0,
      x: { type: "point", domain: data.map(d => d.date), axis: null },
      y: { domain: [0, 20], axis: null },
      marks: [
        Plot.line(data, {
          x: "date",
          y: "value",
          stroke: "#F44336",
          strokeWidth: 1.5
        }),
        Plot.dot(data.filter(d => d.isAnomaly), {
          x: "date",
          y: "value",
          fill: "#F44336",
          r: 3
        })
      ]
    });
    
    // Append the plot to the container
    trendContainer.appendChild(plot);
  } catch (error) {
    console.error('Error setting up trend visualizations:', error);
  }
}

/**
 * Setup enhanced tooltips with Tippy.js
 */
function setupEnhancedTooltips() {
  try {
    // Import Tippy.js styles
    const linkElem = document.createElement('link');
    linkElem.rel = 'stylesheet';
    linkElem.href = 'https://unpkg.com/tippy.js@6/dist/tippy.css';
    document.head.appendChild(linkElem);
    
    // Create custom theme
    const style = document.createElement('style');
    style.textContent = `
      .tippy-box[data-theme~='idp-minimal'] {
        background-color: rgba(30, 30, 30, 0.95);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        font-size: 12px;
      }
      
      .tippy-box[data-theme~='idp-minimal'] .tippy-content {
        padding: 8px 10px;
      }
      
      .anomaly-tooltip {
        min-width: 180px;
      }
      
      .tooltip-header {
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .tooltip-detail {
        font-size: 11px;
        opacity: 0.8;
        margin-bottom: 4px;
      }
      
      .tooltip-impact {
        font-size: 11px;
        display: flex;
        align-items: center;
      }
      
      .tooltip-impact::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #F44336;
        margin-right: 4px;
      }
    `;
    document.head.appendChild(style);
    
    // Setup tooltips for anomaly items
    tippy('.anomaly-item', {
      content(reference) {
        const title = reference.querySelector('.anomaly-details span')?.textContent || 'Unknown';
        const details = reference.querySelector('.anomaly-details small')?.textContent || '';
        const type = reference.getAttribute('data-anomaly-type') || 'unknown';
        
        const content = document.createElement('div');
        content.className = 'anomaly-tooltip';
        content.innerHTML = `
          <div class="tooltip-header">${title}</div>
          <div class="tooltip-detail">${details}</div>
          <div class="tooltip-impact">Impact: High</div>
        `;
        
        return content;
      },
      allowHTML: true,
      animation: 'shift-away-subtle',
      theme: 'idp-minimal',
      delay: [100, 0],
      duration: [200, 150],
      placement: 'right',
      trigger: 'mouseenter focus',
      interactive: true
    });
    
    // Setup tooltips for type indicators
    tippy('.anomaly-type-indicator', {
      content(reference) {
        const type = reference.parentNode.getAttribute('data-anomaly-type') || 'unknown';
        return `Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
      },
      theme: 'idp-minimal',
      delay: [100, 0],
      duration: [200, 150],
      placement: 'right'
    });
  } catch (error) {
    console.error('Error setting up enhanced tooltips:', error);
  }
}

/**
 * Setup sortable anomalies with SortableJS
 */
function setupSortableAnomalies() {
  try {
    const anomalyList = document.querySelector('.anomaly-list');
    if (!anomalyList) return;
    
    // Initialize Sortable
    Sortable.create(anomalyList, {
      animation: 150,
      ghostClass: 'anomaly-ghost',
      chosenClass: 'anomaly-chosen',
      dragClass: 'anomaly-drag',
      handle: '.anomaly-item',
      onEnd: function(evt) {
        // Show a subtle notification
        const notification = document.createElement('div');
        notification.className = 'sort-notification';
        notification.textContent = 'Anomaly priority updated';
        document.body.appendChild(notification);
        
        // Animate notification
        gsap.fromTo(notification, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.3,
            onComplete: () => {
              setTimeout(() => {
                gsap.to(notification, {
                  opacity: 0,
                  y: -20,
                  duration: 0.3,
                  onComplete: () => notification.remove()
                });
              }, 2000);
            }
          }
        );
      }
    });
    
    // Add styles for sortable
    const style = document.createElement('style');
    style.textContent = `
      .anomaly-ghost {
        opacity: 0.5;
        background: rgba(255, 255, 255, 0.05);
      }
      
      .anomaly-chosen {
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
      }
      
      .anomaly-drag {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
      
      .sort-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(30, 30, 30, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
      }
    `;
    document.head.appendChild(style);
  } catch (error) {
    console.error('Error setting up sortable anomalies:', error);
  }
}

/**
 * Setup context menus with Floating UI
 */
function setupContextMenus() {
  try {
    // Create context menu element if it doesn't exist
    let contextMenu = document.querySelector('.anomaly-context-menu');
    if (!contextMenu) {
      contextMenu = document.createElement('div');
      contextMenu.className = 'anomaly-context-menu';
      contextMenu.innerHTML = `
        <div class="menu-item" data-action="investigate">
          <i class="ph ph-magnifying-glass"></i>
          <span>Investigate</span>
        </div>
        <div class="menu-item" data-action="resolve">
          <i class="ph ph-check"></i>
          <span>Mark as Resolved</span>
        </div>
        <div class="menu-item" data-action="assign">
          <i class="ph ph-user"></i>
          <span>Assign</span>
        </div>
        <div class="menu-item" data-action="share">
          <i class="ph ph-share-network"></i>
          <span>Share</span>
        </div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="hide">
          <i class="ph ph-eye-slash"></i>
          <span>Hide</span>
        </div>
      `;
      document.body.appendChild(contextMenu);
      
      // Add styles for context menu
      const style = document.createElement('style');
      style.textContent = `
        .anomaly-context-menu {
          position: absolute;
          background: rgba(30, 30, 30, 0.95);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          min-width: 160px;
          z-index: 1000;
          display: none;
        }
        
        .menu-item {
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 12px;
        }
        
        .menu-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .menu-separator {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 4px 0;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Setup context menu trigger
    document.querySelectorAll('.anomaly-item').forEach(item => {
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        // Position the menu with Floating UI
        FloatingUIDOM.computePosition(item, contextMenu, {
          placement: 'right-start',
          middleware: [FloatingUIDOM.offset(5), FloatingUIDOM.flip(), FloatingUIDOM.shift()]
        }).then(({x, y}) => {
          contextMenu.style.left = `${x}px`;
          contextMenu.style.top = `${y}px`;
          contextMenu.style.display = 'block';
          
          // Store reference to the current item
          contextMenu.setAttribute('data-target', item.getAttribute('data-anomaly-id') || '');
        });
      });
    });
    
    // Close context menu when clicking elsewhere
    document.addEventListener('click', () => {
      contextMenu.style.display = 'none';
    });
    
    // Handle context menu actions
    contextMenu.querySelectorAll('.menu-item').forEach(menuItem => {
      menuItem.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const action = menuItem.getAttribute('data-action');
        const targetId = contextMenu.getAttribute('data-target');
        
        // Handle different actions
        switch (action) {
          case 'investigate':
            console.log(`Investigating anomaly ${targetId}`);
            break;
          case 'resolve':
            console.log(`Resolving anomaly ${targetId}`);
            // Find the target item and mark as resolved
            document.querySelectorAll('.anomaly-item').forEach(item => {
              if (item.getAttribute('data-anomaly-id') === targetId) {
                // Add resolved class and animate out
                item.classList.add('resolved');
                gsap.to(item, {
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  padding: 0,
                  duration: 0.3,
                  onComplete: () => {
                    item.style.display = 'none';
                  }
                });
              }
            });
            break;
          case 'assign':
            console.log(`Assigning anomaly ${targetId}`);
            break;
          case 'share':
            console.log(`Sharing anomaly ${targetId}`);
            break;
          case 'hide':
            console.log(`Hiding anomaly ${targetId}`);
            // Find the target item and hide it
            document.querySelectorAll('.anomaly-item').forEach(item => {
              if (item.getAttribute('data-anomaly-id') === targetId) {
                gsap.to(item, {
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  padding: 0,
                  duration: 0.3,
                  onComplete: () => {
                    item.style.display = 'none';
                  }
                });
              }
            });
            break;
        }
        
        // Hide the menu
        contextMenu.style.display = 'none';
      });
    });
  } catch (error) {
    console.error('Error setting up context menus:', error);
  }
}

/**
 * Helper function to get color for anomaly type
 */
function getColorForType(type) {
  switch (type) {
    case 'transaction':
      return '#2B7FFF'; // Blue
    case 'vendor':
      return '#4CAF50'; // Green
    case 'customer':
      return '#FF9800'; // Amber
    case 'product':
      return '#9C27B0'; // Purple
    case 'cross':
      return '#009688'; // Teal
    default:
      return '#F44336'; // Red
  }
}

// Initialize when imported
initEnhancedAnomalies();
