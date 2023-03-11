// require modules
const express = require('express');
// router allows routing outside server.js
const router = express.Router()

// req the db connex and models
const db = require('../models')

/* routes 
----------------------------------------*/


// export routes to be accessible in server.js
module.exports = router