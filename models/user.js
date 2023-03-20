// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the users collection
const userSchema = new mongoose.Schema({
  name: String
}, {
  timestamps: true
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('User', userSchema);
