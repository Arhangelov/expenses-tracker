const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Cross-Origin-Resource-Sharing
app.use(cors());
//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is runing on ${PORT}`))