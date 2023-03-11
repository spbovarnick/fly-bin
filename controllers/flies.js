// require modules
const express = require('express');
// router allows routing outside server.js
const router = express.Router()

// req the db connex and models
const db = require('../models')

/* routes 
----------------------------------------*/
router.get('/', (req, res) => {
    res.send('made it')
})


router.get('/new', (req, res) => {
    res.send(`add flies page`)
})

// edit route (GET/Read) renders form to edit/PUT fly properites
router.get('/:flyId/edit', (req, res) => {
    db.Fly.findById(req.params.flyId)
        .then(fly => {res.send(`you're going to edit ${fly.name}`)})
})

router.get('/:flyId', (req, res) => {
    db.Fly.findById(req.params.flyId)
        .then(fly => {
            // const flatList = []
            // for (let note of fly.notes) {
            //     flatList.push(note)
            // }
            res.json(fly)
        })
})

// add fly, create POST
router.post('/', (req, res) => {
    db.Fly.create(req.body)
        .then(fly => {
            res.json(fly)
        })
})



// export routes to be accessible in server.js
module.exports = router