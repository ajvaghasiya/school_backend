const { compare }  = require('bcryptjs');
const { response } = require('express');
const jwt          = require("jsonwebtoken");
const md5          = require("md5");
const nodemailer   = require("nodemailer");
var userModel      = require('../../model/others/User');
const { ObjectId } = require('bson');
var generatePassword = require('password-generator');


/**************** user Register ***********/

exports.registerUser = async (req, res) => {

    // Check Email exists

    const emailExists = await userModel.findOne({
        email : req.body.email
    });

    if(emailExists)
    {  
        outputJson     = {code: 400, status: "error", message: 'Email Already Exists'};
        return res.json(outputJson);
        //return res.status(400).send("Email Already Exists");               
    }
    
    // Check Records and cal Uniq Id

    const Lastrecords = await userModel.find().sort({'_id':-1}).limit(1)
    let uniqId = '10001';

    if (Lastrecords.length > 0)
    {
        uniqId = parseInt(Lastrecords[0].uniqId)+1;
    }

    // Convert Password Md5
     const npassword = generatePassword(10, false, /[\w\d\?\-]/);
     console.log("Your Password =>",npassword);
    const newpassword = md5(npassword);
    const arurl = req.body.role;
    const fname = req.body.name;
    const unam = req.body.email;
    const upass = req.body.password;
    const user = new userModel({
        name : req.body.name,
        lastname : req.body.lastname,
        email : req.body.email,
        role : req.body.role,
        gender: req.body.gender,
        uniqId: uniqId,
        password : newpassword,
    }) 
    try
    {
        const userdata = await user.save();
        //console.log("Return Url=>",arurl);
        outputJson     = {code: 200, status: "Success", redirection: arurl, message: 'Register Success'};

        // Register Send Mail 

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'atuljvaghasiya2@gmail.com',
                pass: '99atul99'
            } 
        });

        var body ='<!DOCTYPE HTML><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Welcome</title><style type="text/css">p {  margin-bottom:10px; line-height:22px; margin-top:0; font-family:"Helvetica Neue", Helvetica, Arial, sans-serif; font-size:14px;}span {  font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;}a { color:#fb3544;  text-decoration:; font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;}body{background-color:#F3F3F3;}.bgBody { background:#F3F3F3;}.bgItem { background:#fff;}.bgBody, .bgBody td, table, table td, td { border-spacing: 0px !important; border:0 !important;  border: !important; border-collapse: collapse !important;} @media only screen and (max-width:480px) { table[class="MainContainer"], td[class="cell"] { width: 100% !important; height:auto !important;}td[class="specbundle"] { width: 100% !important; float:left !important; font-size:13px !important; line-height:17px !important; display:block !important; padding-bottom:15px !important;}td[class="specbundle2"] { width:90% !important; float:left !important; font-size:14px !important; line-height:18px !important; display:block !important; padding-left:5% !important; padding-right:5% !important;} td[class="specbundle3"], td[class="full"] { width:90% !important; float:left !important; font-size:14px !important; line-height:18px !important; display:block !important; padding-left:5% !important; padding-right:5% !important; padding-bottom:20px !important;}td[class="spechide"] { display: !important;} img[class="banner"] { width: 100% !important; height: auto !important;} td[class="left_pad"] { padding-left:15px !important; padding-right:15px !important;}#padd0, #padd1{padding-bottom:0 !important;margin-top:-1px}}@media only screen and (max-width:680px) { table[class="MainContainer"], td[class="cell"] { width: 100% !important; height:auto !important;}td[class="specbundle"] { width: 100% !important; float:left !important; font-size:13px !important; line-height:17px !important; display:block !important; padding-bottom:15px !important;}td[class="specbundle2"] { width:90% !important; float:left !important; font-size:14px !important; line-height:18px !important; display:block !important; padding-left:5% !important; padding-right:5% !important;} td[class="specbundle3"] { width:90% !important; float:left !important; font-size:14px !important; line-height:18px !important; display:block !important; padding-left:5% !important; padding-right:5% !important; padding-bottom:20px !important;} td[class="spechide"] { display: !important;} img[class="banner"] { width: 100% !important; height: auto !important;} td[class="left_pad"] { padding-left:15px !important; padding-right:15px !important;} .font { font-size:22px !important; line-height:26px !important;}}.order_box {  border-radius: 8px;  color: #fff;  margin: 5px;  min-height: 90px;  font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;}.padd15 td{padding: 6px;}.order_box h1 {  font-size: 14px;  margin: 0 0 20px;  padding: 0;  text-transform: uppercase;  line-height:1.1;  font-weight:500;  text-align:left;}.order_box img {  margin: 0 10px 0 0;  vertical-align: middle;}.order_box h2 {  font-size: 17px;  font-weight: 700;  line-height: 35px;  margin: 0;  padding: 0;  text-align: right;}.order_box.yellow {  background-color: #f9bf3b;}.order_box.purple {  background-color: #3c497f;}.order_box.red {  background-color: #f15d5d;}.card .col-lg-3{width:50%;float:left;}.title {  border-bottom: 2px solid #00a952;  text-transform: uppercase;}.maillist {  float: right;  list-style: outside  ;  margin: 0;  padding: 0;}.maillist li {  color: #6e8091;  display: inline-block;  font-size: 16px;  margin: 0 5px;}.maillist li a {  border-radius: 8px;  color: #6e8091;  font-weight: 700;  padding: 6px 16px;}.maillist li a:hover, .maillist li a.active {  background: #00a952  repeat scroll 0 0;  color: #fff;  text-decoration: ;}.title img {  margin: 0 10px 0 0;  vertical-align: middle;}.tab-content {  font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;}.tab-content > .active {  display: block;  visibility: visible;}.table2 {  color: #6e8091;  font-size: 14px;font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;}.table2 td {  border-top: 1px solid #ecf1f7 !important;  padding: 15px;  text-align: left;  vertical-align: top;}.tab-content th, .tab-content td {  padding: 15px 10px 15px 20px;}.tab-content td {  border-bottom: 1px solid #f1f5f9 !important;  color: #6e8091;}.table2 td img {  float: left;  height: 60px;  margin-left: 2px;  width: 60px;}.tab-content td:last-child, .table2 td:last-child {  text-align: right;}.tasktable{margin:10px 0;}.tasktable th, .tasktable td{border:1px solid #ccc !important; font-family:Helvetica,Arial,sans-serif; font-size: 14px; vertical-align: top;}@media only screen and (max-width:500px) {.overflow{overflow-x:auto}}@media only screen and (max-width:470px) {.card .col-lg-3{width:100%;}.table2 td { padding: 7px;}.table2 {font-size: 9px;}.title {font-size: 15px;}.maillist li {font-size: 14px; margin: 5px 5px 0;}.maillist li a {padding: 6px 10px;}} </style></head><body style="margin:0;"><table cellpadding="0" cellspacing="0" border="0" width="100%" class="bgBody" align="center">  <!--content starting-->  <tr>    <td><table width="670" border="0" cellspacing="0" cellpadding="0" align="center" class="MainContainer" bgcolor="#ffffff">   <tr><td class="movableContentContainer" style="font-size:16px; line-height:24px; ">  <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">    <table width="100%" border="0" cellspacing="0" cellpadding="0"  class="bgBody"> <tbody>   <tr><td colspan="2" height="40"></td>   </tr>   <tr><td colspan="3" align="center"><span style="line-height: 20px; font-size: 10px;  text-align: center; padding-bottom: 10px;"> <a href="javascript:;"><img alt="logo" src="https://www.free-css.com/assets/files/free-css-templates/preview/page263/mind/assets/images/logo.png" border="0" width="100px"></a>&nbsp;</span></td>   </tr> </tbody>    </table>  </div>  <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">    <table width="100%" border="0" cellspacing="0" cellpadding="0"  class="bgBody"> <tbody>   <tr  bgcolor="#ffffff"><td colspan="2" height="40"></td>   </tr>   <tr  bgcolor="#ffffff"><td colspan="3"><h1 style="font-family: Helvetica,Arial,sans-serif; font-weight: bold; padding: 0px; margin: 0px; line-height: 43px; text-align: center; color: #08bf6e; font-size: 35px;"> Hi '+fname+'! </h1>  <br>  <div style="background-color:#e7e7e7;height:4px;width:70px;margin:0 auto;text-align:center;"></div>  <br>';

            body += '<p style="font-family:Helvetica,Arial,sans-serif;color:#4f4f4f;font-size:16px;font-weight:600;line-height:20px;padding:0;margin:0 10px 10px;text-align:left;">Your Username and Password</p>';

            body += '<table class="tasktable" width="100%" border="1" bordercolor="#ccc" cellspacing="0" cellpadding="5" bgcolor="#f9f9f9">';
            body += '	<tbody>';
            body += '   <tr>';
            body += '   <th>Url</th>';
            body += '   <th>Username</th>';
            body += '   <th>Password</th>';
            body += '   </tr>';

            body += ' <tr>';
            body += ' <td style="text-align:center;"><a href="http://localhost:4200">http://localhost:4200</a></td>';
            body += '    <td style="text-align:center;">'+unam+'</td>';
            body += '    <td style="text-align:center;">'+npassword+'</td>';
            body += ' </tr> ';
            
            body += '    </tbody>';
            body += '</table>';
            body += '<p style="height:10px;"></p> ';
            body += '<p style="font-family:Helvetica,Arial,sans-serif;color:#4f4f4f;font-size:16px;font-weight:600;line-height:20px;padding:0;margin:0 10px;text-align:left;">Best Regards,</p> ';
            body += '<p style="font-family:Helvetica,Arial,sans-serif;color:#4f4f4f;font-size:16px;font-weight:600;line-height:20px;padding:0;margin:0 10px;text-align:left;">Mind Education</p> ';
            body += '<p style="height:20px;"></p> ';

        const mailOptions  = {
            from : 'atuljvaghasiya2@gmail.com',
            to   :  req.body.email,
            subject : 'Welcome',
            html : body
        };
        // transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //         return res.send("Mail Send Succesfully");
        //     }
        // });
        res.json(outputJson);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
};

exports.loginUser = async (req, res) => {
   
    // Check user Email and password in database

    const user = await userModel.findOne({
        email : req.body.email,
        password: md5(req.body.password)
    });

    if(!user)
    {
        outputJson  = {code: 400, status: "faild", message: 'Email is wrong'};
        return res.json(outputJson);
    }
    
    if(md5(req.body.password) != user.password)
    {  
        outputJson  = {code: 400, status: "faild", message: 'Invalid Password'};
        return res.json(outputJson);
    }
    
    if(user.role == 'student')
    {
        outputJson  = {code: 400, status: "faild", message: 'Invalid Role'};
        return res.json(outputJson);  
    }

    // Assign Token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    
    // Update Token database
    const data = await userModel.findOneAndUpdate(
        {_id: user._id},
        {
          loginToken: token,
        },
    );
    res.setHeader("Access-Control-Expose-Headers", "token");
    res.setHeader("token",data.loginToken); 
    outputJson  = {email:data.email,token:token,code: 200, status: "Success", message: 'Login Success'};
    res.json(outputJson);
};

exports.frountloginUser = async (req, res) => {
   
    // Check user Email and password in database

    const user = await userModel.findOne({
        email : req.body.email,
        password: md5(req.body.password)
    });

    if(!user)
    {
        outputJson  = {code: 400, status: "faild", message: 'Email is wrong'};
        return res.json(outputJson);
    }
    
    if(md5(req.body.password) != user.password)
    {  
        outputJson  = {code: 400, status: "faild", message: 'Invalid Password'};
        return res.json(outputJson);
    }
    
    if(user.role == 'teacher' || user.role == 'admin')
    {
        outputJson  = {code: 400, status: "faild", message: 'Invalid Role'};
        return res.json(outputJson);  
    }

    // Assign Token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    
    // Update Token database
    const data = await userModel.findOneAndUpdate(
        {_id: user._id},
        {
          loginToken: token,
        },
    );
    res.setHeader("Access-Control-Expose-Headers", "token");
    res.setHeader("token",data.loginToken); 
    outputJson  = {email:data.email,token:token,code: 200, status: "Success", message: 'Login Success'};
    res.json(outputJson);
};

// User Details Data

exports.get_user_detail = async(req,res,next) => {
    let where    = {role:req.query.role,isDeleted: false}
    let result   = await userModel.find(where);
    outputJson   = { code: 200, status: "Success", message: 'User Data List successfully.', result: result};
    res.json(outputJson);
};

exports.getuserWithid = async(req, res) => {
    var postData = req.body;
	let where    = {_id:postData.id,isDeleted: false}
    let result   = await userModel.findOne(where);
    outputJson = { code: 200, status: "Success", message: 'User Data List successfully.', result: result};
    res.json(outputJson);
};

exports.getuserprofile = async(req, res) => {
    var postData = req.body;
	let where    = {loginToken:postData.token,isDeleted: false}
    let result   = await userModel.findOne(where);
    outputJson = { code: 200, status: "Success", message: 'User Data List successfully.', result: result};
    res.json(outputJson);
};

// Edit User

exports.editUserdata = async (req, res) => {
    try {
        let result = await userModel.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            req.body
        );
        outputJson = { code: 200, status: "Success", message: 'Update User successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

// Delete User

exports.deletelistuser = async (req, res) => {
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    try {
        let result = await userModel.findOneAndUpdate(where, {
        isDeleted: true,
        });     
        outputJson = { code: 200, status: "Success", message: 'Update User successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
    
};

exports.editUserdata = async (req, res) => {
      const rurl = req.body.role;
    try {
        let result = await userModel.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            req.body
        );
        outputJson = { code: 200, status: "Success", redirection: rurl,  message: 'Update User successfully.', result: result};
        res.json(outputJson);
    } catch (error) {
        res.status(400).json(failAction(error.message));
    }
};

/**************** Change Password ***********/

exports.changepassword = async (req, res) => {

    // Check Email exists
    
    const userdata = await userModel.findOne({
        loginToken : req.body.token
    });

    if(md5(req.body.old_password) != userdata.password)
    {  
        outputJson  = {code: 400, status: "faild", message: 'Old Password Not Match'};
        return res.json(outputJson);               
    }
    
    if(req.body.new_password != req.body.confirm_password)
    {
        outputJson  = {code: 400, status: "faild", message: 'Conform Password Not Match'};
        return res.json(outputJson);
    }

    // Convert Password Md5
    const newpassword = md5(req.body.confirm_password);
    try
    {
        const userdata = await userModel.findOneAndUpdate(
            {loginToken: req.body.token},
            {
                password: newpassword,
            },
        );
        outputJson = {code: 200, status: "Success", message: 'Passwprd Update Successfully'};
        res.json(outputJson);
    }
    catch(error)
    {
        outputJson = {code: 400, status: "faild", message: 'Passwprd Update Faild'};
        res.json(outputJson);
    }
};

/*************** Forger Password  **************/

exports.forgetPassword = async (req, res,next) => {
    // Get User By Email
    const user = await userModel.findOne({
        email : req.body.email
    });

    if(!user)
    {
        outputJson  = {code: 400, status: "faild", message: 'User not exits this email address'};
        return res.json(outputJson);
    }

    // Generate By Token
    const token = jwt.sign({_id: user._id},process.env.RESET_PASSWORD_KEY);

    const npassword   = generatePassword(10, false, /[\w\d\?\-]/);
    const newpassword = md5(npassword);
    const userdata    = await userModel.findOneAndUpdate(
        {email: req.body.email},
        {
            password: newpassword,
        },
    );
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'atuljvaghasiya2@gmail.com',
            pass: '99atul99'
        } 
    });
    const mailOptions  = {
        from : 'atuljvaghasiya2@gmail.com',
        to   :  req.body.email,
        subject : 'Reset Password',
        html : '<h2>New Password :- <strong>'+npassword+'</strong></h2>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            outputJson = {code: 400, status: "Success", message: 'Mail Send Faild'};
            res.json(outputJson);
        } else {
            outputJson = {code: 200, status: "Success", message: 'Mail Send Succesfully'};
            res.json(outputJson);
        }
    });
    
};

exports.resetPassword = async (req, res,next) => {
    const { resetLink, newpass } = req.body;
    let finduser = {
        resetLink: resetLink,
    };
    const otpPayload = await userModel.findOne(finduser);
    if(!otpPayload)
    {
        return res.status(400).send("User not exits this email address");
    }

    let resPayload = await userModel.findOneAndUpdate(
        finduser,
        {
          password: newpass,
          resetLink: "",
        },
    );
        
    if(resPayload != null)
    {
        return res.send("Password Reset Succesfully");   
    }
};
