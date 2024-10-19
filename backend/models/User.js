const mongoose = require('mongoose')
const CustomerSchema = new mongoose.Schema({
    username : {type: String, required : true},
    email: {type: String, required : true, unique:true},
    number: {type: String, required : true},
    address: {type: String, required : true},
    password: {type: String, required : true}
})
const Customer = mongoose.model('Customer', CustomerSchema)
module.exports = Customer;
