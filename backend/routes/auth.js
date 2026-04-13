const express = require("express");
const router = express.Router();
const users = require("../models/users");
// const auth  = require("../middleware/auth");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get("/me", async (req,res) =>
{
    const token = req.cookies.token;
    if(!token)
    {
        return res.status(401).json({"message":"User not found. Log in again."})
    }
    try
    {
        const user = jwt.verify(token, "secretkey");
        res.json({user});
    }
    catch(e)
    {
        res.status(401).json({"message":"Invalid token."});
    }
})

router.post('/register', async (req,res) =>
{
    const username  = req.body.username;
    const UserToCheck = await users.findOne({username: username});
    if(UserToCheck)
    {
        return res.status(409).json({"message" : "this username is already taken."});
    }
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

router.post('/logout',async(req,res) =>
{
    res.clearCookie("token",{
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/"
    });
    res.json({"message" : "Logged out."});
})
router.post('/login', async (req,res) =>
{
    const username  = req.body.username;
    const password = req.body.password;
    const UserToCheck = await users.findOne({username: username});
    if(!UserToCheck)
    {
        return res.status(409).json({"message" : "User not found. Try again."});
    }
    const match = await bcrypt.compare(password, UserToCheck.password);
    if(!match)
    {
        return res.status(409).json({"message": "incorrect password or username, try again."});
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
                maxAge : 3600000,
                sameSite: "Lax", 
                secure: false,
                path: "/"
            }
        );
        res.status(200).json({"message" : "Login successful."})
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