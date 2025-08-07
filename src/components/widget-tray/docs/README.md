# Widget Tray System

A specialized component for managing KPI widgets in the IDP-Riskill dashboard, enabling intuitive widget management with a fixed-position tray that matches the aesthetic of other dashboard widgets.

## Features

- **Fixed-position tray** that visually matches the aesthetic and dimensions of other KPI widgets
- **Drag-and-drop functionality** between KPI row and tray using SortableJS
- **KPI Row constraint** enforcement (always displays exactly 5 widgets)
- **Mini widget previews** in the tray for hidden widgets
- **Position persistence** via localStorage
- **Smooth animations** for a polished user experience

## Technical Implementation

The Widget Tray system consists of:

- **widget-tray.css**: Styling for the widget tray and mini widgets
- **widget-tray.js**: JavaScript implementation using SortableJS for drag-and-drop functionality

### Key Implementation Details

1. **Initialization**
   - Automatically initializes after DOM content is loaded
   - Creates or finds the widget tray element in the DOM
   - Sets up drag-and-drop functionality

2. **Widget Constraints**
   - Enforces exactly 5 widgets in the KPI row at all times
   - Automatically moves excess widgets to the tray
   - Pulls widgets from the tray if the row has fewer than 5 widgets

3. **Mini Widget Representation**
   - Creates compact representations of widgets in the tray
   - Preserves widget identity and key content for recognition
   - Supports restoration of full widgets when dragged back to the row

4. **Position Persistence**
   - Saves widget positions to localStorage
   - Remembers which widgets are in the row vs. the tray
   - Restores positions on page reload

## Usage

The Widget Tray system automatically initializes when the page loads. No manual initialization is required.

### Drag-and-Drop Operations

- Drag a widget from the KPI row to the tray to hide it
- Drag a widget from the tray to the KPI row to display it
- Reorder widgets within the KPI row by dragging them to different positions

## Dependencies

- **SortableJS**: Required for drag-and-drop functionality

## Integration with Other Components

The Widget Tray system integrates with all KPI widgets in the dashboard:

1. **Projects Widget**: First widget in the KPI row (default position)
2. **Revenue Widget**: Second widget in the KPI row (default position)
3. **Business Unit Widget**: Third widget in the KPI row (default position)
4. **Customer Widget**: Fourth widget in the KPI row (default position)
5. **Data Quality Widget**: Fifth widget in the KPI row (default position)

Additional widgets can be added to the system and will automatically be managed by the tray when they exceed the 5-widget limit in the KPI row.

## Related Documentation

- [Project Structure](../../../../PROJECT_STRUCTURE.md): Overall project organization
- [Work Log](../../../../WORKLOG.md): Recent changes and implementation details
- [Main README](../../../../README.md): Project overview
