const mongoose = require("mongoose");
const SessionSchema = new mongoose.Schema(
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subject: String,
    duration: Number
    }
);

module.exports = mongoose.model("Session", SessionSchema);