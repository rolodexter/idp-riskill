/**
 * Project Stratification Widget
 * Features card-based design with manual and automatic rotation
 */

/**
 * ProjectWidget - Handles project card displays and interactions
 * Displays different project types with interactive controls
 */
class ProjectWidget {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }
        
        console.log(`Initializing Projects widget in container: ${containerId}`);
        this.autoRotateDelay = 8000; // 8 seconds delay for auto-rotation
        this.isMouseOver = false;
        
        // Initialize the widget
        this.init();
    }
    
    init() {
        // Create widget structure if it doesn't exist
        if (!this.container) {
            console.error('Project widget container not found');
            return;
        }
        
        // Create main container
        this.container.classList.add('project-widget');
        
        // Create cards container
        this.cardsContainer = document.createElement('div');
        this.cardsContainer.className = 'project-cards-container';
        this.container.appendChild(this.cardsContainer);
        
        // Create card indicators
        this.indicatorsContainer = document.createElement('div');
        this.indicatorsContainer.className = 'card-indicators';
        this.container.appendChild(this.indicatorsContainer);
        
        // Setup event listeners
        this.container.addEventListener('mouseenter', () => {
            this.isMouseOver = true;
            this.stopAutoRotate();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
            this.startAutoRotate();
        });
        
        // Add mouse wheel support for manual card rotation
        this.container.addEventListener('wheel', (event) => {
            // Prevent default scroll behavior
            event.preventDefault();
            
            // Determine scroll direction
            if (event.deltaY > 0) {
                // Scrolling down - go to next card
                this.nextCard();
            } else {
                // Scrolling up - go to previous card
                this.prevCard();
            }
            
            // Reset auto-rotation timer but don't start it if mouse is over
            if (!this.isMouseOver) {
                this.startAutoRotate();
            }
        }, { passive: false });
        
        // Add project cards
        this.addProjectCards();
        
        // Start auto-rotation
        this.startAutoRotate();
    }
    
    addProjectCards() {
        // Add Tera-Projects card
        this.addCard({
            type: 'Tera-Projects',
            code: 'Z001',
            value: '10T+',
            valueLabel: 'pesos',
            description: 'Largest government contracts with avg deal size of 671B+ pesos',
            trendValues: [8.2, 8.7, 9.1, 9.4, 9.8, 10.0, 10.2],
            trendLabels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            growth: '+14.2%',
            growthLabel: 'YoY',
            forecast: '↗ 6.2%',
            freshness: 'Live',
            indicatorClass: 'tera-indicator',
            details: [
                { label: 'Key Accounts', value: '3 Gov Contracts' },
                { label: 'Avg Deal', value: '671B+ pesos' },
                { label: 'Lead Rep', value: 'CMARTINEZ' }
            ],
            insights: [
                'Primary naval/military contracts',
                'Ultra-high value defense systems',
                '12-18 month implementation cycles'
            ]
        });
        
        // Add Giga-Projects card
        this.addCard({
            type: 'Giga-Projects',
            code: 'S001/S002/U001',
            value: '473B',
            valueLabel: 'pesos',
            description: 'Major systems and international operations (100B-1T pesos)',
            trendValues: [410, 425, 437, 445, 452, 465, 473],
            trendLabels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            growth: '+8.7%',
            growthLabel: 'YoY',
            forecast: '↗ 3.9%',
            freshness: '2h ago',
            indicatorClass: 'giga-indicator',
            details: [
                { label: 'Key Units', value: 'S001/S002' },
                { label: 'Int\'l Suppliers', value: '27+' },
                { label: 'Specialists', value: 'FMAMONDE/ALAMBRECHTS' }
            ],
            insights: [
                'Major systems integration projects',
                'European supplier dependencies',
                'Cross-functional implementation teams'
            ]
        });
        
        // Add Mega-Projects card
        this.addCard({
            type: 'Mega-Projects',
            code: 'P001/P003',
            value: '42.5B',
            valueLabel: 'pesos',
            description: 'Standard operational business (1-100B pesos)',
            trendValues: [32, 35, 37, 38, 40, 41, 42.5],
            trendLabels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            growth: '+12.4%',
            growthLabel: 'YoY',
            forecast: '↗ 4.5%',
            freshness: '4h ago',
            indicatorClass: 'mega-indicator',
            details: [
                { label: 'Revenue', value: 'P001: 11T+ pesos' },
                { label: 'Growth Areas', value: '2 units' },
                { label: 'Customer Base', value: '47% Gov' }
            ],
            insights: [
                'Highest transaction frequency',
                'Strategic business development focus',
                'Cross-entity collaborations with GDO'
            ]
        });
        
        // Add Standard-Projects card
        this.addCard({
            type: 'Standard-Projects',
            code: 'P002/S003',
            value: '883M',
            valueLabel: 'pesos',
            description: 'Lower value high-volume operations',
            trendValues: [720, 745, 780, 795, 825, 860, 883],
            trendLabels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            growth: '+22.6%',
            growthLabel: 'YoY',
            forecast: '↗ 8.1%',
            freshness: '6h ago',
            indicatorClass: 'standard-indicator',
            details: [
                { label: 'Transactions', value: '421+' },
                { label: 'Local Suppliers', value: '23+' },
                { label: 'Avg Deal', value: '2.1M pesos' }
            ],
            insights: [
                'Highest growth category',
                'Primarily domestic suppliers',
                'Operational standardization opportunity'
            ]
        });
        
        // Initialize first card as active
        if (this.cards.length > 0) {
            this.cards[0].classList.add('active');
            this.updateIndicators();
        }
    }
    
    addCard(projectData) {
        // Create card element
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Add status indicator
        const indicator = document.createElement('div');
        indicator.className = projectData.indicatorClass;
        card.appendChild(indicator);
        
        // Create card content
        const cardContent = this.createCardContent(projectData);
        card.appendChild(cardContent);
        
        // Add to DOM and cards array
        this.cardsContainer.appendChild(card);
        this.cards.push(card);
        
        // Add indicator dot
        const indicator_dot = document.createElement('div');
        indicator_dot.className = 'card-indicator';
        indicator_dot.addEventListener('click', () => {
            this.rotateToCard(this.cards.indexOf(card));
        });
        this.indicatorsContainer.appendChild(indicator_dot);
    }
    
    rotateToCard(index) {
        if (index < 0 || index >= this.cards.length || index === this.currentIndex) {
            return;
        }
        
        // Remove active class from current card
        this.cards[this.currentIndex].classList.remove('active');
        
        // Determine direction and set appropriate classes
        if (index > this.currentIndex) {
            this.cards[this.currentIndex].classList.add('prev');
            this.cards[index].classList.remove('next', 'prev');
        } else {
            this.cards[this.currentIndex].classList.add('next');
            this.cards[index].classList.remove('next', 'prev');
        }
        
        // Set new card as active
        this.cards[index].classList.add('active');
        
        // Update current index
        this.currentIndex = index;
        
        // Update indicators
        this.updateIndicators();
        
        // Reset auto-rotation timer
        if (!this.isMouseOver) {
            this.startAutoRotate();
        }
    }
    
    updateIndicators() {
        // Update indicator dots
        const dots = this.indicatorsContainer.querySelectorAll('.card-indicator');
        dots.forEach((dot, i) => {
            if (i === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    nextCard() {
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.rotateToCard(nextIndex);
    }
    
    prevCard() {
        const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.rotateToCard(prevIndex);
    }
    
    startAutoRotate() {
        this.stopAutoRotate();
        this.autoRotateTimer = setInterval(() => {
            this.nextCard();
        }, this.autoRotateDelay);
    }
    
    stopAutoRotate() {
        if (this.autoRotateTimer) {
            clearInterval(this.autoRotateTimer);
            this.autoRotateTimer = null;
        }
    }
    
    getColorForIndicator(indicatorClass) {
        switch(indicatorClass) {
            case 'tera-indicator':
                return '#ff7700';
            case 'giga-indicator':
                return '#4287f5';
            case 'mega-indicator':
                return '#32a852';
            case 'standard-indicator':
                return '#d4d422';
            default:
                return '#cccccc';
        }
    }
    
    createCardContent(data) {
        // Create details elements if they exist
        let detailsHtml = '';
        if (data.details && data.details.length > 0) {
            detailsHtml = `
                <div class="project-details">
                    ${data.details.map(detail => `
                        <div class="detail-item">
                            <span class="detail-label">${detail.label}:</span>
                            <span class="detail-value">${detail.value}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Create insights elements if they exist
        let insightsHtml = '';
        if (data.insights && data.insights.length > 0) {
            insightsHtml = `
                <div class="project-insights">
                    <h4>Key Insights</h4>
                    <ul>
                        ${data.insights.map(insight => `<li>${insight}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Create card content element
        const content = document.createElement('div');
        content.className = 'card-content';
        content.innerHTML = `
            <div class="card-header">
                <div class="project-type">${data.type}</div>
                <div class="project-code">${data.code}</div>
            </div>
            <div class="card-body">
                <div class="project-value">${data.value} <span class="value-label">${data.valueLabel}</span></div>
                <div class="project-description">${data.description}</div>
                ${detailsHtml}
                <div class="trend-container">
                    <div class="sparkline"></div>
                </div>
                ${insightsHtml}
                <div class="card-footer">
                    <div class="growth-indicator">
                        <span class="growth-value">${data.growth}</span>
                        <span class="growth-label">${data.growthLabel}</span>
                    </div>
                    <div class="forecast-indicator">
                        <span class="forecast-value" title="AI-driven forecast">${data.forecast}</span>
                        <span class="data-freshness">${data.freshness}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Setup sparkline visualization after DOM insertion
        setTimeout(() => {
            const sparklineEl = content.querySelector('.sparkline');
            if (sparklineEl) {
                this.createSparkline(sparklineEl, data.trendValues, data.trendLabels, this.getColorForIndicator(data.indicatorClass));
            }
        }, 10);
        
        return content;
    }
    
    createSparkline(element, values, labels, color) {
        // Simple sparkline implementation using inline SVG
        if (!element || !values || values.length === 0) return;
        
        const width = element.offsetWidth || 120;
        const height = element.offsetHeight || 40;
        const padding = 2;
        const dataPoints = values.length;
        
        // Normalize values to fit in the height
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const range = maxValue - minValue;
        
        // Calculate points for the polyline
        let points = '';
        const segmentWidth = (width - (padding * 2)) / (dataPoints - 1);
        
        values.forEach((value, index) => {
            const x = padding + (index * segmentWidth);
            // Normalize the value to fit within the SVG height (inverted Y-axis in SVG)
            const normalizedValue = range === 0 ? 0.5 : (value - minValue) / range;
            const y = height - padding - (normalizedValue * (height - (padding * 2)));
            points += `${x},${y} `;
        });
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('preserveAspectRatio', 'none');
        
        // Create polyline for the sparkline
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', points);
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke', color);
        polyline.setAttribute('stroke-width', '1.5');
        polyline.setAttribute('vector-effect', 'non-scaling-stroke');
        
        // Add to SVG
        svg.appendChild(polyline);
        
        // Add last point highlight
        const lastPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const lastX = padding + ((dataPoints - 1) * segmentWidth);
        const lastNormalizedValue = range === 0 ? 0.5 : (values[values.length - 1] - minValue) / range;
        const lastY = height - padding - (lastNormalizedValue * (height - (padding * 2)));
        
        lastPoint.setAttribute('cx', lastX);
        lastPoint.setAttribute('cy', lastY);
        lastPoint.setAttribute('r', '2.5');
        lastPoint.setAttribute('fill', color);
        
        svg.appendChild(lastPoint);
        
        // Clear element and append SVG
        element.innerHTML = '';
        element.appendChild(svg);
    }
}

// Export for modular usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectWidget };
}
