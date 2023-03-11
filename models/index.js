// require mongoose pkg + environment config
require('dotenv').config()
const mongoose = require('mongoose')
const mongodbUri = process.env.MONGODBURI;

// immediately invoked async that awaits mongoose connex to MongoDB Atlas
(async function () {
    await mongoose.connect(mongodbUri);
    console.log(`Mongoose is connect to ${mongodbUri}`)
})().catch(err => console.log('Connection error' + err))

module.exports = {
    Fly: require('./fly'),
    seedFlies: require('./seed')
}