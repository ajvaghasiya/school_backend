const { compare }  = require('bcryptjs');
const { response } = require('express');
const jwt          = require("jsonwebtoken");
const md5          = require("md5");
const nodemailer   = require("nodemailer");
var subjectModel   = require('../../model/subject/subject');
var userModel      = require('../../model/others/User');
var classModel     = require('../../model/class/class');
const { ObjectId } = require('bson');

/**************** Insert Class ***********/

exports.add_class = async (req, res) => {

    const classins = new classModel({
        name : req.body.class_name,
        subject : req.body.subject,
        student : req.body.student,
        status : req.body.status,
    })
    
    try
    {
        const classData = await classins.save();
        outputJson     = {code: 200, status: "Success",message: 'Class Add Success'};
        res.json(outputJson);
    }
    catch(error)
    {
        outputJson     = {code: 400, status: "Faild",message: 'Class Add Faild'};
        res.json(outputJson);
    }
};


// Get Subject Data

exports.view_class = async(req, res) => {
    var postData = req.body;
    let where    = {isDeleted:false}
    let aggregateQueryRem = [
        {
          $match:where
        },
        {
            $lookup:{
                from: 'subjects',
                localField: 'subject',
                foreignField: '_id',
                as: 'subjectdata'
                }
        },
        {
            $lookup:{
                  from: 'admins',
                  localField: 'student',
                  foreignField: '_id',
                  as: 'studentdata'
                 }
        },
        {
            $lookup:{
                    from: 'admins',
                    localField: 'subjectdat.teacher',
                    foreignField: '_id',
                    as: 'teacherdata'
                    }
        },
        {   
          $project: { 
            _id:1,
            name: 1,
            student:"$studentdata.name",
            subject:"$subjectdata.name",
            status:1,
            } 
        },
      ];
      
      let subjects = await classModel.aggregate(
        aggregateQueryRem
      );

      outputJson = { code: 200, status: "Success", message: 'Class List successfully.',result: subjects};
      res.json(outputJson);
};

exports.getclassWithId = async(req, res) => {
    var postData = req.body;
	  let where    = {_id:postData.id,isDeleted:false}
    let result   = await classModel.findOne(where); 
    outputJson   = { code: 200, status: "Success", message: 'Class List successfully.', result: result};
    res.json(outputJson);
};

// Edit Class Data

exports.editclassdata = async (req, res) => {
    try {
        let result = await classModel.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            req.body
        );
        outputJson = { code: 200, status: "Success", message: 'Update Class successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

// Delete Class

exports.deleteclass = async (req, res) => {
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    try {
        let result = await classModel.findOneAndUpdate(where, {
        isDeleted: true,
        });     
        outputJson = { code: 200, status: "Success", message: 'Update Class successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
    
};
