const mongoose = require('mongoose')
const HospitalSchema = new mongoose.Schema({
    name : {type: String, required : true},
    email: {type: String, require: true, unique: true},
    address: {type: String, required : true},
    number: {type: String, required : true},
    password: {type: String, required : true},
    specialization: {type: String, required : true},
    capacity:{type: String, require: true}
})
const Hospital = mongoose.model('Hostital', HospitalSchema)
module.exports = Hospital;