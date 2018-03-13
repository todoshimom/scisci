
CREATE TABLE usertype (
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(25) NOT NULL
);

CREATE TABLE users (
"id" SERIAL PRIMARY KEY, 
"first_name" VARCHAR(150) NOT NULL,
"last_name" VARCHAR(150) NOT NULL,  
"username" VARCHAR(255) NOT NULL, 
"password" VARCHAR(255) DEFAULT '$2a$10$hHqRWK07ePfHgr6xZN526u/g5.ch.YgGJa1DBFF9IkR70DEBhng5e',
 --The default is Welcome1 encrypted., 
"usertype" INT REFERENCES "usertype" NOT NULL
);

-- The 3 standard user types used in the application.
INSERT INTO usertype (name)
VALUES ('Admin'),('Editor'),('Shopper');

-- This will be the very first admin.
INSERT INTO users (first_name, last_name, username, usertype)
VALUES ('Renee', 'Piersa', 'test@email.com', 1);

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
"consumable" BOOLEAN, 
"type" VARCHAR(50), 
"general_stock_item" BOOLEAN
);

CREATE TABLE modules (
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(100), 
"code" VARCHAR(15),  
"version_number" VARCHAR(15), 
"version_date" DATE,
"version_notes" TEXT,   
"estimated_assembly_time" INT, 
"assembly_notes" TEXT, 
"module_drive_link" VARCHAR(255), 
"to_be_printed_link" VARCHAR(255), 
"assembly_video_link" VARCHAR(255),  
"activity_video_link" VARCHAR(255), 
"kit_content_link" VARCHAR(255), 
"kit_content_title" VARCHAR(50),
"other1_link" VARCHAR(255), 
"other1_title" VARCHAR(50),
"other2_link" VARCHAR(255), 
"other2_title" VARCHAR(50)  
);

CREATE TABLE components_modules (
"id" SERIAL PRIMARY KEY, 
"module_id" INT REFERENCES "modules", 
"component_id" INT REFERENCES "components",
"pieces_per_kit" INT
);

CREATE TABLE shoppinglist (
"id" SERIAL PRIMARY KEY, 
"name" VARCHAR(100), 
"date" TIMESTAMP, 
"user_created_by" VARCHAR(50)

);

CREATE TABLE modules_shopping (
"id" SERIAL PRIMARY KEY, 
"quantity" INT, 
"shopping_id" INT REFERENCES "shoppinglist", 
"module_id" INT REFERENCES "modules",
"ordered" BOOLEAN, 
"in_house" BOOLEAN
);

CREATE TABLE appsettings (
"id" SERIAL PRIMARY KEY,
"labor_rate" DECIMAL (5, 2),
"last_changed" VARCHAR(150)
);


INSERT INTO appsettings (labor_rate, last_changed)
VALUES (0, 'Default');

--Add from here down to your local database to have real sample data and the new table 
CREATE TABLE shopping_components (
id SERIAL PRIMARY KEY,
"shopping_id" INT REFERENCES "shoppinglist",
"component_id" INT REFERENCES "components",
"ordered" BOOLEAN,
"in_house" BOOLEAN
);

INSERT INTO components (name, description, vendor_name_primary, vendor_url_primary, vendor_name_secondary, 
vendor_url_secondary, notes, price_per_unit, pieces_per_unit, consumable, type, general_stock_item ) 
VALUES ('Binder', '0.5 flexible', 'Amazon', 
'https://www.amazon.com/Wilson-Jones-ACCOHIDE-Capacity-A7040517E/dp/B000Q5Z3WE/ref=sr_1_1?s=office-products&ie=UTF8&qid=1472583519&sr=1-1&keywords=B000Q5Z3WE', 
'Wilson Jones', 'none', 'Holds chalk-board friendly images/slides and activity instructions/handouts', 6.39, 1, 
false, 'binder', true), ('CBF Slides', 'Slides', 'none', 'none', 'none', 'none', 'For instruction without a projector', 
0.39, 1, false, 'slides', false), ('Instruction Handout', 'handout', 'none', 'none', 'none', 'none', 
'For students to have during activity', 0.39, 1, false, 'handout', false), ('Human Circuit Handouts (Laminated)', 
'laminated handout', 'none', 'none', 'none', 'none', 'Print, cut out, and laminate. For students to hold and link arms to model a circuit. Enough for 5 sets', 
0.39, 1, false, 'laminated handout', false), ('Kit Content Sheet', 'KCS', 'none', 'none', 'none', 'none', 
'For Instructors to reference when determing if kit has everything it needs. Put in sheet protector and attach to binder or underside of kit lid', 
0.39, 1, false, 'KCS', false), ('Sheet Protectors', 'Avery economy clear sheet', 'Amazon', 
'https://www.amazon.com/Avery-Economy-Clear-Protectors-75091/dp/B00006IC89/ref=sr_1_4?s=office-products&ie=UTF8&qid=1472158602&sr=1-4&keywords=sheet+protectors', 
'none', 'none', 'For holding KCS and CBF', 8.09, 100, false, 'sheet protector', true), ('Laminating sheets', 
'3 milliliters thick-Scotch Thermal Laminating Pouches', 'Amazon', 
'https://www.amazon.com/gp/product/B007VBXB48?ref_=sr_1_1&s=office-products&qid=1472065676&sr=1-1&keywords=laminating%20sheets&pldnSite=1','none', 
'none', 'For laminating human circuit handouts', 11.59, 100, true, 'laminating sheets', true), ('Lamp Bases', 
'Miniature Lamp Holder', 'Lab & Science', 'http://www.bmelabandscience.com/store/?main_page=product_info&products_id=146', 'none', 'none', 'Holds lightbulb for activity', 
0.92, 1, false, 'lamp base', false), ('Golf Tees', 'Orlimar 2 3/4 inch golf tees', 'Amazon', 
'https://www.amazon.com/gp/product/B004LFWEIQ?redirect=true&ref_=oh_aui_search_detailpage&th=1', 'none', 'none', 
'For insulator/conductor activity', 8.50, 100, true, 'golf tee', false), ('Paper Clips', 'Value Pack of 100 ACCO gold tone jumbo paper clips', 
'Amazon', 'https://www.amazon.com/gp/product/B00T58WBDW/ref=ox_sc_imb_mini_detail?ie=UTF8&psc=1&smid=A3G2RBEZBLAJ53', 'none', 'none',
 'For making switches. Link two brass brads with the paperclip to complete the circuit', 6.04, 100, true, 
 'paper clip', false);

INSERT INTO modules (name) 
VALUES ('Sci Sci Kit Vendor Sheet'); 

INSERT INTO components_modules (module_id, component_id, pieces_per_kit)
VALUES (1, 2, 1), (1, 3, 17),(1, 4, 12), (1, 5, 15),(1, 6, 1), (1, 7, 30),(1, 8, 15), (1, 9, 15), 
(1, 10, 15), (1, 11, 50); 
