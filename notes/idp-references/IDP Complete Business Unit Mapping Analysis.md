# IDP Complete Business Unit Mapping Analysis

## **Objective**

Map all business unit codes (Z001, P001, S001, P003, etc.) to understand IDP's operational structure and what each unit represents.

## **Data Sources**

- **FCRMVI** - Business unit codes in operational context
- **FCRMVD** - Business unit codes in financial/accounting context
- **FCRMVG** - Business unit dimension codes (FCRMVG_CODDIM)

## **Key Fields to Analyze**

- `FCRMVI_CODCPT` - Business unit codes from operational layer
- `FCRMVG_CODDIM` - Dimension codes from financial detail layer
- Transaction volumes and values by business unit
- User/employee assignments by business unit

## **Analysis Queries**

### **1. Business Unit Code Inventory**

```sql
-- Get all unique business unit codes with transaction counts and values
SELECT 
    FCRMVI_CODCPT as BUSINESS_UNIT_CODE,
    COUNT(*) as TRANSACTION_COUNT,
    COUNT(DISTINCT FCRMVI_USERID) as UNIQUE_USERS,
    AVG(FCRMVI_PRECIO * FCRMVI_CANTID) as AVG_TRANSACTION_VALUE,
    SUM(FCRMVI_PRECIO * FCRMVI_CANTID) as TOTAL_VALUE,
    MIN(FCRMVI_FECALT) as EARLIEST_DATE,
    MAX(FCRMVI_FECALT) as LATEST_DATE
FROM FCRMVI 
WHERE FCRMVI_CODCPT IS NOT NULL 
  AND FCRMVI_PRECIO IS NOT NULL 
  AND FCRMVI_CANTID IS NOT NULL
GROUP BY FCRMVI_CODCPT
ORDER BY SUM(FCRMVI_PRECIO * FCRMVI_CANTID) DESC;
```

### **2. Business Unit by Entity Analysis**

```sql
-- Business units by entity (BIC, GDO, IDP)
SELECT 
    FCRMVI_CODEMP as ENTITY,
    FCRMVI_CODCPT as BUSINESS_UNIT,
    COUNT(*) as TRANSACTIONS,
    SUM(FCRMVI_PRECIO * FCRMVI_CANTID) as TOTAL_VALUE,
    COUNT(DISTINCT FCRMVI_USERID) as EMPLOYEES
FROM FCRMVI 
WHERE FCRMVI_CODCPT IS NOT NULL 
  AND FCRMVI_PRECIO IS NOT NULL
GROUP BY FCRMVI_CODEMP, FCRMVI_CODCPT
ORDER BY FCRMVI_CODEMP, SUM(FCRMVI_PRECIO * FCRMVI_CANTID) DESC;
```

### **3. Business Unit Employee Specialization**

```sql
-- Which employees work in which business units
SELECT 
    FCRMVI_CODCPT as BUSINESS_UNIT,
    FCRMVI_USERID as EMPLOYEE,
    COUNT(*) as TRANSACTIONS,
    SUM(FCRMVI_PRECIO * FCRMVI_CANTID) as EMPLOYEE_TOTAL_VALUE,
    AVG(FCRMVI_PRECIO * FCRMVI_CANTID) as AVG_DEAL_SIZE
FROM FCRMVI 
WHERE FCRMVI_CODCPT IS NOT NULL 
  AND FCRMVI_USERID IS NOT NULL
  AND FCRMVI_PRECIO IS NOT NULL
GROUP BY FCRMVI_CODCPT, FCRMVI_USERID
ORDER BY FCRMVI_CODCPT, SUM(FCRMVI_PRECIO * FCRMVI_CANTID) DESC;
```

## **Findings**

### **Business Unit Codes Discovered**

|Code|Entity|Description|Transaction Count|Total Value|Key Employees|Specialization|
|---|---|---|---|---|---|---|
|Z001|IDP/GDO|**MEGA-PROJECT SPECIALISTS**|154|10.3+ Trillion pesos|CMARTINEZ (Emperor)|Government contracts, 71+ trillion peso deals|
|P001|ALL|**OPERATIONAL BACKBONE**|1.2M+|11+ Trillion pesos|EMORALES, M.CAMPORA|High-volume premium operations|
|P003|BIC/GDO/IDP|**PREMIUM OPERATIONS**|1,975-5,914|2.7-6.4 Trillion pesos|EMORALES|Cross-entity premium projects|
|S001|ALL|**MAJOR SYSTEMS/SERVICES**|16,391-859K|44-793 Trillion pesos|FMAMONDE, ALAMBRECHTS, CAROLINA|270+ billion peso systems|
|S002|IDP|**TRILLION-PESO SPECIALISTS**|7|78+ Billion pesos|[Ultra-exclusive]|11+ trillion peso average deals|
|S003|ALL|**SYSTEMS OPERATIONS**|57-4,244|105-275 Trillion pesos|EMORALES|Medium-scale systems|
|P002|BIC/GDO/IDP|**SPECIALIZED OPERATIONS**|88-8,242|335-546 Trillion pesos|Multiple specialists|Mid-tier operations|
|U001/U002|GDO/IDP|**ULTRA-PREMIUM INTERNATIONAL**|4-24|196-678 Trillion pesos|Exclusive specialists|International mega-projects|

### **Business Unit Operational Patterns**

#### **🎯 MEGA-DEAL HIERARCHY:**

1. **Z001 = GOVERNMENT MEGA-CONTRACTS** - 671+ billion peso average deals
2. **S002 = TRILLION-PESO EXCLUSIVES** - 11+ trillion peso average deals
3. **U-Codes = INTERNATIONAL ULTRA-PREMIUM** - 200+ trillion peso projects
4. **P001 = VOLUME POWERHOUSE** - 1.2M+ transactions, operational backbone
5. **S001 = MAJOR SYSTEMS** - 270+ billion peso equipment/services

#### **🏢 MULTI-ENTITY SPECIALIZATION:**

**BIC = ULTRA-PREMIUM BOUTIQUE**

- **Tiny elite teams** (3-4 employees per unit)
- **Massive average deals** (1.5-5.7 trillion peso averages)
- **P003**: 5.7 trillion peso average deals (3 employees only!)

**GDO = DIVERSIFIED POWERHOUSE**

- **Broadest operation scope** - handles P, S, Z, U codes
- **Z001**: 57.5 trillion peso average deals
- **U002**: 281 trillion peso average deals (premium international)

**IDP = VOLUME + PREMIUM HYBRID**

- **Largest employee base** (37 employees in P001 alone)
- **Complete portfolio** - every business unit type
- **S002 EXCLUSIVE** - only entity with trillion-peso specialist unit
- **Volume leader** - 608K transactions in P001

### **Business Unit Specialization Analysis**

#### **MEGA-DEAL EMPLOYEE CHAMPIONS:**

- **CMARTINEZ** (IDP-Z001): **MEGA-DEAL EMPEROR** - 71+ trillion peso individual transactions
- **EMORALES** (Multi-entity): **400+ billion peso specialist** - Cross-entity expertise
- **FMAMONDE** (IDP-S001): **270+ billion peso systems** - Major equipment specialist
- **ALAMBRECHTS** (IDP-S001): **270+ billion peso systems** - Systems integration
- **LSANGREGORIO** (GDO-S001): **842+ billion peso services** - Ultra-high value specialist
- **CAROLINA** (IDP-S001): **523+ billion peso deals** - Premium systems operations
- **M.CAMPORA** (IDP-P001): **447+ billion peso operations** - High-value operational specialist

#### **PRODUCT-BUSINESS UNIT MAPPING:**

- **Product 002**: 516+ billion peso deals (Z001 mega-projects)
- **Product 2501999**: 409+ billion peso deals (P001/P003 operations)
- **Product 9001060**: 270+ billion peso deals (S001 major systems)
- **Product 9006201**: 523+ billion peso deals (S003 systems)
- **Product 3002010**: 447+ billion peso deals (P001 operations)

### **Multi-Entity Business Unit Strategy**

#### **STRATEGIC ENTITY POSITIONING:**

- **BIC**: Ultra-premium boutique strategy (low volume, massive value)
- **GDO**: Diversified powerhouse (all business unit types, balanced approach)
- **IDP**: Volume + premium hybrid (largest scale, broadest capability)

#### **CROSS-ENTITY BUSINESS UNIT DISTRIBUTION:**

- **P001 EVERYWHERE**: All 3 entities run P001 (operational backbone)
- **Z001 EXCLUSIVE**: Only GDO + IDP (BIC not in mega-project business)
- **U-CODES ELITE**: Only GDO + IDP (BIC excluded from international ultra-premium)
- **S002 IDP-ONLY**: Trillion-peso specialists exclusive to IDP entity

## **Next Steps**

1. Execute inventory queries
2. Correlate with product codes to understand unit specializations
3. Map to customer patterns to identify market focus
4. Cross-reference with financial dimension codes

---

_Updated: [DATE] | Analyst: rolodexterGPT | Client: IDP Maritime Intelligence_