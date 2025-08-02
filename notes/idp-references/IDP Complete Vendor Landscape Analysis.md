# IDP Complete Vendor Landscape Analysis

## **Objective**

Map IDP's complete vendor ecosystem beyond the 2012 import data - domestic suppliers, international partners, and supply chain relationships across all entities and business units.

## **Data Sources**

- **IMPORT2012Proveedores** - International suppliers (43 records) - baseline
- **FCRMVI** - Look for supplier-related transactions
- **Other potential supplier tables** - need to identify in schema
- Cross-entity vendor relationships

## **Key Fields to Analyze**

- International supplier network from IMPORT2012Proveedores
- Domestic supplier identification from transaction patterns
- Vendor performance and relationship strength
- Multi-entity vendor strategies

## **Analysis Queries**

### **1. International Supplier Inventory (Baseline)**

```sql
-- Complete international supplier list from 2012 data
SELECT 
    Codigo as VENDOR_CODE,
    Nombre as VENDOR_NAME,
    Direccion as ADDRESS,
    Localidad as CITY,
    CodigoPostal as POSTAL_CODE,
    Provincia as STATE_PROVINCE,
    Pais as COUNTRY,
    Telefono as PHONE,
    Email as EMAIL,
    [Limite Credito] as CREDIT_LIMIT,
    CASE 
        WHEN Pais = 'USA' THEN 'US_SUPPLIER'
        WHEN Pais IN ('Netherlands', 'Greece', 'France', 'Germany') THEN 'EUROPEAN_SUPPLIER'
        ELSE 'OTHER_INTERNATIONAL'
    END as SUPPLIER_REGION
FROM IMPORT2012Proveedores
ORDER BY Pais, Nombre;
```

### **2. Search for Additional Supplier Tables**

```sql
-- Find all tables that might contain supplier/vendor data
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE COLUMN_NAME LIKE '%PROV%' 
   OR COLUMN_NAME LIKE '%VENDOR%'
   OR COLUMN_NAME LIKE '%SUPPLIER%'
   OR TABLE_NAME LIKE '%PROV%'
   OR TABLE_NAME LIKE '%VENDOR%'
ORDER BY TABLE_NAME, COLUMN_NAME;
```

### **3. Identify Domestic Suppliers from Transaction Patterns**

```sql
-- Look for potential domestic suppliers in transaction data
SELECT DISTINCT
    FCRMVI_ARTCOD as PRODUCT_CODE,
    FCRMVI_TEXTOS as PRODUCT_DESCRIPTION,
    COUNT(*) as FREQUENCY,
    AVG(FCRMVI_PRECIO) as AVG_PRICE,
    MIN(FCRMVI_PRECIO) as MIN_PRICE,
    MAX(FCRMVI_PRECIO) as MAX_PRICE
FROM FCRMVI 
WHERE FCRMVI_TEXTOS IS NOT NULL 
  AND FCRMVI_TEXTOS LIKE '%PROVEEDOR%'
  OR FCRMVI_TEXTOS LIKE '%SUPPLIER%'
  OR FCRMVI_TEXTOS LIKE '%FABRICANTE%'
GROUP BY FCRMVI_ARTCOD, FCRMVI_TEXTOS
ORDER BY COUNT(*) DESC;
```

### **4. International Supplier Transaction Analysis**

```sql
-- Cross-reference international suppliers with transaction data
-- Note: May need to find connecting table/field
SELECT 
    i.Nombre as INTERNATIONAL_SUPPLIER,
    i.Pais as COUNTRY,
    i.Email as CONTACT,
    COUNT(*) as TRANSACTIONS_FOUND,
    'NEED_CONNECTION_ANALYSIS' as STATUS
FROM IMPORT2012Proveedores i
-- LEFT JOIN [connection needed] 
GROUP BY i.Nombre, i.Pais, i.Email
ORDER BY i.Pais, i.Nombre;
```

### **5. Vendor Geographic Distribution**

```sql
-- Supplier distribution by country/region
SELECT 
    Pais as COUNTRY,
    COUNT(*) as SUPPLIER_COUNT,
    AVG([Limite Credito]) as AVG_CREDIT_LIMIT,
    STRING_AGG(Nombre, '; ') as SUPPLIER_NAMES
FROM IMPORT2012Proveedores
GROUP BY Pais
ORDER BY COUNT(*) DESC;
```

## **Findings**

### **International Supplier Network (2012 Baseline)**

|Country|Supplier Count|Key Companies|Specialization|
|---|---|---|---|
|USA|[TBD]|Viking Life Saving, ACR Electronics|Marine safety equipment|
|Netherlands|[TBD]|Willem Pot Bv|Marine/maritime|
|Greece|[TBD]|Lalizas Sa|Marine equipment|
|France|[TBD]|Acebi|[TBD]|
|Other|[TBD]|[TBD]|[TBD]|

### **Key International Partners**

#### **Marine Safety Giants (USA)**

- **Viking Life Saving** (Miami, FL) - Life rafts, marine safety
- **ACR Electronics** (Ft. Lauderdale, FL) - Emergency beacons, communication
- **Schat Harding** (Louisiana) - Life boats, davit systems

#### **European Marine Network**

- **Lalizas Sa** (Greece) - Marine safety equipment
- **Willem Pot Bv** (Netherlands) - Maritime systems
- **Acebi** (France) - [Product line TBD]

## **Current Status**

**INTERNATIONAL SUPPLIER BASELINE ESTABLISHED** ✅ (43 suppliers from 2012) **DOMESTIC SUPPLIER ANALYSIS PENDING** ⏳ **PRODUCT-VENDOR CORRELATION PENDING** ⏳

### **Known Vendor Intelligence Context**

Based on our mega-product analysis, IDP's vendor relationships likely support:

- **Product 002** (516+ billion peso mega-projects) - Specialized mega-project vendors
- **Products 9001060/9007000** (270-842+ billion peso systems) - Marine safety equipment suppliers
- **Product 2501999** (409+ billion peso operations) - Operational equipment/services vendors

## **Findings**

### **International Supplier Network (2012 Baseline)**

|Country|Supplier Count|Key Companies|Specialization|
|---|---|---|---|
|USA|3+|Viking Life Saving, ACR Electronics, Schat Harding|Marine safety equipment specialists|
|Netherlands|1+|Willem Pot Bv|Maritime systems|
|Greece|1+|Lalizas Sa|Marine equipment|
|France|1+|Acebi|Marine/safety equipment|
|Other|~37|[Various international suppliers]|Supporting equipment/services|

### **Key International Partners**

#### **Marine Safety Giants (USA)**

- **Viking Life Saving** (Miami, FL) - Life rafts, marine safety
    - _Likely supplier for 9001060 major systems products_
- **ACR Electronics** (Ft. Lauderdale, FL) - Emergency beacons, communication
    - _Likely supplier for emergency equipment components_
- **Schat Harding** (Louisiana) - Life boats, davit systems
    - _Likely supplier for major maritime safety installations_

#### **European Marine Network**

- **Lalizas Sa** (Greece) - Marine safety equipment
    - _Likely supplier for European-standard equipment_
- **Willem Pot Bv** (Netherlands) - Maritime systems
    - _Likely supplier for specialized maritime systems_
- **Acebi** (France) - Marine/safety equipment
    - _Likely supplier for fire safety systems_

### **Vendor-Product Intelligence Hypothesis**

#### **Mega-Project Vendor Relationships (Product 002)**

- **516+ billion peso deals** likely require **exclusive/specialized vendors**
- **CMARTINEZ Z001 specialization** suggests **direct manufacturer relationships**
- **Government contract scale** requires **certified/approved vendor network**

#### **Major Systems Vendor Network (Products 9001060/9007000)**

- **270-842+ billion peso systems** require **premium international suppliers**
- **Viking, ACR, Schat Harding** likely primary suppliers for major installations
- **FMAMONDE, ALAMBRECHTS specialists** suggest **direct vendor management**

#### **Operational Vendor Relationships (Product 2501999)**

- **409+ billion peso operations** require **diverse supplier network**
- **Cross-entity EMORALES expertise** suggests **multi-vendor coordination**
- **P001 volume operations** require **established supplier partnerships**

### **Supply Chain Intelligence**

#### **Business Unit Vendor Specialization Hypothesis**

- **Z001 (Mega-projects)**: Exclusive/certified vendors for government contracts
- **P001 (Operations)**: Established supplier network for volume operations
- **S001 (Major systems)**: Premium international suppliers (Viking, ACR, Schat)
- **S003 (Integration)**: Multi-vendor coordination for complex systems

#### **Multi-Entity Vendor Strategy Hypothesis**

- **BIC Entity**: Ultra-premium vendor relationships (boutique suppliers)
- **GDO Entity**: Diversified vendor network (broad supplier base)
- **IDP Entity**: Complete vendor ecosystem (volume + premium suppliers)

## **Missing Data Analysis**

### **Critical Vendor Analysis Still Required:**

1. **Modern supplier network** (2013-2025 evolution beyond 2012 baseline)
2. **Domestic Argentine suppliers** (local manufacturing/services)
3. **Vendor-to-mega-product correlation** (which suppliers enable billion+ peso deals)
4. **Vendor performance metrics** (reliability, pricing, strategic relationships)
5. **Supply chain dependencies** (critical vendors for mega-deal capability)

## **Missing Data Analysis**

### **Potential Additional Supplier Tables**

[Results from schema search for supplier-related tables]

### **Connection Points Needed**

[How to link international suppliers to transaction data]

### **Modern Supplier Network**

[2013-2025 supplier evolution beyond 2012 baseline]

## **Next Steps**

1. Execute international supplier inventory
2. Search for additional supplier tables in schema
3. Analyze domestic supplier patterns in transaction data
4. Map vendor relationships to business units
5. Identify modern supplier network evolution

---

_Updated: [DATE] | Analyst: rolodexterGPT | Client: IDP Maritime Intelligence_