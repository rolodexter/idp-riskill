# Maritime Intelligence Dashboard Development - Reboot Prompt

## Project Overview

This project involves building a modern Maritime Intelligence Dashboard with advanced progressive disclosure techniques. The dashboard is built using Next.js 14 (with App Router), TypeScript, TailwindCSS, shadcn/ui components, and Framer Motion animations. It features an Onyx dark theme with glassmorphism effects and is optimized for Vercel deployment.

## Project Status

We have successfully completed the initial 3 phases:

1. **Project Setup**: Initialized the Next.js project with TypeScript, TailwindCSS, and shadcn/ui components
2. **Layout Architecture**: Created a responsive 5-section dashboard layout with glassmorphism effects
3. **Progressive Disclosure**: Implemented an advanced adaptive content system based on container size

## Current Directory Structure

maritime-intelligence-platform/  
├── src/  
│   ├── app/  
│   │   ├── layout.tsx  
│   │   ├── page.tsx  
│   │   └── globals.css (contains Onyx theme and glassmorphism classes)  
│   ├── components/  
│   │   ├── layout/  
│   │   │   ├── DashboardLayout.tsx (main CSS Grid container)  
│   │   │   └── DashboardSections.tsx (section components)  
│   │   └── widgets/  
│   │       ├── BaseWidget.tsx (base component with glassmorphism)  
│   │       ├── SmartKPIWidget.tsx (adaptive content widget)  
│   │       └── ProgressiveContent.tsx (content density controller)  
│   ├── hooks/  
│   │   └── useContainerSize.ts (container size detection with ResizeObserver)  
│   ├── lib/  
│   │   └── utils.ts (utility functions)  
│   └── data/  
│       └── idpData.ts (sample maritime intelligence data)  
├── tailwind.config.ts (configured with Onyx theme)  
├── components.json (shadcn configuration)  
├── vercel.json (deployment configuration)  
└── package.json (contains all dependencies)

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom Onyx dark theme
- **Components**: shadcn/ui (manually implemented)
- **Animations**: Framer Motion
- **UI Effects**: Glassmorphism panels and cards
- **Icons**: lucide-react
- **Development**: Vercel-optimized for deployment
- **Testing**: Basic viewport testing implemented

## Key Features Implemented

### Responsive Dashboard Layout

- 5-section layout using CSS Grid with named areas
- Responsive breakpoints for desktop, tablet, and mobile
- Section areas: header-kpis, left-panel, main-canvas, right-panel-top, right-panel-bottom, modules

### Glassmorphism UI

- Glass panel effects with variable opacity levels
- Frosted backdrop effects for cards and widgets
- Custom CSS classes for different glass effect strengths

### Progressive Disclosure System

- Container-based responsive design using ResizeObserver
- Four content density levels (micro, minimal, compact, full) based on container width
- Smooth animated transitions between content density levels
- Fallback content strategy for graceful degradation
- Smart widgets that adapt their content based on available space

### Maritime Intelligence Data

- KPI data structure with values, labels, trends, and context
- Anomalies and opportunities data representation
- Color-coded trend indicators

## Current Components

### Layout Components

- DashboardLayout.tsx: Main container with CSS Grid areas
- DashboardSections.tsx: Individual section components for the dashboard

### Widget Components

- BaseWidget.tsx: Foundation widget with glassmorphism effects
- SmartKPIWidget.tsx: KPI widget with progressive disclosure
- ProgressiveContent.tsx: Content density manager with animations

### Hooks

- useContainerSize.ts: Container size detection hook using ResizeObserver

### Data

- idpData.ts: Maritime intelligence data for KPIs, anomalies, and opportunities

## Next Potential Phase

- Implement additional widget types beyond KPIs
- Add interactive elements to widgets
- Enhance data visualization capabilities
- Implement theme switching
- Add real-time data integration
- Develop user preference persistence
- Create additional dashboard views

## Technical Notes

- shadcn/ui components were manually implemented due to CLI detection issues
- ResizeObserver is used for efficient container size monitoring
- Framer Motion handles content transition animations
- Content density thresholds: micro (<150px), minimal (150-250px), compact (250-400px), full (400px+)

## Recent Changes

The most recent implementation completed Phase 3, which added intelligent progressive disclosure to the dashboard widgets. This included:

1. Container size detection using ResizeObserver
2. Content density management with animated transitions
3. Smart KPI widgets that adapt their content based on container dimensions
4. Integration with the existing dashboard layout
5. Maritime intelligence data structure implementation

All components are now functional and the development server has been running successfully at [http://localhost:3000](http://localhost:3000/).

This prompt captures the complete state of the Maritime Intelligence Dashboard project as of July 31, 2025, allowing us to continue development precisely where we left off.