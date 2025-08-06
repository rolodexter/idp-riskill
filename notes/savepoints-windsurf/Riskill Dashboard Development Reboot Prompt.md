# Riskill Dashboard Development Reboot Prompt

## Project Overview

You are working on the Riskill dashboard, a professional data visualization platform that provides AI-powered insights. The dashboard features a clean, modern UI with glassmorphism effects and a three-zone layout (left sidebar, main content, right zone). The project uses plain HTML, CSS, and JavaScript with Phosphor Icons and React/Recharts for visualizations.

## Current State

- The dashboard layout was recently fixed after experiencing alignment issues with the zones
- All core features are implemented: KPI widgets, three-zone layout, SQL modal, reset functionality
- The changes are ready to be pushed to GitHub and deployed to Vercel
- The local dev server is running on [http://localhost:5173](http://localhost:5173/)

## Key Files

1. **index.html**: Contains the main dashboard structure with KPI widgets, left sidebar (user profile, AI assistant, Riskill Agents, Data Sources), main content area (maritime intelligence), right zone (Anomalies, Opportunities), module row, SQL modal, and reset button.
2. **styles.css**: Contains base styles, color variables, glass effect variables, spacing, typography, and layout settings.
3. **styles-additions.css**: Contains newer styles for AI Assistant widget, SQL modal, table lists, buttons, and reset demo button with glassmorphism and animations.

## Recent Changes

- Fixed dashboard layout shift issues by:
    - Adding proper z-index management
    - Improving dashboard layout structure with explicit flex properties
    - Ensuring each zone maintains proper dimensions
    - Fixing pointer events for interactive elements
    - Increasing z-index of modal overlay

## User Preferences

- Professional, clean, and minimalistic UI
- Glassmorphism styling with subtle animations
- Clear distinction between human user (Matthias Weber) and AI assistant (Eduardo)
- Avoid cluttering the UI with too many elements
- SQL modal simulates SQL Server Management Studio with only three relevant tables

## Next Steps

1. Complete the Git commit for the layout fixes
2. Push changes to GitHub
3. Deploy to Vercel
4. Verify the deployed site works correctly

## Technical Details

- The dashboard uses flexbox for layout with specific dimensions:
    - Left sidebar: flex:1, min-width 200px, max-width 300px
    - Main content: flex:3, min-width 400px
    - Right zone: flex:1, min-width 200px, max-width 300px
- The SQL modal uses fixed positioning with z-index 9000
- The reset demo button is fixed at bottom right with glass effect

## Git Status

- Repository is on branch "main"
- Changes have been staged but not yet committed
- Commit message prepared: "Fix dashboard layout shift issues"

This reboot prompt should allow us to continue exactly where we left off, with all the context needed to complete the deployment to GitHub and Vercel.