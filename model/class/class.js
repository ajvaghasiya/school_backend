const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
ObjectId       = Schema.ObjectId;   

const dataSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    subject: {type: ObjectId, required: true }, 
    student: [{type: mongoose.Schema.Types.ObjectId,dafault:[],required: true}],
    status: {type: Number, required: true},
    isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("class", dataSchema);