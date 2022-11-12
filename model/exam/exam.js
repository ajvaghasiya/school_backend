const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
ObjectId       = Schema.ObjectId;   

const dataSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    exam_date: {type: String, required: true },
    status: {type: Number, required: true},
    isDeleted: { type: Boolean, default: false },  
});

module.exports = mongoose.model("exam", dataSchema);