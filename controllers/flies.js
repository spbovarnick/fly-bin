// require modules
const express = require('express');
// router allows routing outside server.js
const router = express.Router()

// req the db connex and models
const db = require('../models')


/* routes 
----------------------------------------*/
router.get('/', (req, res) => {
    res.redirect('/')
})

// new route GET req that renders add fly form
router.get('/new', (req, res) => {
    res.render(`fly-form`)
})

// increment  quantity route
router.put('/:flyId/increment-qty', (req, res) => {
    db.Fly.findByIdAndUpdate(
        req.params.flyId,
        req.body = { $inc: { quantity: +1 }},
        { new: true }
        )        
            .then(fly => {
                res.redirect(`/flies/${fly.id}`)          
            })
})

// decrement quantity route
router.put('/:flyId/decrement-qty', (req, res) => {
    db.Fly.findByIdAndUpdate(
        req.params.flyId,
        req.body = { $inc: { quantity: -1 }},
        { new: true }
    )   
        .then(fly => {
            res.redirect(`/flies/${fly.id}`)          
        })
        
})

// edit route (GET/Read) renders form to edit/PUT fly properites
router.get('/:flyId/edit', (req, res) => {
    db.Fly.findById(req.params.flyId)
        .then(fly => res.render('edit-form', {
            fly: fly
        }))
  
})

// update route receives PUT req from edit route, edits properties using form data, redirects back to show/details page with updated info
router.put('/:flyId', (req, res) => {
    db.Fly.findByIdAndUpdate(
        req.params.flyId,
        req.body,
        { new: true }
    )
        .then(fly => res.json(fly))
})


// show route
router.get('/:flyId', (req, res) => {
    db.Fly.findById(req.params.flyId)
        .then(fly => {
            const flatList = []
            for (let note of fly.notes) {
                flatList.push(note)
            }
            res.render("fly-detail", { 
                fly: fly,
                notes: flatList
            })
        })
})



// add fly, create POST
router.post('/', (req, res) => {
    db.Fly.create(req.body)
        .then(fly => {
            const flatList = []
            for (let note of fly.notes) {
                flatList.push(note)
            }
            res.redirect(`/flies/${fly.id}`)
        })
})

// destroy DELETE route
router.delete('/:flyId', (req, res) => {
    db.Fly.findByIdAndRemove(req.params.flyId)
        .then(res.redirect(`/flies`))
})


// export routes to be accessible in server.js
module.exports = router