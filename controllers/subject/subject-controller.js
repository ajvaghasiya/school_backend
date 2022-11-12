const { compare }  = require('bcryptjs');
const { response } = require('express');
const jwt          = require("jsonwebtoken");
const md5          = require("md5");
const nodemailer   = require("nodemailer");
var subjectModel   = require('../../model/subject/subject');
var userModel      = require('../../model/others/User');
const { ObjectId } = require('bson');

/**************** user Register ***********/

exports.add_subject = async (req, res) => {

    // Check Subject exists
    
    const subjectExists = await subjectModel.findOne({
        name : req.body.name
    });

    if(subjectExists)
    {  
        outputJson     = {code: 400, status: "error", message: 'Subject Already Exists'};
        return res.json(outputJson);
    }

    const subject = new subjectModel({
        name : req.body.name,
        teacher : req.body.teacher,
        status : req.body.status,
    })
    
    try
    {
        const subjectData = await subject.save();
        outputJson     = {code: 200, status: "Success",message: 'Subject Add Success'};
        res.json(outputJson);
    }
    catch(error)
    {
        outputJson     = {code: 400, status: "Faild",message: 'Subject Add Faild'};
        res.json(outputJson);
    }
};


// Get Subject Data

exports.view_subject = async(req, res) => {
    var postData = req.body;
    let where    = {loginToken:postData.token,isDeleted:false}
    let aggregateQueryRem = [
        {
          $match:where
        },
        {
          $lookup: {
            from: "subjects",
            localField: "_id",
            foreignField: "teacher", 
            as: "subjectData",
          },
        },
        {
            $unwind: { path: "$subjectData", preserveNullAndEmptyArrays: true }
        },
        { $project: { _id:1, name: 1,subject:"$subjectData.name",subject_status:"$subjectData.status",subject_id:"$subjectData._id"} },
      ];
      let subjects = await userModel.aggregate(
        aggregateQueryRem
      );
      outputJson = { code: 200, status: "Success", message: 'Subject List successfully.',result: subjects};
      res.json(outputJson);
};

exports.getsubjectWithId = async(req, res) => {
    var postData = req.body;
	let where    = {_id:postData.id,isDeleted: false}
    let result   = await subjectModel.findOne(where);
    outputJson = { code: 200, status: "Success", message: 'Subject Data List successfully.', result: result};
    res.json(outputJson);
};

// Edit Subject

exports.editsubjectdata = async (req, res) => {
    try {
        let result = await subjectModel.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            req.body
        );
        outputJson = { code: 200, status: "Success", message: 'Update Subject successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

// Delete Subject

exports.deletesubject = async (req, res) => {
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    try {
        let result = await subjectModel.findOneAndUpdate(where, {
        isDeleted: true,
        });     
        outputJson = { code: 200, status: "Success", message: 'Update Subject successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
    
};
