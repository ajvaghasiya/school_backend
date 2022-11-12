const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors     = require("cors");
dotenv.config();

// Connect to db

mongoose.connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },(err) => {
    if(err) {
      console.log('connection err', err);
    } else {
      console.log('Database connected');
    }
});

// import routes
const userRoutes    = require("./routes/others/user");
const userdetail    = require("./routes/others/get_user_detail");
const subjectdetail = require("./routes/subject/subject");
const classdetail   = require("./routes/class/class");
const examdetail    = require("./routes/exam/exam");
const boarddetail   = require("./routes/dashboard/dashboard");

app.use(express.json());
app.use(cors());
app.use("/api/users",userRoutes)
app.use("/api/users_details",userdetail)
app.use("/api/subject",subjectdetail)
app.use("/api/class",classdetail)
app.use("/api/exam",examdetail)
app.use("/api/dashboard",boarddetail)

app.listen(1992,() => console.log("App running in port 1992 !"));