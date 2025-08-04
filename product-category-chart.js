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
                
                // Create category name
                const categoryName = document.createElement('span');
                categoryName.className = 'category-name';
                categoryName.textContent = category.name;
                
                // Create growth indicator
                const growthIndicator = document.createElement('span');
                growthIndicator.className = `growth-indicator ${category.status}`;
                growthIndicator.textContent = `+${category.growth}%`;
                
                // Add elements to category item
                categoryItem.appendChild(categoryName);
                categoryItem.appendChild(growthIndicator);
                
                // Add category item to visualization
                categoryViz.appendChild(categoryItem);
            });
            
            // Add visualization to container
            chartContainer.appendChild(categoryViz);
            
            // Add CSS for product category visualization
            const style = document.createElement('style');
            style.textContent = `
                .product-viz {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    margin-top: 4px;
                    max-height: 80px;
                    overflow-y: auto;
                    font-size: 9px;
                }
                
                .category-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2px 0;
                    border-bottom: var(--line-ultrathin);
                }
                
                .category-item:last-child {
                    border-bottom: none;
                }
                
                .category-name {
                    color: var(--refined-text-secondary);
                    font-weight: 500;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 70%;
                }
                
                .growth-indicator {
                    font-weight: 600;
                    font-size: 8px;
                    padding: 1px 4px;
                    border-radius: 2px;
                }
                
                .growth-indicator.high {
                    color: var(--status-success);
                }
                
                .growth-indicator.medium {
                    color: var(--status-info);
                }
                
                .growth-indicator.low {
                    color: var(--status-neutral);
                }
            `;
            
            document.head.appendChild(style);
        }
    } catch (error) {
        console.error('Error initializing product category chart:', error);
    }
}
