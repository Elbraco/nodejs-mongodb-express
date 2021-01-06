const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: 'Insert Employee'
    })
});

router.post('/', (req, res) => {
    // console.log(req.body);
    if (req.body._id == '') {
        console.log('new user');
        insertRecord(req, res);
    } else {
        console.log('modified');
        updateRecord(req, res);

    }
});

function insertRecord(req, res) {
    const employee = new Employee();
    employee.fullName = req.body.fullName
    employee.Email = req.body.Email
    employee.Mobile = req.body.Mobile
    employee.City = req.body.City
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            if(err.name == 'handleValidationError'){
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Insert Employeeees',
                    employee: req.body
                })
            } else {

                console.log('Error during record: ' + err);
            }
        }
    });
    
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, {new: true}, (err, doc) => {
        if(!err) {
            res.redirect('employee/list');
        } else {
            console.log('Probleme');
        }
    });
}

router.get('/list', (req, res) => {
    // res.json('from list')
    Employee.find((err, docs) => {
        if(!err) {
            res.render('employee/list', {
                list: docs
            });
        } else {
            console.log('Eroor employee list:' + err);
        }
    });
});

function handleValidationError(err, body) {
    for(field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                 body['fullNameError'] = err.errors[fields].message;
                 break;
            default:
                break;
        }
    }
    console.log(err, body);
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.render('employee/addOrEdit', {
                viewTitle: 'Update Employee',
                employee: docs
            });
        };
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.redirect('/employee/list');
        } else {
            console.log('Probleme delete');
        };
    });
});


module.exports = router;