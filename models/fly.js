// req mongoose pkg
const mongoose = require('mongoose');
const noteSchema = require('./note');

const flySchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: String, required: false },
    hookSize: { type: Number, required: true },
    type: { type: String, required: true }, 
    imitating: { type: String, required: false },
    lifeStage: { type: String, required: false },
    photo: { type: String, required: false },
    quantity: { type: Number, required: true },
    notes: [noteSchema]
})

// index of searchable text in schema
flySchema.index({ 
    // name: "text",
    // ingredients: "text",
    hookSize: "text",
    // type: "text",
    // imitating: "text",
    // lifeStage: "text" 
});

// export schema as a mongoose model, accessible in 'models/index.js'
module.exports = mongoose.model('Fly', flySchema)