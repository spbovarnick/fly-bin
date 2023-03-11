// req mongoose pkg
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    dateFished: { type: Date },
    airTemp: { type: Number },
    waterTemp: { type: Number },
    conditions: { type: String },
    note: { type: String, required: true }
},
{ timestamps: true})

module.exports = noteSchema;