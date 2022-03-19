const router = require('express').Router();
const Products = require("../Models/productSchema");

//To get all products data from db.
router.get("/getproducts", async (req, res) => {
    try {
        const productsData = await Products.find();
        res.send(productsData);
    } catch (error) {
        console.log("Error", error.message);
    }
});

module.exports = router;