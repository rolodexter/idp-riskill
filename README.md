# IDP-Riskill Dashboard

Specialized business insights visualization dashboard featuring ultra-minimalist, elegant widgets that showcase IDP business performance metrics.

## Documentation

- [**Project Structure**](./PROJECT_STRUCTURE.md): Detailed mapping of the project structure, component organization, and technology stack
- [**Work Log**](./WORKLOG.md): Documentation of recent changes, current work, and planned tasks

## Component Documentation

### Widgets
- [**Projects Widget**](./src/components/projects/docs/README.md): Project Stratification widget with card-based UI
- [**Widget Tray**](./src/components/widget-tray/): System for managing KPI widgets with drag-and-drop functionality
- Additional widget documentation will be added as components are reorganized

## Development

This project uses Vite as a build tool. To start the development server:

```bash
npm run dev
```

Or using Vite directly:

```bash
npx vite
```

## Project Structure

The project is being incrementally reorganized into a more maintainable structure:

```
src/
├── components/        # UI components organized by feature
│   ├── projects/      # Project Stratification widget
│   │   ├── docs/      # Component-specific documentation
│   ├── widget-tray/   # Widget tray for managing KPI widgets
│   ├── business-units/
│   ├── customers/
│   └── ...
├── styles/           # Global and shared styles
├── utils/            # Utility functions
├── assets/           # Images, icons, and other assets
└── data/             # Data files and mock APIs
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for complete details.