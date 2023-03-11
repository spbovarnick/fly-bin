const express = require('express')
const router = express.Router()

const db = require('../models')

/* ROUTES
----------------------------------------------------------*/
// new route: GET
router.get('/new/:flyId', (req, res) => {
    db.Fly.findById(req.params.flyId)
        .then(fly => {
            res.send(`you've reached the new route. you'll be making a note of fly ${req.params.flyId}`)
        })
})

// create route: POST
router.post('/create/:flyId', (req, res) => {
    db.Fly.findByIdAndUpdate(
        req.params.flyId,
        { $push: { notes: req.body }},
        { new: true }
    )
    .then(fly => res.redirect('/fly/' + fly.id))
})


// export routes to be accessible in server.js
module.exports = router