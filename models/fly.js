// req mongoose pkg
const mongoose = require('mongoose');

const flySchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: String, required: false },
    type: { type: String, required: true }, 
    species: { type: String, required: false },
    lifestage: { type: String, required: true },
    photo: { type: String, required: true }
})

// export schema as a mongoose model, accessible in 'models/index.js'
module.exports = mongoose.model('Fly', flySchema)