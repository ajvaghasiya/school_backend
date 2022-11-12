const { compare }  = require('bcryptjs');
const { response } = require('express');
const jwt          = require("jsonwebtoken");
const md5          = require("md5");
const nodemailer   = require("nodemailer");
var subjectModel   = require('../../model/subject/subject');
var userModel      = require('../../model/others/User');
var classModel     = require('../../model/class/class');
var examModel      = require('../../model/exam/exam');
const { ObjectId } = require('bson');

// Get Dashboard Data

exports.view_dashboard = async(req, res) => {
    var postData = req.body;
    let where    = {loginToken:postData.token,isDeleted: false}
    let result   = await userModel.findOne(where);
    let totalsubect = 0;
    let totalclass  = 0;
    let totalexam   = 0;
    if(result.role == 'teacher')
    {
      let where_subject = {teacher:result._id,isDeleted: false}
      totalsubect       = await subjectModel.find(where_subject).count();
    
      let where_class   = {isDeleted: false}
      totalclass        = await classModel.find(where_class).count();

      let where_exam    = {isDeleted: false}
      totalexam         = await examModel.find(where_exam).count();
      
    }
    else if(result.role == 'admin')
    {
      let where_subject = {isDeleted: false}
      totalsubect       = await subjectModel.find(where_subject).count();

      let where_class   = {isDeleted: false}
      totalclass        = await classModel.find(where_class).count();

      let where_exam    = {isDeleted: false}
      totalexam         = await examModel.find(where_exam).count();

    }
    outputJson  = {count_subject:totalsubect,count_class:totalclass,count_exam: totalexam,code:200,status: "Success",};
    res.json(outputJson);    
};

