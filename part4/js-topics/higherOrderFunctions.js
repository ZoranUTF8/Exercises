const animals = [
  { name: "tedi", species: "dog" },
  {
    name: "Mnjau",
    species: "cat",
  },
  {
    name: "Bobi",
    species: "bear",
  },
];

//! No higher order function
let dogs = [];

// for (let index = 0; index < animals.length; index++) {
//   if (animals[index].species === "dog") dogs.push(animals[index]);
// }

// console.log(dogs);

//! Higher order

const getDogsArray = (array, operation) => {
  return operation(array);
};

const filterOutDogs = (an) => {
  return an.species === "dog";
};
//                          CALLBACK FUNCTION
dogs = animals.filter(filterOutDogs);

console.log(dogs);
