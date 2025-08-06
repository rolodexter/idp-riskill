# Project Stratification Widget

## Overview
The Project Stratification widget displays different project types used by IDP, including Tera, Giga, Mega, and Standard projects. It features a card-based design with both manual and automatic rotation between the different project types.

## Technical Implementation

### Structure
- `projects-widget.js` - Core functionality for the widget
- `projects-widget.css` - Styling for the widget
- `/docs` - Technical documentation

### Card Rotation
The widget uses a card-based UI with smooth transitions between different project type cards. Each card focuses on a single project type (Tera, Giga, etc.) and includes:

- Project type name
- Technical code (Z001, S001, etc.)
- Project value range
- Brief description
- Growth metrics
- Trend visualization (sparkline)
- AI-driven forecast

### Features

1. **Automatic Rotation**
   - Cards rotate automatically after 8 seconds of idle time
   - Rotation pauses when user hovers over the widget

2. **Manual Navigation**
   - Users can click indicator dots to navigate directly to a specific card
   - Navigation triggers smooth transition animations

3. **Visual Indicators**
   - Each project type has a unique color indicator
   - Tera: Red (#FF5252)
   - Giga: Blue (#2B7FFF)
   - Mega: Green (#4CAF50)
   - Standard: Amber (#FFC107)

## Project Types

### Tera-Projects (Z001)
- 10+ trillion pesos (~$10B+ USD)
- Largest government contracts
- 671+ billion peso average deals

### Giga-Projects (S001, S002, U001/U002)
- 100+ billion to 1 trillion pesos
- Major systems and international operations

### Mega-Projects (P001, P003)
- 1-100 billion pesos
- Standard operational business

### Standard-Projects (P002, S003)
- Lower value projects
- Higher volume operations

## Usage

To initialize the widget:

```javascript
// Initialize after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const projectWidget = new ProjectWidget('project-widget-container');
});
```

HTML container required:
```html
<div id="project-widget-container"></div>
```
