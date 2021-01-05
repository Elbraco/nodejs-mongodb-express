const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err) {
        console.log('MongoDb Connected');
    } else {
        console.log('Error Connection');
    }
})

require('./employee.model');