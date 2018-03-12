
const addComponents = function(components) {
  let componentList = [];
  for (let i = 0; i < components.length; i++) {
    components[i].pieces_per_kit *= components[i].quantity;
    componentList.push(Object.assign({}, components[i]));
    // console.log(component.pieces_per_kit);
  }

  let componentsNoDups = removeDups(components, 'component_id');

  let componentsSorted = sortByProp(componentList, componentsNoDups, 'component_id');
  // return componentsSorted
  let newQuantities = calculateQuantities(componentsSorted, componentsNoDups);
  return newQuantities;
  // console.log(newQuantities);
  // console.log(components);
  // return componentsSorted;
};

function removeDups(arr, prop) {
    return arr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
} // end removeDups()

function calculateQuantities(originalArray, noDuplicates) {
  let arrayCopy = [];

  for (var i = 0; i < noDuplicates.length; i++) {
    arrayCopy.push(Object.assign({}, noDuplicates[i]));
    let newQuantitiy = originalArray[i].reduce((x,y) => ({pieces_per_kit: x.pieces_per_kit + y.pieces_per_kit }));
    arrayCopy[i].pieces_per_kit = newQuantitiy.pieces_per_kit;
  }
  return arrayCopy;
}

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
