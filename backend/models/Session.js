const mongoose = require("mongoose");
const SessionSchema = new mongoose.Schema(
    {
        subject: String,
        duration: Number
    }
);

module.exports = mongoose.model("Session", SessionSchema);