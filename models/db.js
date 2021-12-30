//initiated mangoose to create db connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser : true }, (err) => {
    if(!err){
        console.log("MongoDB Database Connection Success");
    }
    else{
        console.log("The Error is" + err);
    }
});

//after connection , adding exported model here
require('./employee.model');