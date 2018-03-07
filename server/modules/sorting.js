const sortComponents = function (sortMethod) {

  let queryText;

  switch (sortMethod) {
    case 'nameAsc':
      queryText = `SELECT * FROM components ORDER BY "name"`;
      break;
    case 'nameDesc':
      queryText = `SELECT * FROM components ORDER BY "name" DESC`;
      break;
    case 'typeAsc':
      queryText = `SELECT * FROM components ORDER BY "type"`;
      break;
    case 'typeDesc':
      queryText = `SELECT * FROM components ORDER BY "type" DESC`;
      break;
    case 'pricePUAsc':
      queryText = `SELECT * FROM components ORDER BY "price_per_unit"`;
      break;
    case 'pricePUDesc':
      queryText = `SELECT * FROM components ORDER BY "price_per_unit" DESC`;
      break;
    case 'consumableAsc':
      queryText = `SELECT * FROM components ORDER BY "consumable"`;
      break;
    case 'consumableDesc':
      queryText = `SELECT * FROM components ORDER BY "consumable" DESC`;
      break;
    case 'genStockAsc':
      queryText = `SELECT * FROM components ORDER BY "general_stock_item"`;
      break;
    case 'genStockDesc':
      queryText = `SELECT * FROM components ORDER BY "general_stock_item" DESC`;
      break;
    case 'vendor1Asc':
      queryText = `SELECT * FROM components ORDER BY "vendor_name_primary"`;
      break;
    case 'vendor1Desc':
      queryText = `SELECT * FROM components ORDER BY "vendor_name_primary" DESC`;
      break;
    case 'vendor2Asc':
      queryText = `SELECT * FROM components ORDER BY "vendor_name_secondary"`;
      break;
    case 'vendor2Desc':
      queryText = `SELECT * FROM components ORDER BY "vendor_name_secondary" DESC`;
      break;
  }

  return queryText;
  
};

module.exports = {
  sortComponents,
};
