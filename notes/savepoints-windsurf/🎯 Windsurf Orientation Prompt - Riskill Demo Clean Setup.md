# 🎯 **Windsurf Orientation Prompt - Riskill Demo Clean Setup**

## **PROJECT CONTEXT**

- **Project Name**: Riskill Demo Clean
- **Location**: `C:\riskill-demo-clean`
- **Purpose**: Demo interface for executive presentations
- **Approach**: Layer-by-layer micromanaged implementation
- **Focus**: GET ZONES WORKING FIRST, then add features

## **IMMEDIATE TASK - LAYER 1: BASIC 5-ZONE LAYOUT**

Your ONLY job right now is to create a basic HTML file with CSS Grid that shows 5 distinct zones. Nothing else.

### **Step 1: Create Basic HTML Structure**

Create `index.html` with this EXACT structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Riskill Demo Clean</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0f1419;
            color: white;
            overflow: hidden;
        }

        .main-container {
            display: grid;
            grid-template-areas: 
                "header header header"
                "left-zone main-canvas right-zone"
                "left-zone bottom-zone bottom-zone";
            grid-template-columns: 250px 1fr 300px;
            grid-template-rows: 80px 1fr 200px;
            height: 100vh;
            width: 100vw;
            gap: 2px;
        }

        .top-zone {
            grid-area: header;
            background: rgba(0, 120, 212, 0.2);
            border: 2px solid #0078d4;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
        }

        .left-zone {
            grid-area: left-zone;
            background: rgba(67, 160, 71, 0.2);
            border: 2px solid #43a047;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
        }

        .main-canvas {
            grid-area: main-canvas;
            background: rgba(255, 140, 0, 0.2);
            border: 2px solid #ff8c00;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
        }

        .right-zone {
            grid-area: right-zone;
            background: rgba(229, 57, 53, 0.2);
            border: 2px solid #e53935;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
        }

        .bottom-zone {
            grid-area: bottom-zone;
            background: rgba(156, 39, 176, 0.2);
            border: 2px solid #9c27b0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="top-zone">TOP ZONE</div>
        <div class="left-zone">LEFT ZONE</div>
        <div class="main-canvas">MAIN CANVAS</div>
        <div class="right-zone">RIGHT ZONE</div>
        <div class="bottom-zone">BOTTOM ZONE</div>
    </div>
</body>
</html>
```

### **Step 2: Test Immediately**

1. Create the file exactly as shown above
2. Open `index.html` in your browser
3. You should see 5 colored rectangles with borders
4. Take a screenshot and confirm with Joe

### **SUCCESS CRITERIA - LAYER 1**

✅ **You should see exactly this:**

- **Blue rectangle** (top, full width) - "TOP ZONE"
- **Green rectangle** (left, tall) - "LEFT ZONE"
- **Orange rectangle** (center, flexible) - "MAIN CANVAS"
- **Red rectangle** (right, tall) - "RIGHT ZONE"
- **Purple rectangle** (bottom, spans right) - "BOTTOM ZONE"

## **CRITICAL CONSTRAINTS**

### **DO NOT ADD YET:**

- ❌ Complex styling
- ❌ JavaScript functionality
- ❌ Animation libraries
- ❌ Mock data
- ❌ Interactive elements
- ❌ Advanced CSS effects

### **ONLY FOCUS ON:**

- ✅ Creating the HTML file
- ✅ Getting 5 zones visible
- ✅ Basic grid layout working
- ✅ Colored borders for visibility

## **NEXT STEPS (AFTER LAYER 1 APPROVAL)**

Once Joe confirms the 5 zones are visible and working:

- **Layer 2**: Remove colored borders, add professional styling
- **Layer 3**: Add basic content to each zone
- **Layer 4**: Begin demo sequence implementation

## **COMMUNICATION PROTOCOL**

- **Show progress immediately** after creating the file
- **Get explicit approval** before proceeding to Layer 2
- **Ask questions** if anything is unclear
- **Keep it simple** - resist the urge to add extra features

---

**REMEMBER**: This is a demo interface for presentations, not a production application. Focus on getting the basic structure working first, then we'll layer on the sophisticated features systematically.

**Your immediate task**: Create the HTML file above and confirm the 5 zones are visible in the browser. Nothing else until Joe approves!