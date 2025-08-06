# Reboot Prompt: Maritime Intelligence Dashboard Responsive Layout Project

## Project Overview

You're working with me (Joe) on improving the Maritime Intelligence Dashboard built with Next.js 14, TypeScript, TailwindCSS, shadcn/ui components, and Framer Motion animations. The dashboard features an Onyx dark theme with glassmorphism effects.

We've been specifically focusing on fixing persistent overlapping and spacing issues in the dashboard's responsive layout to ensure that all widgets (especially in the right panel and module row) adapt smoothly to various browser sizes.

## Current Status

We just completed two major layout fixes:

1. Fixed the UI Components page's Kanban Cards to display horizontally in a scrollable row instead of a vertical grid layout
2. Improved the Right Panel widget spacing and responsiveness between the Anomalies and Opportunities widgets

## Recent Code Changes

### 1. UI Components Page - Horizontal Card Layout

Modified 

/ui-components/page.tsx to implement horizontal scrolling for Kanban Cards with:

- Flex row layout with 
    
    ```
    space-x-4
    ```
    
     and 
    
    ```
    overflow-x-auto
    ```
    
- Snap scrolling with 
    
    ```
    snap-x
    ```
    
     for better UX
- Individual card wrappers with 
    
    ```
    min-w-[280px]
    ```
    
     and 
    
    ```
    flex-shrink-0
    ```
    

### 2. Right Panel Widget Spacing

Enhanced 

DashboardSections.tsx RightPanel component with:

- Improved content weighting based on severity and content type
- Width-based responsive adjustments
- Minimum widget heights (40% and 30%)
- Reduced gap from 1rem to 0.75rem
- Better overflow handling

### 3. TypeScript Fixes

- Fixed animation variant typing with proper Framer Motion type assertions
- Resolved severity comparison issues
- Improved module priority handling

## Current Project Structure

The project uses a zone-based dashboard with CSS Grid:

- Header KPI Row
- Left Sidebar
- Main Content
- Right Panel (improved spacing between Anomalies and Opportunities)
- Module Row (horizontally scrolling cards)

Each component uses responsive hooks (

useContainerSize, 

useResponsiveContainer) for intelligent adaptation.

## Current Files of Interest

You're currently viewing:

- ResponsiveKPIWidget.tsx (cursor on line 72)
- ResponsiveModuleCard.tsx (open document)

## Remaining Tasks

- Verify and fine-tune adaptive behavior across all breakpoints
- Refine grid gap and overflow handling in CSS for all breakpoints
- Complete fully automated widget sizing system

## Technical Implementation Details

- Using ResizeObserver for container size detection
- Four content density levels (micro, minimal, compact, full)
- Smart widgets that adapt content based on available space
- CSS Grid for responsive dashboard zones
- Framer Motion for staggered animations
- Intelligent width distribution algorithms

We can continue working on further refining the responsive behavior or implementing any other improvements to the Maritime Intelligence Dashboard.