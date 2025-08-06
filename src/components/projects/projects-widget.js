/**
 * Project Stratification Widget
 * Features card-based design with manual and automatic rotation
 */

class ProjectWidget {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.cards = [];
        this.currentIndex = 0;
        this.autoRotateTimer = null;
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
            growth: '+12.5%',
            growthLabel: 'YoY',
            forecast: '↗ 6.2%',
            freshness: 'Live',
            indicatorClass: 'tera-indicator'
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
            indicatorClass: 'giga-indicator'
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
            growth: '+15.2%',
            growthLabel: 'YoY',
            forecast: '↗ 5.8%',
            freshness: '3h ago',
            indicatorClass: 'mega-indicator'
        });
        
        // Add Standard-Projects card
        this.addCard({
            type: 'Standard-Projects',
            code: 'P002/S003',
            value: '756M',
            valueLabel: 'pesos',
            description: 'Higher volume operations (under 1B pesos)',
            trendValues: [612, 645, 672, 690, 710, 735, 756],
            trendLabels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            growth: '+6.7%',
            growthLabel: 'YoY',
            forecast: '↗ 2.9%',
            freshness: '4h ago',
            indicatorClass: 'standard-indicator'
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
        
        // Add card header
        const header = document.createElement('div');
        header.className = 'project-card-header';
        
        const projectType = document.createElement('div');
        projectType.className = 'project-type';
        projectType.textContent = projectData.type;
        header.appendChild(projectType);
        
        const projectCode = document.createElement('div');
        projectCode.className = 'project-code';
        projectCode.textContent = projectData.code;
        header.appendChild(projectCode);
        
        card.appendChild(header);
        
        // Add project value
        const valueContainer = document.createElement('div');
        valueContainer.className = 'project-value';
        valueContainer.textContent = `${projectData.value} ${projectData.valueLabel}`;
        card.appendChild(valueContainer);
        
        // Add description
        const description = document.createElement('div');
        description.className = 'project-description';
        description.textContent = projectData.description;
        card.appendChild(description);
        
        // Add trend information
        const trend = document.createElement('div');
        trend.className = 'project-trend';
        
        // Growth metrics
        const growthInfo = document.createElement('div');
        growthInfo.className = 'growth-info';
        growthInfo.innerHTML = `<span class="growth-value">${projectData.growth}</span> <span class="growth-label">${projectData.growthLabel}</span>`;
        trend.appendChild(growthInfo);
        
        // Sparkline will be added here
        const sparklineContainer = document.createElement('div');
        sparklineContainer.className = 'micro-trend sparkline';
        sparklineContainer.setAttribute('data-values', projectData.trendValues.join(','));
        sparklineContainer.setAttribute('data-labels', projectData.trendLabels.join(','));
        sparklineContainer.setAttribute('data-color', this.getColorForIndicator(projectData.indicatorClass));
        trend.appendChild(sparklineContainer);
        
        card.appendChild(trend);
        
        // Add data context (forecast & freshness)
        const dataContext = document.createElement('div');
        dataContext.className = 'data-context';
        dataContext.innerHTML = `
            <span class="forecast-indicator positive" title="AI-driven forecast">${projectData.forecast}</span>
            <span class="data-freshness" title="Last updated">${projectData.freshness}</span>
        `;
        card.appendChild(dataContext);
        
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
                return '#FF5252';
            case 'giga-indicator':
                return '#2B7FFF';
            case 'mega-indicator':
                return '#4CAF50';
            case 'standard-indicator':
                return '#FFC107';
            default:
                return 'rgba(255, 255, 255, 0.5)';
        }
    }
}

// Export for modular usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectWidget };
}
