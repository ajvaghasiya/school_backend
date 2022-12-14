const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    uniqId: {type: Number, required: true},
    resetLink: {type: String},
    loginToken: {type: String},
    isDeleted: { type: Boolean, default: false },  
});

module.exports = mongoose.model("admin", dataSchema);