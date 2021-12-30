//initiated mangoose to create require object schema
const mongoose = require('mongoose');

//creating required schema with help of manoose
var employeeSchema = new mongoose.Schema({
    fullName : {
        type : String
    },
    email : {
        type : String
    },
    mobile : {
        type : String
    },
    city : {
        type : String
    }
});

//exporting created object as model of mangoose
module.exports = mongoose.model('Employee', employeeSchema);

