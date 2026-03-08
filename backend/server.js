require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => console.log("mongo connected")).catch(err => console.log(err))

const userRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/sessions");


app.use(express.json());

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
