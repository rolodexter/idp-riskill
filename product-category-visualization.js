/**
 * Initialize Product Category Intelligence Chart
 */
function initializeProductCategoryChart() {
    try {
        const chartContainer = document.getElementById('product-category-chart');
        
        if (chartContainer) {
            // Clear any existing content
            chartContainer.innerHTML = '';
            
            // Create product category visualization
            const categoryViz = document.createElement('div');
            categoryViz.className = 'product-viz';
            categoryViz.style.display = 'flex';
            categoryViz.style.flexDirection = 'column';
            categoryViz.style.gap = '2px';
            categoryViz.style.marginTop = '4px';
            
            // Product category data
            const categories = [
                { name: 'Maritime Safety', growth: 22.4, status: 'high' },
                { name: 'Navigation Systems', growth: 18.7, status: 'high' },
                { name: 'Vessel Monitoring', growth: 14.3, status: 'medium' },
                { name: 'Port Security', growth: 12.8, status: 'medium' },
                { name: 'Cargo Tracking', growth: 9.6, status: 'medium' },
                { name: 'Crew Management', growth: 8.2, status: 'low' },
                { name: 'Regulatory Compliance', growth: 7.5, status: 'low' }
            ];
            
            // Create category items
            categories.forEach(category => {
                const categoryItem = document.createElement('div');
                categoryItem.className = 'category-item';
                categoryItem.style.display = 'flex';
                categoryItem.style.justifyContent = 'space-between';
                categoryItem.style.alignItems = 'center';
                categoryItem.style.padding = '2px 0';
                categoryItem.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.04)';
                
                // Create category name
                const categoryName = document.createElement('span');
                categoryName.className = 'category-name';
                categoryName.textContent = category.name;
                categoryName.style.color = 'rgba(255, 255, 255, 0.62)';
                categoryName.style.fontSize = '9px';
                categoryName.style.fontWeight = '500';
                
                // Create growth indicator
                const growthIndicator = document.createElement('span');
                growthIndicator.className = `growth-indicator ${category.status}`;
                growthIndicator.textContent = `+${category.growth}%`;
                growthIndicator.style.fontSize = '8px';
                growthIndicator.style.fontWeight = '600';
                
                // Set color based on status
                if (category.status === 'high') {
                    growthIndicator.style.color = 'rgba(38, 198, 138, 0.85)';
                } else if (category.status === 'medium') {
                    growthIndicator.style.color = 'rgba(0, 122, 255, 0.85)';
                } else {
                    growthIndicator.style.color = 'rgba(138, 146, 166, 0.85)';
                }
                
                // Add elements to category item
                categoryItem.appendChild(categoryName);
                categoryItem.appendChild(growthIndicator);
                
                // Add category item to visualization
                categoryViz.appendChild(categoryItem);
            });
            
            // Add visualization to container
            chartContainer.appendChild(categoryViz);
        }
    } catch (error) {
        console.error('Error initializing product category chart:', error);
    }
}
