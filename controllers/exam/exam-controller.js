const { compare }  = require('bcryptjs');
const { response } = require('express');
const jwt          = require("jsonwebtoken");
const md5          = require("md5");
var path 		   = require('path');
const nodemailer   = require("nodemailer");
var examModel      = require('../../model/exam/exam');
const { ObjectId } = require('bson');

/**************** Insert Exam ***********/

exports.add_exam = async (req, res) => {

    const exam = new examModel({
        name : req.body.name,
        exam_date : req.body.exam_date,
        status : req.body.status,
    })
    
    try
    {
        const examData = await exam.save();
        outputJson     = {code: 200, status: "Success",message: 'Exam Add Success'};
        res.json(outputJson);
    }
    catch(error)
    {
        outputJson     = {code: 400, status: "Faild",message: 'Exam Add Faild'};
        res.json(outputJson);
    }
};


// Get Exam Data

exports.view_exam = async(req, res) => {
    var postData = req.body;
    let where    = {isDeleted:false}
    let aggregateQueryRem = [
        {
          $match:where
        },
    ];
      
    let exams = await examModel.aggregate(
        aggregateQueryRem
    );

      outputJson = { code: 200, status: "Success", message: 'Exam List successfully.',result: exams};
      res.json(outputJson);
};

exports.getexamWithId = async(req, res) => {
    var postData = req.body;
	  let where    = {_id:postData.id,isDeleted:false}
    let result   = await examModel.findOne(where); 
    outputJson   = { code: 200, status: "Success", message: 'Exam List successfully.', result: result};
    res.json(outputJson);
};

// Import Data Csv

exports.uploadresultdata = async(req, res) => {

    var mv = require('mv');

    //get post value   
    var postData = req.body;
    var excel2json = require('excel2json');

    var file = __dirname + '/../../../files/' + req.file.originalname;
    var save_file_name = 'files/' + req.file.originalname;

    mv(req.file.path, file, function (err) {

        if (err){
            res.status(400).send({ success: 0, msg: "Error to upload file!", data: { err: err } });
        } else {
    
            var dataCheckExcel = {
                fileType: path.extname(req.file.originalname),
                file: file
            };

            module.exports.__checkExcelOrCSVSMS(dataCheckExcel, function (excelArr, myrow) {
                if (excelArr == "invalid") {
                    res.status(400).send({ success: 0, msg: "Error to upload file, Please contact to Resimpli Admin." });
                }
                else {
                    var sendData = {
                        success: 1,
                        data: {
                            fields: excelArr,
                            nid: 'd',
                            rows: (excelArr.length - 1)
                        }
                    };
                    outputJson  = {code: 200, status: "success", result:sendData};
                    return res.json(outputJson);  
                }
            });
        }
    });
},

exports.__checkExcelOrCSVSMS = async (data, callback)=>{
    console.log("data",data);
    var fileType = data.fileType.toLowerCase();
    var file = data.file;

    var excel2json = require('excel2json');
    var converter1 = require("xlsx-to-json-lc");

    if (fileType == ".csv" || fileType == ".CSV") {

        var fs = require("fs"); //Load the filesystem module
        var stats = fs.statSync(file)
        var fileSizeInBytes = stats["size"]
        //Convert the file size to megabytes (optional)
        var fileSizeInMegabytes = fileSizeInBytes / 1000000.0;

        if (fileSizeInMegabytes <= 5) {
            var filename = fs.readFileSync(file);
            var sheets = [1];
            excel2json.parse(filename, sheets, function (data) {
                var excelData = data.path.split("\r\n");
                var excelArr = [];
                for (var i = 0; i <= excelData.length; i++) {
                    if (i == excelData.length) {
                        callback(excelArr);
                    } else if (i !== excelData.length - 1) {
                        excelArr[i] = excelData[i].split(",");
                    }
                }
            });

        }

        else {
            var data = "invalid";
            var rowCount11 = 0;
            callback(data, rowCount11);
        }

    }
    else {
        var data = "invalid";
        var rowCount11 = 0;
        callback(data, rowCount11);
    }

},

// Edit Exam Data

exports.editexamdata = async (req, res) => {
    try {
        let result = await examModel.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            req.body
        );
        outputJson = { code: 200, status: "Success", message: 'Update Exam Data successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

// Delete Exam

exports.delete_exam = async (req, res) => {
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    try {
        let result = await examModel.findOneAndUpdate(where, {
        isDeleted: true,
        });     
        outputJson = { code: 200, status: "Success", message: 'Update Exam Data successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
    
};
