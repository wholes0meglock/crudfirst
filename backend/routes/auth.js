const express = require("express");
const router = express.Router();
const users = require("../models/users");
const auth  = require("../middleware/auth");


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



router.post('/register', async (req,res) =>
{
    const username  = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create(
        {
            username : username,
            password : hashedPassword
        }
    )
    res.json(newUser);
})


router.post('/login', async (req,res) =>
{
    const username  = req.body.username;
    const password = req.body.password;
    const UserToCheck = await users.findOne({username: username});
    if(!UserToCheck)
    {
        return res.status(404).json({"message" : "User not found. Try again."});
    }
    const match = await bcrypt.compare(password, UserToCheck.password);
    if(!match)
    {
        return res.json({message: "incorrect password or username, try again."});
    }
    else
    {
        const token = jwt.sign(
            { id : UserToCheck._id},
            "secretkey",
            {expiresIn : "1h"}
        );
        res.cookie("token",token,
            {
                httpOnly : true,
                maxAge : 3600000
            }
        );
        res.json({"message" : "Login successful."})
    }
    // const passwordToCheck = UserToCheck.password;
    // if(passwordToCheck === password)
    // {
    //     return res.json({"message" : "Login Successful."});
    // }
    // else
    // {
    //     return res.status(404).json({"message" : "Wrong password or username. Try again."});
    // }
}) 


module.exports = router;