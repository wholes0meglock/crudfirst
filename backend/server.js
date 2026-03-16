require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(() => console.log("mongo connected")).catch(err => console.log(err))

const userRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/sessions");
const cors = require("cors");


app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use((req, res, next) => {
    let date = new Date();
    console.log(`${req.method} ${req.url} ${date}`);
    next();
});

app.use("/auth",userRoutes);
app.use("/sessions",sessionRoutes);
app.listen(3000, () =>
{
    console.log("Server running on Port 3000.");
}
)
