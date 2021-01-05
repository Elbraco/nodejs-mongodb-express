const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullName: { type: String, required: 'This field is required'},
    Email: { type: String},
    Mobile: { type: String},
    City: { type: String}
});

//VAlidate email

mongoose.model('Employee', employeeSchema);