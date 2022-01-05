//exporing require things (express and response from express)
const express = require('express');
const res = require('express/lib/response');

//exporting router from express
var router = express.Router();

// exporting employee object created in models/employee.model
const Employee = require('../models/employee.model');

//getting all list of employees from db (GET)
router.get('/', async(req, res) => {
    try
    {
        const data = await Employee.find();
        res.json({
            valid : true,
            data
        });

    }
    catch(err)
    {
        res.status(500);
        res.json({
            valid : false,
            msg : err
        })
    }
});

// adding new employee to db (POST)
router.post('/', async(req, res) => {

    try
    {

        const newData = new Employee({
            fullName : req.body.fullName,
            email : req.body.email,
            mobile : req.body.mobile,
            city : req.body.city  
          })

          const data = await newData.save();
          res.json({
            valid : true,
            data
          });
        
    }
    catch(err)
    {
        res.status(500);
        res.json({
            valid : false,
            msg : err
        })
    }
});

//getting only single employee by employeeID (GET)
router.get('/:id', async(req, res) => {
    
    try
    {
        
        const data = await Employee.findById(req.params.id);
        res.json({
            valid : true,
            data
        });

    }
    catch(err) 
    {
        res.status(500);
        res.json({
            valid : false,
            msg : err
        })
    }
});

//Updating fullname of existing employee in DB by employeeID (PATCH)
//here im updating only fullname just to understand.
router.patch('/:id', async(req, res) => {
    try{

        const patchData = await Employee.findById(req.params.id);
        patchData.fullName = req.body.fullName;
        const updateData = await patchData.save();
        res.json({ 
            valid : true,
            updateData
        });

    }
    catch( err )
    {
        res.status(500);
        res.json({
            valid : false,
            msg : err
        })
    }
});

//deleting single employee by emploeeId (DELETE)
router.delete('/:id', async(req, res) => {
    try
    {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({
            valid : true,
            msg : `Hoolaa :-) User ${req.params.id} employee deleted success`
        });

    }
    catch ( err )
    {
        res.status(500);
        res.json({
            valid : false,
            msg : err
        })
    }
});

//exporting router to models
module.exports = router;