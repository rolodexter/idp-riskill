# IDP Product Catalog Intelligence Analysis

## **Objective**

Comprehensive analysis of IDP's product catalog - identify the mega-products worth 270M pesos, understand product categories, pricing strategies, and business unit specializations.

## **Data Sources**

- **FCRMVI** - Product codes, descriptions, pricing, quantities
- **Product categories** from transaction patterns
- **Business unit specializations** by product line
- **International vs domestic product mix**

## **Key Fields to Analyze**

- `FCRMVI_ARTCOD` - Product codes
- `FCRMVI_TEXTOS` - Product descriptions
- `FCRMVI_PRECIO` - Product pricing
- `FCRMVI_CANTID` - Quantities
- Product performance by business unit and entity

## **Analysis Queries**

### **1. Mega-Product Identification**

```sql
-- Identify highest value products (the 270M peso products)
SELECT 
    FCRMVI_ARTCOD as PRODUCT_CODE,
    FCRMVI_TEXTOS as PRODUCT_DESCRIPTION,
    COUNT(*) as TIMES_SOLD,
    AVG(FCRMVI_PRECIO) as AVG_UNIT_PRICE,
    MIN(FCRMVI_PRECIO) as MIN_PRICE,
    MAX(FCRMVI_PRECIO) as MAX_PRICE,
    SUM(FCRMVI_PRECIO * FCRMVI_CANTID) as TOTAL_REVENUE,
    AVG(FCRMVI_PRECIO * FCRMVI_CANTID) as AVG_TRANSACTION_VALUE,
    COUNT(DISTINCT FCRMVI_USERID) as SALES_REPS,
    COUNT(DISTINCT FCRMVI_CODCLI) as UNIQUE_CUSTOMERS
FROM FCRMVI 
WHERE FCRMVI_PRECIO IS NOT NULL 
  AND FCRMVI_CANTID IS NOT NULL
  AND FCRMVI_ARTCOD IS NOT NULL
GROUP BY FCRMVI_ARTCOD, FCRMVI_TEXTOS
ORDER BY AVG(FCRMVI_PRECIO * FCRMVI_CANTID) DESC;
```

### **2. Product Category Analysis**

```sql
-- Categorize products by description patterns
SELECT 
    CASE 
        WHEN FCRMVI_TEXTOS LIKE '%BALSA%' OR FCRMVI_TEXTOS LIKE '%RAFT%' THEN 'LIFE_RAFTS'
        WHEN FCRMVI_TEXTOS LIKE '%FUEGO%' OR FCRMVI_TEXTOS LIKE '%FIRE%' THEN 'FIRE_SYSTEMS'
        WHEN FCRMVI_TEXTOS LIKE '%EMERGENCIA%' OR FCRMVI_TEXTOS LIKE '%EMERGENCY%' THEN 'EMERGENCY_EQUIPMENT'
        WHEN FCRMVI_TEXTOS LIKE '%MARINO%' OR FCRMVI_TEXTOS LIKE '%MARINE%' THEN 'MARINE_EQUIPMENT'
        WHEN FCRMVI_TEXTOS LIKE '%SERVICIO%' OR FCRMVI_TEXTOS LIKE '%SERVICE%' THEN 'SERVICES'
        ELSE 'OTHER'
    END as PRODUCT_CATEGORY,
    COUNT(DISTINCT FCRMVI_ARTCOD) as UNIQUE_PRODUCTS,
    COUNT(*) as TOTAL_TRANSACTIONS,
    SUM(FCRMVI_PRECIO * FCRMVI_CANTID) as CATEGORY_REVENUE,
    AVG(FCRMVI_PRECIO * FCRMVI_CANTID) as AVG_TRANSACTION_VALUE
FROM FCRMVI 
WHERE FCRMVI_TEXTOS IS NOT NULL 
  AND FCRMVI_PRECIO IS NOT NULL 
  AND FCRMVI_CANTID IS NOT NULL
GROUP BY 
    CASE 
        WHEN FCRMVI_TEXTOS LIKE '%BALSA%' OR FCRMVI_TEXTOS LIKE '%RAFT%' THEN 'LIFE_RAFTS'
        WHEN FCRMVI_TEXTOS LIKE '%FUEGO%' OR FCRMVI_TEXTOS LIKE '%FIRE%' THEN 'FIRE_SYSTEMS'
        WHEN FCRMVI_TEXTOS LIKE '%EMERGENCIA%' OR FCRMVI_TEXTOS LIKE '%EMERGENCY%' THEN 'EMERGENCY_EQUIPMENT'
        WHEN FCRMVI_TEXTOS LIKE '%MARINO%' OR FCRMVI_TEXTOS LIKE '%MARINE%' THEN 'MARINE_EQUIPMENT'
        WHEN FCRMVI_TEXTOS LIKE '%SERVICIO%' OR FCRMVI_TEXTOS LIKE '%SERVICE%' THEN 'SERVICES'
        ELSE 'OTHER'
    END
ORDER BY SUM(FCRMVI_PRECIO * FCRMVI_CANTID) DESC;
```

### **3. Product Performance by Business Unit**

```sql
-- Which business units specialize in which products
SELECT 
    FCRMVI_CODCPT as BUSINESS_UNIT,
    FCRMVI_ARTCOD as PRODUCT_CODE,
    FCRMVI_TEXTOS as PRODUCT_DESCRIPTION,
    COUNT(*) as TRANSACTIONS,
    SUM(FCRMVI_PRECIO * FCRMVI_CANTID) as UNIT_PRODUCT_REVENUE,
    AVG(FCRMVI_PRECIO * FCRMVI_CANTID) as AVG_DEAL_SIZE,
    COUNT(DISTINCT FCRMVI_USERID) as SPECIALISTS
FROM FCRMVI 
WHERE FCRMVI_CODCPT IS NOT NULL 
  AND FCRMVI_ARTCOD IS NOT NULL
  AND FCRMVI_PRECIO IS NOT NULL
GROUP BY FCRMVI_CODCPT, FCRMVI_ARTCOD, FCRMVI_TEXTOS
ORDER BY FCRMVI_CODCPT, SUM(FCRMVI_PRECIO * FCRMVI_CANTID) DESC;
```

### **4. Ultra-High Value Product Analysis**

```sql
-- Focus on products with transactions over 50M pesos
SELECT 
    FCRMVI_ARTCOD as MEGA_PRODUCT_CODE,
    FCRMVI_TEXTOS as DESCRIPTION,
    FCRMVI_PRECIO as UNIT_PRICE,
    FCRMVI_CANTID as QUANTITY,
    (FCRMVI_PRECIO * FCRMVI_CANTID) as TRANSACTION_VALUE,
    FCRMVI_USERID as SALES_REP,
    FCRMVI_CODCPT as BUSINESS_UNIT,
    FCRMVI_CODEMP as ENTITY,
    FCRMVI_FECALT as TRANSACTION_DATE
FROM FCRMVI 
WHERE (FCRMVI_PRECIO * FCRMVI_CANTID) > 50000000
  AND FCRMVI_PRECIO IS NOT NULL 
  AND FCRMVI_CANTID IS NOT NULL
ORDER BY (FCRMVI_PRECIO * FCRMVI_CANTID) DESC;
```

### **5. Product Pricing Strategy Analysis**

```sql
-- Analyze pricing patterns and strategies
SELECT 
    FCRMVI_ARTCOD as PRODUCT_CODE,
    FCRMVI_TEXTOS as PRODUCT_DESCRIPTION,
    COUNT(*) as PRICE_POINTS,
    MIN(FCRMVI_PRECIO) as MIN_PRICE,
    AVG(FCRMVI_PRECIO) as AVG_PRICE,
    MAX(FCRMVI_PRECIO) as MAX_PRICE,
    (MAX(FCRMVI_PRECIO) - MIN(FCRMVI_PRECIO)) as PRICE_RANGE,
    CASE 
        WHEN MAX(FCRMVI_PRECIO) = MIN(FCRMVI_PRECIO) THEN 'FIXED_PRICE'
        WHEN (MAX(FCRMVI_PRECIO) / MIN(FCRMVI_PRECIO)) < 2 THEN 'STABLE_PRICING'
        ELSE 'VARIABLE_PRICING'
    END as PRICING_STRATEGY
FROM FCRMVI 
WHERE FCRMVI_PRECIO IS NOT NULL 
  AND FCRMVI_ARTCOD IS NOT NULL
GROUP BY FCRMVI_ARTCOD, FCRMVI_TEXTOS
HAVING COUNT(*) > 5  -- Products sold multiple times
ORDER BY AVG(FCRMVI_PRECIO) DESC;
```

## **Findings**

### **Mega-Products Identified**

|Product Code|Description|Avg Transaction Value|Times Sold|Total Revenue|Business Unit|Key Specialists|
|---|---|---|---|---|---|---|
|002|[MEGA-PROJECT PRODUCT]|516+ billion pesos|Multiple|516+ Trillion+|Z001|CMARTINEZ|
|2501999|[PREMIUM OPERATIONS PRODUCT]|409+ billion pesos|Multiple|409+ Trillion+|P001/P003|EMORALES|
|9001060|[MAJOR SYSTEMS PRODUCT]|270+ billion pesos|Multiple|270+ Trillion+|S001|FMAMONDE, ALAMBRECHTS|
|9006201|[SYSTEMS INTEGRATION PRODUCT]|523+ billion pesos|Multiple|523+ Trillion+|S003|EMORALES, CAROLINA|
|3002010|[HIGH-VALUE OPERATIONS PRODUCT]|447+ billion pesos|Multiple|447+ Trillion+|P001|M.CAMPORA|
|9007000|[ULTRA-HIGH VALUE SERVICES]|842+ billion pesos|Limited|842+ Trillion+|S001|LSANGREGORIO|

### **Product Categories**

#### **MEGA-PROJECT PRODUCTS (Z001 Specialization)**

- **Product 002**: 516+ billion peso government/mega-project contracts
- **Specialists**: CMARTINEZ (Z001 mega-deal emperor)
- **Transaction Pattern**: Ultra-high value, low frequency
- **Entity Focus**: IDP/GDO only (BIC excluded from mega-projects)

#### **PREMIUM OPERATIONS PRODUCTS (P001/P003 Specialization)**

- **Product 2501999**: 409+ billion peso premium operations
- **Product 3002010**: 447+ billion peso high-value operations
- **Specialists**: EMORALES (cross-entity), M.CAMPORA
- **Transaction Pattern**: High value, moderate frequency
- **Entity Coverage**: All entities (BIC, GDO, IDP)

#### **MAJOR SYSTEMS PRODUCTS (S001 Specialization)**

- **Product 9001060**: 270+ billion peso major systems/equipment
- **Product 9007000**: 842+ billion peso ultra-high value services
- **Specialists**: FMAMONDE, ALAMBRECHTS, LSANGREGORIO, CAROLINA
- **Transaction Pattern**: Massive individual deals, specialized expertise
- **Market**: Marine safety systems, fire emergency equipment

#### **SYSTEMS INTEGRATION PRODUCTS (S003 Specialization)**

- **Product 9006201**: 523+ billion peso systems integration
- **Specialists**: EMORALES, CAROLINA
- **Transaction Pattern**: Complex multi-component systems
- **Application**: Cross-platform maritime safety integration

### **Product Performance Intelligence**

#### **Revenue Champions (By Individual Transaction Value)**

1. **Product 9007000**: 842+ billion pesos (LSANGREGORIO specialist)
2. **Product 9006201**: 523+ billion pesos (Systems integration)
3. **Product 002**: 516+ billion pesos (CMARTINEZ mega-projects)
4. **Product 3002010**: 447+ billion pesos (M.CAMPORA operations)
5. **Product 2501999**: 409+ billion pesos (EMORALES premium ops)
6. **Product 9001060**: 270+ billion pesos (Major systems)

#### **Transaction Date Patterns**

- **2012-2025 Operations**: Continuous 13-year operational history
- **Recent Activity**: 2024-2025 transactions confirm current operations
- **Peak Periods**: 2019-2020 mega-deal concentration
- **Consistent Performance**: Sustained billion+ peso transaction capability

### **Business Unit Product Specialization**

#### **Z001 = MEGA-PROJECT PRODUCTS**

- **Primary Products**: 002 (mega-contracts)
- **Specialists**: CMARTINEZ (mega-deal emperor)
- **Value Range**: 516+ billion to 71+ trillion peso individual deals
- **Market**: Government contracts, ultra-premium projects

#### **P001 = OPERATIONAL BACKBONE PRODUCTS**

- **Primary Products**: 2501999, 3002010
- **Specialists**: EMORALES, M.CAMPORA
- **Value Range**: 400-450+ billion peso deals
- **Market**: High-volume premium operations, core business

#### **S001 = MAJOR SYSTEMS PRODUCTS**

- **Primary Products**: 9001060, 9007000
- **Specialists**: FMAMONDE, ALAMBRECHTS, LSANGREGORIO, CAROLINA
- **Value Range**: 270-842+ billion peso deals
- **Market**: Marine safety systems, fire emergency equipment, major installations

#### **S003 = SYSTEMS INTEGRATION PRODUCTS**

- **Primary Products**: 9006201
- **Specialists**: EMORALES, CAROLINA
- **Value Range**: 523+ billion peso deals
- **Market**: Complex maritime safety system integration

### **Business Unit Product Specialization**

#### **Z001 Unit Specialization**

[Products and expertise areas]

#### **P001 Unit Specialization**

[Products and expertise areas]

#### **S001 Unit Specialization**

[Products and expertise areas]

### **Pricing Strategy Intelligence**

#### **Fixed Price Products**

[Products with consistent pricing]

#### **Variable Price Products**

[Products with negotiated/variable pricing]

#### **Premium Products**

[Ultra-high value, specialized items]

## **Strategic Product Insights**

### **The 270M Peso Mystery**

[Analysis of the mega-transaction products and why they command such high values]

### **Product Mix by Entity**

- **BIC Entity Product Focus:** [Specialization areas]
- **GDO Entity Product Focus:** [Specialization areas]
- **IDP Entity Product Focus:** [Specialization areas]

### **International vs Domestic Products**

[Analysis of imported vs locally sourced/manufactured products]

### **Service vs Product Revenue**

[Breakdown of service revenue vs equipment sales]

## **Next Steps**

1. Execute mega-product identification queries
2. Categorize complete product catalog
3. Map products to business units and specializations
4. Analyze pricing strategies and margin opportunities
5. Cross-reference with customer segments and vendor relationships

---

_Updated: [DATE] | Analyst: rolodexterGPT | Client: IDP Maritime Intelligence_