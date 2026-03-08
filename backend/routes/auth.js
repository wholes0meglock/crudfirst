const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const users = require("../models/users");
app.post('/register',async (req,res) =>
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


app.post('/login', async (req,res) =>
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
            { id : username._id},
            "secretkey",
            {expiresIn : "1h"}
        );
        res.json({token});
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