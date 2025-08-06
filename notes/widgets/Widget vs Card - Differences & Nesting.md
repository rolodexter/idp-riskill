**Widget vs Card: Differences & Nesting**

## What is a Widget?

- **Widget** is a broad term used in user interface (UI) design to describe any discrete element that provides functionality or displays content within an application. Widgets can range from simple items like buttons and sliders to complex interactive panels, charts, or even entire dashboard components[1](https://unm.custhelp.com/app/answers/detail/a_id/7618/~/what-is-the-difference-between-widgets,-link-cards,-loboapps,-and-dashboard)[2](https://docs.flutter.dev/ui/layout).
    
- Widgets **often encapsulate logic, interactivity, and even other UI elements**, making them mini-applications themselves. Their purpose is to deliver information, add interactivity, or enable input in a polished, reusable package.
    

## What is a Card?

- A **Card** is a specific type of UI component or container, most often recognized from Material Design principles. Cards are **rectangular panels with slight elevation (shadow) and rounded corners** that group related information—such as an image, headings, text, or actions—into a unified block[3](https://www.educative.io/answers/what-is-flutter-card-widget)[4](https://docs.flutterflow.io/resources/ui/widgets/built-in-widgets/card/)[5](https://api.flutter.dev/flutter/material/Card-class.html).
    
- Cards are designed for **visual grouping** and to present “bite-sized” pieces of related content (like a profile preview, product, or notification). They are visually distinctive and can be made interactive (clickable, expandable, draggable, etc.)[6](https://doc.arcgis.com/en/experience-builder/10.9/configure-widgets/card-widget.htm)[7](https://doc.arcgis.com/en/experience-builder/latest/configure-widgets/card-widget.htm).
    

## Key Differences

|Widget|Card|
|---|---|
|Generic term for any UI element|Specific panel/container for related content|
|May include interactivity & complex logic|Primarily a styled grouping container|
|Can contain any arbitrary content|Typically contains concise, related content|
|Examples: charts, buttons, maps, forms|Profile preview, product tile, info panel|
|May be invisible if it provides only logic|Always visual (by design)|

## Can a Widget Contain a Card?

**Yes, a widget can contain a card. In fact, in modern UI frameworks, a card is usually itself implemented as a widget (or a subclass of a widget)**[2](https://docs.flutter.dev/ui/layout)[4](https://docs.flutterflow.io/resources/ui/widgets/built-in-widgets/card/)[7](https://doc.arcgis.com/en/experience-builder/latest/configure-widgets/card-widget.htm). For example, you could have a dashboard widget that presents summary cards, or a list widget where each row is a card. Furthermore, cards themselves can contain other widgets—text, buttons, images, charts—giving you compositional power.

## Example Scenarios:

- A **Dashboard Widget** displays several **Cards**, each summarizing key metrics or notifications.
    
- A **List Widget** where each item is a **Card** representing a document, user, or product.
    
- **Cards** often contain other widgets, like images, buttons, charts, or textual data, forming modular, cohesive blocks.
    

## Summary

- A **widget** is a generic, functional, or visual UI component—anything from a button to a chart to a draggable dashboard pane.
    
- A **card** is a stylized, contained widget for grouping related content.
    
- **Widgets can contain cards, and cards can contain widgets**. This modularity is key to flexible, modern UI design[6](https://doc.arcgis.com/en/experience-builder/10.9/configure-widgets/card-widget.htm)[4](https://docs.flutterflow.io/resources/ui/widgets/built-in-widgets/card/)[7](https://doc.arcgis.com/en/experience-builder/latest/configure-widgets/card-widget.htm)[2](https://docs.flutter.dev/ui/layout).
    

1. [https://unm.custhelp.com/app/answers/detail/a_id/7618/~/what-is-the-difference-between-widgets,-link-cards,-loboapps,-and-dashboard](https://unm.custhelp.com/app/answers/detail/a_id/7618/~/what-is-the-difference-between-widgets,-link-cards,-loboapps,-and-dashboard)
2. [https://docs.flutter.dev/ui/layout](https://docs.flutter.dev/ui/layout)
3. [https://www.educative.io/answers/what-is-flutter-card-widget](https://www.educative.io/answers/what-is-flutter-card-widget)
4. [https://docs.flutterflow.io/resources/ui/widgets/built-in-widgets/card/](https://docs.flutterflow.io/resources/ui/widgets/built-in-widgets/card/)
5. [https://api.flutter.dev/flutter/material/Card-class.html](https://api.flutter.dev/flutter/material/Card-class.html)
6. [https://doc.arcgis.com/en/experience-builder/10.9/configure-widgets/card-widget.htm](https://doc.arcgis.com/en/experience-builder/10.9/configure-widgets/card-widget.htm)
7. [https://doc.arcgis.com/en/experience-builder/latest/configure-widgets/card-widget.htm](https://doc.arcgis.com/en/experience-builder/latest/configure-widgets/card-widget.htm)
8. [https://www.miva.com/forums/forum/general/off-topic/714737-difference-between-cards-panels-tiles-and-widgets](https://www.miva.com/forums/forum/general/off-topic/714737-difference-between-cards-panels-tiles-and-widgets)
9. [https://stackoverflow.com/questions/60412220/flutter-card-vs-container-widget](https://stackoverflow.com/questions/60412220/flutter-card-vs-container-widget)
10. [https://help.zoho.com/portal/en/kb/iot/dashboards/widgets/different-types-of-widgets/articles/understanding-card-widgets](https://help.zoho.com/portal/en/kb/iot/dashboards/widgets/different-types-of-widgets/articles/understanding-card-widgets)
11. [https://www.youtube.com/watch?v=5lpMnWvrwGs](https://www.youtube.com/watch?v=5lpMnWvrwGs)
12. [https://forums.unrealengine.com/t/card-widget-system/1228064](https://forums.unrealengine.com/t/card-widget-system/1228064)
13. [https://community.home-assistant.io/t/wth-can-you-not-put-cards-on-your-home-screen-as-widgets/808917](https://community.home-assistant.io/t/wth-can-you-not-put-cards-on-your-home-screen-as-widgets/808917)
14. [https://www.reddit.com/r/unrealengine/comments/mcfk2t/cant_decide_between_using_widgets_to_represent_my/](https://www.reddit.com/r/unrealengine/comments/mcfk2t/cant_decide_between_using_widgets_to_represent_my/)
15. [https://helpx.adobe.com/captivate/help/add-card-widget-captivate-project.html](https://helpx.adobe.com/captivate/help/add-card-widget-captivate-project.html)
16. [https://stackoverflow.com/questions/57961045/place-widgets-correctly-inside-a-card](https://stackoverflow.com/questions/57961045/place-widgets-correctly-inside-a-card)