const jwt = require("jsonwebtoken");

let auth = (req,res,next) =>
{
    const token = req.cookies.token;
    // console.log(token);
    if(!token)
    {
        return res.status(401).json({message: "No token"});
    }
    try
    {
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
        next();
    }
    catch(err)
    {
        res.json({"message" : "invalid token"});
    }
}


module.exports = auth;