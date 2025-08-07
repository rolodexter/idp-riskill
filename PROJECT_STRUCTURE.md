# IDP-Riskill Dashboard Project Structure

## Overview
This document provides a map of the IDP-Riskill dashboard project structure. It serves as a reference for both human developers and AI tools to quickly understand the organization of the codebase.

### Related Documentation
- [**README.md**](./README.md): Main project overview and entry point
- [**WORKLOG.md**](./WORKLOG.md): Documentation of recent changes, current status, and planned tasks

## Current Structure

### Root Directory
- `index.html` - Main application HTML (legacy, being migrated to src/index.html)
- `styles.css` - Core styles (being migrated to src/styles/)
- `styles-additions.css` - Additional style extensions (being migrated to src/styles/)
- `styles-refined.css` - Refined widget styles (being migrated to src/styles/)
- `styles-refined-layout.css` - Layout refinements (being migrated to src/styles/)
- `module-row-fix.css` - Fixes for module row layout (pending migration)
- `anomalies-widget.css` - Specialized styles for anomalies widget (pending migration)
- `enhanced-anomalies.css` - Enhanced styling for anomalies widget (pending migration)
- `scripts.js` - Core JavaScript functionality (pending migration)
- `data-visualizations.js` - Visualization implementations (pending migration)
- `refined-visualizations.js` - Enhanced visualization code (pending migration)
- `enhanced-anomalies.js` - Anomalies widget functionality (pending migration)
- `product-category-chart.js` - Product category chart implementation (pending migration)
- `product-category-visualization.js` - Product category visualization code (pending migration)
- `images/` - Image assets directory (being migrated to src/assets/)
- `notes/` - Project notes directory (remaining at root)
- `node_modules/` - Node.js dependencies
- `.git/` - Git repository data

### Project Documentation
- [**README.md**](./README.md) - Main project overview
- [**PROJECT_STRUCTURE.md**](./PROJECT_STRUCTURE.md) - This file, documenting project structure
- [**WORKLOG.md**](./WORKLOG.md) - Recent changes and task tracking

## Widgets
The dashboard contains 8 specialized widgets:
1. Mega-Project Performance Monitor
2. Business Unit Revenue Comparison
3. Customer Segment Analysis
4. International Supplier Network
5. Employee Specialization Tracker
6. Ultra-Premium International Projects
7. Pricing Strategy Intelligence
8. Product Category Intelligence

## Project Stratification (Tech/Data Nomenclature)
1. **Tera-Projects** (Z001)
   - 10+ trillion pesos (~$10B+ USD)
   - Largest government contracts
   - 671+ billion peso average deals
2. **Giga-Projects** (S001, S002, U001/U002)
   - 100+ billion to 1 trillion pesos
   - Major systems and international operations
3. **Mega-Projects** (P001, P003)
   - 1-100 billion pesos
   - Standard operational business
4. **Standard-Projects** (P002, S003)
   - Lower value projects
   - Higher volume operations

## New Structure (In Progress)

The project is being incrementally reorganized into a more maintainable structure:

```
src/
├── components/        # UI components organized by feature
│   ├── projects/      # Project stratification widget
│   │   ├── docs/      # Component documentation
│   │   ├── css/       # Component-specific styles
│   │   └── js/        # Component-specific scripts
│   ├── widget-tray/   # Widget tray system for managing KPI widgets
│   │   ├── css/       # Tray-specific styles
│   │   └── js/        # Tray-specific scripts
│   ├── business-units/
│   ├── customers/
│   └── ...
├── styles/            # Global and shared styles
├── utils/             # Utility functions
├── assets/            # Images, icons, and other assets
└── data/              # Data files and mock APIs
```

### New Components (in-progress)

### Projects Widget
- Redesigned as a card-based widget
- Displays project stratification metrics
- Supports manual and auto-rotation of cards
- Card navigation dots and 3D hover animations
- See [Projects Widget Documentation](./src/components/projects/docs/README.md)

### Widget Tray System
- Manages hidden KPI widgets with drag-and-drop functionality
- Matches aesthetic of other dashboard widgets
- Enforces exactly 5 widgets in the KPI row at all times
- Shows minimized widget previews in the tray
- Persists widget positions using localStorage
- Located in [Widget Tray Directory](./src/components/widget-tray/)

## Key Technologies
- Vite (build tool)
- HTML/CSS/JavaScript
- D3.js (data visualization)
- GSAP (animations)
- ApexCharts (charting)
- React libraries (limited usage currently)
