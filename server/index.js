require("dotenv").config();
const config = require("./config/main");
const express = require("express");
const db = require("./config/mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

db().then(() => {
    console.log("Connected to DB");
    app.listen(config.PORT, () =>
        console.log(`Server is running on port ${config.PORT}`)
    );
});
