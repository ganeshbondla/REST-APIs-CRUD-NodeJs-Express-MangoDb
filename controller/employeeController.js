//exporing require things (express and response from express)
const express = require('express');
const res = require('express/lib/response');

//exporting router from express
var router = express.Router();

// exporting employee object created in models/employee.model
const Employee = require('../models/employee.model');

//getting all list of employees from db (GET)
router.get('/', async(req, res) => {
    try{

       await Employee.find((err, data) => {
        if(err)
        {
            res.status(404);
            res.json({
                valid : false,
                msg : "No Employees Found! :-("
            });
        }
        else
        {
            res.json({
                valid : true,
                data
            })
        }
       })

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

        await newData.save((err,data) => {
            if(err)
            {
                res.status(400);
                res.json({
                    valid : false,
                    msg : "Error, Employee Not Inserted"
                })
            }
            else
            {
                res.json({
                    valid : true,
                    data
                })
            }
        })
        
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
    
    try{

        await Employee.findById(req.params.id, (err, employeeData) => {
            if(err)
            {
                res.status(404);
                res.json({
                    valid : false,
                    msg : `Sorry :-( User ${req.params.id} Not in Our database`
                });
            }
            else
            {
                res.json({
                    valid : true,
                    employeeData
                });
            }
        })
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
//hear im updating only fullname just to understand.
router.patch('/:id', async(req, res) => {
    try{

        await Employee.findByIdAndUpdate(req.params.id, (err, data) =>{
            if(err)
            {
                res.status(400);
                res.json({
                    valid : false,
                    msg : err
                })
            }
            else
            {
                const patchData = Employee.findByIdAndUpdate(req.params.id);
                patchData.fullName = req.body.fullName;
                const updatedData = patchData.save();
                res.json({
                    valid : true,
                    updatedData
                })
            }
        })

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
    try{
        const deleteEmployee = await Employee.findById(req.params.id);

        if(deleteEmployee == null)
        {
            res.status(404);
            res.json({
                valid : false,
                msg : `Sorry :-( User ${req.params.id} Not in Our database`
            })
        }
        else
        {
            const empDelete = await Employee.deleteOne(req.params.id);
            res.json({
                valid : true,
                msg : `Hoolaa :-) User ${req.params.id} employee deleted success`
            });
        }

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