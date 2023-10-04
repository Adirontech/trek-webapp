const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const config = require("../config/config");
const cors = require("cors");

const db = pgp(config.databaseURL);

app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
