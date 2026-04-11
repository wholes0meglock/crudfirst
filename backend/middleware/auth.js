const jwt = require("jsonwebtoken");

let middleAuth = (req,res,next) =>
{
    console.log(req);
    const token = req.cookies.token;
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


module.exports = middleAuth;