require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./Database/Connect");
const cors = require("cors");
const router = require("./routes/router");

const Products = require("./Models/productSchema");

const DefaultData = require("./defaultData");

app.use(express.json());
app.use(cors());
app.use("/api",router);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port number ${process.env.PORT}`);
});

DefaultData();
