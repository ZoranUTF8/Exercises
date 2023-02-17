require("dotenv").config();

const PORT = process.env.PORT || 3001;
const ATLAS_DB_PASSWORD = process.env.MONGODB_URI;

module.exports = { ATLAS_DB_PASSWORD, PORT };
