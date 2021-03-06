// begin addComponents()
const addComponents = function(components) {
  let componentList = [];

  for (let i = 0; i < components.length; i++) {
    components[i].pieces_per_kit *= components[i].quantity;
    componentList.push(Object.assign({}, components[i]));
  }
  // Gets a list of components with no duplicates to be iterated over in a later
  // function.
  let componentsNoDups = removeDups(components, 'id');

  // Sorts the components into an array of arrays, seperated out by component id
  let componentsSorted = sortByProp(componentList, componentsNoDups, 'id');

  // Performs a reduce function on each array from the results above and gives
  // the quantity of each item to order.
  let newQuantities = calculateQuantities(componentsSorted, componentsNoDups);

  return newQuantities;
}; // addComponents()

// begin removeDups()
function removeDups(arr, prop) {
    return arr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
} // end removeDups()

// begin calculateQuantities()
function calculateQuantities(originalArray, noDuplicates) {
  let arrayCopy = [];

  for (var i = 0; i < noDuplicates.length; i++) {
    arrayCopy.push(Object.assign({}, noDuplicates[i]));
    let newQuantitiy = originalArray[i].reduce((x,y) => ({
      oldPiecesPerKit: x.pieces_per_kit,
      pieces_per_kit: x.pieces_per_kit + y.pieces_per_kit,
      quantity: x.quantity + y.quantity,
    }));

    // how many of an item do we need to order? (how many individual sheet protectors)
    arrayCopy[i].piecesPerKitSummed = newQuantitiy.pieces_per_kit;

    // how many units do we need to order? (how many packages of sheet protectors)
    arrayCopy[i].orderQuantity = Math.ceil(arrayCopy[i].piecesPerKitSummed/arrayCopy[i].pieces_per_unit);
  }
  return arrayCopy;
} // end calculateQuantities()

// begin sortByProp()
function sortByProp(originalArray, noDuplicates, property) {
  let sortedArray = [];
  for (let i = 0; i < noDuplicates.length; i++) {
    sortedArray.push(originalArray.filter((item) => item[property] == noDuplicates[i][property]));
  }
  return sortedArray;
} // end sortByProp()


module.exports = {
  addComponents,
};
