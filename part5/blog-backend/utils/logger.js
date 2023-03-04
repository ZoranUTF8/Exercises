var colors = require("colors");

const info = (...params) => {
  console.log(`${params}`.green);
};

const error = (...params) => {
  console.log(`${params}`.red);
};

module.exports = { info, error };
