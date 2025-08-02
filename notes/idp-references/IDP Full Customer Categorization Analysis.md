# IDP Full Customer Categorization Analysis

## **Objective**

Comprehensive categorization of all 881 customers in ClientesIDP - government vs private, by business line, geographic distribution, and relationship patterns.

## **Data Sources**

- **ClientesIDP** - Customer master data (881 records)
- **FCRMVI** - Customer transaction patterns
- Cross-reference customer codes to understand business relationships

## **Key Fields to Analyze**

- `Razon Social` - Customer legal names
- `Localidad` - Customer locations/cities
- `Provincia` - Customer provinces/states
- Transaction patterns by customer type
- Revenue per customer segment

## **Analysis Queries**

### **1. Customer Master List with Classification**

```sql
-- Complete customer inventory with basic classification
SELECT 
    c.Codigo as CUSTOMER_CODE,
    c.[Razon Social] as CUSTOMER_NAME,
    c.Localidad as CITY,
    c.Provincia as PROVINCE,
    c.[Limite Credito] as CREDIT_LIMIT,
    CASE 
        WHEN c.[Razon Social] LIKE '%ADM%' OR c.[Razon Social] LIKE '%ADMINISTRACION%' THEN 'GOVERNMENT'
        WHEN c.[Razon Social] LIKE '%PORTUARIA%' OR c.[Razon Social] LIKE '%PUERTO%' THEN 'PORT_AUTHORITY'
        WHEN c.[Razon Social] LIKE '%PREFECTURA%' OR c.[Razon Social] LIKE '%NAVAL%' THEN 'MILITARY_NAVAL'
        ELSE 'PRIVATE'
    END as CUSTOMER_TYPE
FROM ClientesIDP c
ORDER BY c.[Razon Social];
```

### **2. Customer Transaction Analysis**

```sql
-- Customer transaction patterns and values
SELECT 
    c.Codigo as CUSTOMER_CODE,
    c.[Razon Social] as CUSTOMER_NAME,
    COUNT(f.FCRMVI_NROFOR) as TRANSACTION_COUNT,
    SUM(f.FCRMVI_PRECIO * f.FCRMVI_CANTID) as TOTAL_BUSINESS_VALUE,
    AVG(f.FCRMVI_PRECIO * f.FCRMVI_CANTID) as AVG_TRANSACTION_VALUE,
    COUNT(DISTINCT f.FCRMVI_USERID) as SALES_REPS_ASSIGNED,
    MIN(f.FCRMVI_FECALT) as FIRST_TRANSACTION,
    MAX(f.FCRMVI_FECALT) as LAST_TRANSACTION,
    CASE 
        WHEN c.[Razon Social] LIKE '%ADM%' OR c.[Razon Social] LIKE '%ADMINISTRACION%' THEN 'GOVERNMENT'
        WHEN c.[Razon Social] LIKE '%PORTUARIA%' OR c.[Razon Social] LIKE '%PUERTO%' THEN 'PORT_AUTHORITY'
        WHEN c.[Razon Social] LIKE '%PREFECTURA%' OR c.[Razon Social] LIKE '%NAVAL%' THEN 'MILITARY_NAVAL'
        ELSE 'PRIVATE'
    END as CUSTOMER_TYPE
FROM ClientesIDP c
LEFT JOIN FCRMVI f ON c.Codigo = f.FCRMVI_CODCLI
WHERE f.FCRMVI_PRECIO IS NOT NULL AND f.FCRMVI_CANTID IS NOT NULL
GROUP BY c.Codigo, c.[Razon Social]
ORDER BY SUM(f.FCRMVI_PRECIO * f.FCRMVI_CANTID) DESC;
```

### **3. Geographic Customer Distribution**

```sql
-- Customer distribution by location and type
SELECT 
    c.Provincia as PROVINCE,
    c.Localidad as CITY,
    COUNT(*) as CUSTOMER_COUNT,
    SUM(CASE WHEN c.[Razon Social] LIKE '%ADM%' OR c.[Razon Social] LIKE '%ADMINISTRACION%' THEN 1 ELSE 0 END) as GOVERNMENT_CUSTOMERS,
    SUM(CASE WHEN c.[Razon Social] LIKE '%PORTUARIA%' OR c.[Razon Social] LIKE '%PUERTO%' THEN 1 ELSE 0 END) as PORT_CUSTOMERS,
    AVG(c.[Limite Credito]) as AVG_CREDIT_LIMIT
FROM ClientesIDP c
WHERE c.Provincia IS NOT NULL AND c.Localidad IS NOT NULL
GROUP BY c.Provincia, c.Localidad
ORDER BY COUNT(*) DESC;
```

### **4. Top Revenue Customers by Segment**

```sql
-- Highest value customers by type
WITH customer_revenue AS (
    SELECT 
        c.Codigo,
        c.[Razon Social],
        c.Localidad,
        SUM(f.FCRMVI_PRECIO * f.FCRMVI_CANTID) as TOTAL_REVENUE,
        COUNT(f.FCRMVI_NROFOR) as TRANSACTION_COUNT,
        CASE 
            WHEN c.[Razon Social] LIKE '%ADM%' OR c.[Razon Social] LIKE '%ADMINISTRACION%' THEN 'GOVERNMENT'
            WHEN c.[Razon Social] LIKE '%PORTUARIA%' OR c.[Razon Social] LIKE '%PUERTO%' THEN 'PORT_AUTHORITY'
            WHEN c.[Razon Social] LIKE '%PREFECTURA%' OR c.[Razon Social] LIKE '%NAVAL%' THEN 'MILITARY_NAVAL'
            ELSE 'PRIVATE'
        END as CUSTOMER_TYPE
    FROM ClientesIDP c
    LEFT JOIN FCRMVI f ON c.Codigo = f.FCRMVI_CODCLI
    WHERE f.FCRMVI_PRECIO IS NOT NULL
    GROUP BY c.Codigo, c.[Razon Social], c.Localidad
)
SELECT * FROM customer_revenue
ORDER BY CUSTOMER_TYPE, TOTAL_REVENUE DESC;
```

## **Current Status**

**BUSINESS UNIT & PRODUCT INTELLIGENCE COMPLETE** ✅ **CUSTOMER ANALYSIS PENDING** ⏳

Based on our mega-transaction analysis, we now know:

- **Z001 mega-projects** (516+ billion peso deals) likely serve **government/military customers**
- **P001 operations** (400+ billion peso deals) likely serve **commercial maritime customers**
- **S001 major systems** (270-842+ billion peso deals) likely serve **port authorities/major facilities**

### **Known Customer Intelligence Context**

- **881 total customers** in ClientesIDP table
- **Government indicators**: Customer names with "ADM", "ADMINISTRACION", "PORTUARIA", "PREFECTURA"
- **Geographic spread**: Argentina (main), Uruguay, US entities
- **Credit limits**: Standardized 40,000 peso patterns suggest structured relationships

### **Customer-Product Correlation Hypothesis**

- **CMARTINEZ Z001 mega-deals** → Government/military contracts
- **EMORALES cross-entity deals** → Major commercial maritime clients
- **S001 specialists** → Port authorities and major facilities

## **Next Analysis Required**

### **Priority Customer Queries Needed:**

1. **Government vs Private customer breakdown** with transaction values
2. **Top revenue customers by business unit** (Z001, P001, S001 customer bases)
3. **Geographic customer distribution** with business unit correlation
4. **Customer-employee relationship mapping** (which customers work with CMARTINEZ, EMORALES, etc.)

## **Findings**

### **Customer Segments Identified**

|Segment|Count|Total Revenue|Avg Transaction|Key Characteristics|
|---|---|---|---|---|
|Government|[PENDING]|[PENDING]|[PENDING]|Administrative entities - likely Z001 mega-project customers|
|Port Authorities|[PENDING]|[PENDING]|[PENDING]|Maritime infrastructure - likely S001 major systems customers|
|Military/Naval|[PENDING]|[PENDING]|[PENDING]|Defense/security - likely Z001/S001 customers|
|Private Maritime|[PENDING]|[PENDING]|[PENDING]|Commercial shipping - likely P001 operational customers|
|Other Private|[PENDING]|[PENDING]|[PENDING]|Various industries - mixed business unit relationships|

### **Geographic Distribution**

[TO BE POPULATED - Customer concentration by province/city]

### **Top Revenue Customers**

[TO BE POPULATED - Highest value relationships by segment]

### **Customer Relationship Patterns**

[TO BE ANALYZED - Credit limits, transaction frequency, sales rep assignments]

## **Business Line Analysis**

### **Life Rafts & Marine Safety**

[Customer patterns for marine safety equipment]

### **Fire Emergency Systems (Marine)**

[Maritime fire safety customers]

### **Fire Emergency Systems (Land)**

[Building/industrial fire safety customers]

### **International/Supply Chain**

[Uruguay LSA, US entity customers]

## **Next Steps**

1. Execute customer classification queries
2. Validate government vs private categorization
3. Map customers to business units and product lines
4. Analyze relationship strength and growth patterns

---

_Updated: [DATE] | Analyst: rolodexterGPT | Client: IDP Maritime Intelligence_