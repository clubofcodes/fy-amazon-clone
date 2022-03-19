const router = require('express').Router();
const Products = require("../Models/productSchema");
const Users = require("../Models/userSchema");
const bcrypt = require('bcryptjs');

//To get all products data from db.
router.get("/getproducts", async (req, res) => {
    try {
        const productsData = await Products.find();
        res.send(productsData);
    } catch (error) {
        console.log("Error", error.message);
    }
});

//To register user for signup.
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fullname, email, mNumber, password } = req.body;

    if (!fullname || !email || !mNumber || !password) {
        res.send({ error: "Fill all the details" });
        console.log("One of the input data is missing.");
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPswd = await bcrypt.hash(password, salt);

        try {
            const isEmail = await Users.findOne({ email: email });
            const isMobile = await Users.findOne({ mNumber: mNumber });
            if (isEmail) {
                res.status(322).json({ error: "Your provided Email " + email + " has already been used." });
            } else if (isMobile) {
                res.status(422).json({ error: "Account already exists with the mobile number " + mNumber });
            } else {
                const UserData = new Users({ fullname, email, mNumber, password: hashedPswd });
                await UserData.save();
                res.send(UserData);
            }
        } catch (error) {
            console.log("Signup Error:", error.message);
            res.send({ error });
        }
    }
});

//For user login.
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.send({ error: "Fill all the details" });
    } else {
        try {
            const logedInUser = isNaN(email) ? await Users.findOne({ email: email }) : await Users.findOne({ mNumber: email });
            if (logedInUser) {
                const isMatch = await bcrypt.compare(password, logedInUser.password);
                (!isMatch) ? res.send({ error: "Invalid Credentials" }) : res.send({ message: "User found in database" });
            } else res.send({ error: "User doesn't exist!!" });
        } catch (error) {
            console.log("Login Error:", error.message);
            res.send({ error });
        }
    }
});

module.exports = router;