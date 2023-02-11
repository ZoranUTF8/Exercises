const mongoose = require("mongoose");
const Person = require("../Model/Person");

const addNewPersonToAtlas = (personName, personNumber) => {
  if (!personName || !personNumber) {
    console.error("No name or number");
    return;
  } else {
    const newPerson = new Person({ name: personName, number: personNumber });

    return newPerson.save();
  }
};

const getAllPersonsFromAtlas = () => {
  return Person.find({}).then((result) => {
    const persons = [];

    result.forEach((person) => {
      persons.push(person);
    });

    return persons;
  });
};

module.exports = { addNewPersonToAtlas, getAllPersonsFromAtlas };
