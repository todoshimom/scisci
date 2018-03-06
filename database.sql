-- Commented out parts are ideas of what may be changes to add 
CREATE TABLE users (
"id" SERIAL PRIMARY KEY, 
"first_name" VARCHAR(25), 
"last_name" VARCHAR(25), 
"email" VARCHAR(255), 
"password" VARCHAR(255), 
"user_type" INT REFERENCES "user_type"
);

CREATE TABLE user_type (
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(25)
);

CREATE TABLE components (
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(50), 
"description" VARCHAR(255), 
"vendor_name_primary" VARCHAR(100), 
"vendor_url_primary" VARCHAR(255), 
"vendor_name_secondary" VARCHAR(100), 
"vendor_url_secondary" VARCHAR(255), 
"notes" TEXT, 
"price_per_unit" DECIMAL(5, 2), 
"pieces_per_unit" INT,
-- "materials_in_kit_cost" DECIMAL(5, 2) REFERENCES "modules", 
-- "labor_cost" DECIMAL (5, 2) REFERENCES "modules",
"consumable" BOOLEAN, 
-- "type" VARCHAR(50), 
-- "general_stock_item" BOOLEAN,
-- "modules_used_in" INT 
);

CREATE TABLE modules_categories (
"id" SERIAL PRIMARY KEY, 
"code" VARCHAR(25)
);

CREATE TABLE modules (
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(100), 
"code" INT REFERENCES "modules_categories",
-- "price_per_unit" DECIMAL(2, 5),
-- "materials_in_kit_cost" DECIMAL(5, 2), 
-- "labor_cost" DECIMAL (5, 2),   
"version_number" INT, 
"version_date" TIMESTAMP, 
"assembly_time" INT, 
"document_url" VARCHAR(255), 
"notes" TEXT 
);

CREATE TABLE components_modules (
"id" SERIAL PRIMARY KEY, 
"module_id" INT REFERENCES "modules", 
"component_id" INT REFERENCES "components", 
"quantity" INT
);

CREATE TABLE regions (
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(25)
);

CREATE TABLE shopping_list (
"id" SERIAL PRIMARY KEY, 
"region" INT REFERENCES "regions",
"name" VARCHAR(100), 
"date" TIMESTAMP, 
"price_per_unit" decimal(5, 2) REFERENCES "components", 
"pieces_per_unit" INT REFERENCES "components",
-- "materials_in_kit_cost" DECIMAL(5, 2) REFERENCES "modules", 
-- "labor_cost" DECIMAL (5, 2) REFERENCES "modules",
"ordered" BOOLEAN, 
"in_house" BOOLEAN, 
-- "user_created_by" VARCHAR(50)
-- "modules_used_in" INT REFERENCES "components"
);

CREATE TABLE modules_shopping (
"id" SERIAL PRIMARY KEY, 
"quantity" INT, 
"shopping_id" INT REFERENCES "shopping_list", 
"module_id" INT REFERENCES "modules"
);