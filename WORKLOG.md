# IDP-Riskill Project Work Log

This document tracks recent changes, current work, and planned tasks for the IDP-Riskill dashboard project.

## Documentation Index

- [**README.md**](./README.md): Main project overview and entry point
- [**PROJECT_STRUCTURE.md**](./PROJECT_STRUCTURE.md): Complete project structure mapping

## Component Documentation

- [**Projects Widget**](./src/components/projects/docs/README.md): Project Stratification widget documentation

## Active Work Log

### 2025-08-06

- Created `PROJECT_STRUCTURE.md` to document the current and planned project structure
- Created `WORKLOG.md` (this file) to track project progress
- Created new folder structure for improved organization:
  - `src/components/` with subfolders for each widget
  - `src/assets/` for images and icons
  - `src/styles/` for CSS files
  - `src/utils/` for utility functions
  - `src/data/` for data files
  - Added `/docs` folders in each component directory for technical documentation
- Created Project Stratification widget prototype with card-based design:
  - Implemented card rotation functionality (both manual and automatic)
  - Created separate cards for Tera, Giga, Mega, and Standard projects
  - Added transition animations between cards
  - Included project metrics and sparkline placeholders
- Implemented widget tray system for managing KPI widgets:
  - Matches aesthetic of other dashboard widgets
  - Enables drag-and-drop functionality between KPI row and tray
  - Enforces exactly 5 widgets in the KPI row at all times
  - Shows minimized widget previews in the tray
  - Persists widget positions using localStorage
- Created new `src/index.html` with updated references to reorganized files

## Current Status

- Folder reorganization: **In Progress**
  - Initial folder structure [created](./PROJECT_STRUCTURE.md#new-structure-in-progress)
  - Documentation files in place
- Widget overhaul: **In Progress**
  - [Project Stratification widget](./src/components/projects/docs/README.md) prototype implemented
  - [Widget Tray](./src/components/widget-tray/) implemented for managing KPI widgets
  - Other widgets pending migration
- UI Enhancements: **In Progress**
  - Drag-and-drop functionality implemented for KPI widgets
  - Widget tray system in place for managing hidden widgets
  - Widget position persistence via localStorage
- Integration: **In Progress**
  - New [src/index.html](./src/index.html) created with updated references
  - Testing with Vite dev server

## TODOs

- [x] Create [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [x] Create [WORKLOG.md](./WORKLOG.md) (this file)
- [x] Create folder structure
- [x] Implement [Project Stratification widget](./src/components/projects/docs/README.md)
- [x] Implement [Widget Tray system](./src/components/widget-tray/) for KPI widgets
- [ ] Implement remaining KPI widgets (Revenue, Business Unit, Customer, Data Quality)
- [ ] Create technical documentation for each widget
- [ ] Update all documentation files when changes are made to the codebase
  - [x] [src/components/](./src/components/) with widget subfolders
  - [x] [src/styles/](./src/styles/) for CSS files
  - [x] [src/assets/](./src/assets/) for images and other assets
  - [x] [src/utils/](./src/utils/) for utility functions
  - [x] [src/data/](./src/data/) for data files
- [ ] Move files to appropriate folders
  - [x] Create [src/index.html](./src/index.html)
  - [ ] Move CSS files to [src/styles/](./src/styles/)
  - [ ] Move JS files to [src/utils/](./src/utils/) or component folders
  - [ ] Move image files to [src/assets/](./src/assets/)
- [ ] Update import paths
- [x] Design [Project Stratification widget](./src/components/projects/docs/README.md)
- [x] Implement [Project Stratification widget](./src/components/projects/projects-widget.js) cards
- [ ] Extend the card-based widget pattern to other widgets in the top row
- [ ] Update documentation as changes are implemented

## Implementation Notes

### Widget Architecture Approach

Each widget will be a self-contained component with:
- A container that holds multiple "card" elements
- Navigation controls for manual rotation
- Auto-rotation logic when idle

### Project Stratification Widget

Will include cards for:
- Tera-Projects (Z001): 10+ trillion pesos
- Giga-Projects (S001, S002, U001/U002): 100+ billion to 1 trillion pesos
- Mega-Projects (P001, P003): 1-100 billion pesos
- Standard-Projects (P002, S003): Lower value projects
