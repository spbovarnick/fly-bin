const express = require('express')
const router = express.Router()

const db = require('../models')

/* ROUTES
----------------------------------------------------------*/
// show route GET 
router.get('/:noteId', (req, res) => {
    db.Fly.findOne(
        { 'notes._id': req.params.noteId },
        { 'notes.$': true, _id: false }
    )
        .then(note => res.json(note))
})

// new route: GET
router.get('/new/:flyId', (req, res) => {
    db.Fly.findById(req.params.flyId)
        .then(fly => {
            res.render(`note-form`, {
                fly: fly
            })
        })
})

// create route: POST
router.post('/create/:flyId', (req, res) => {
    db.Fly.findByIdAndUpdate(
        req.params.flyId,
        { $push: { notes: req.body }},
        { new: true }
    )
    .then(fly => res.redirect(`/flies/${fly.id}`))
})

// destroy DELETE route
router.delete('/:noteId', (req, res) => {
    db.Fly.findOneAndUpdate(
        { 'notes._id': req.params.noteId },
        { $pull: { notes: {_id: req.params.noteId}}},
        { new: true }
    )
        .then(res.send(`you deleted the  ${req.params.noteId}`))
})


// export routes to be accessible in server.js
module.exports = router