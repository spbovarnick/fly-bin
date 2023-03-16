// req modules --------------------------------------------------------------------
require('dotenv').config();
const path = require('path');
const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const methodOverride = require('method-override');


// require the routes in the controllers folder ----------------------------------
const fliesCtrl = require('./controllers/flies');
const notesCtrl = require('./controllers/notes');

// require the db connex, models, seed data ----------------------------------
const db = require('./models');

// create express app ---------------------------------------------------
const app = express();
// body parser: used for POST/PUT/PATCH routes: takes incoming strings from body that are URL encoded and parses them into object that can be accessed in req param as property called body (req.body)
app.use(express.urlencoded({ extended: true }));
// override POST reqs from browser as diff request type
app.use(methodOverride('_method'))





// config app to refresh browser when nodemon restarts, god bless livereload
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before pg refresh
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});



// config the app (app.set) ---------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// middleware (app.use)
// directs to static assets/files
app.use(express.static('public'));
// use the connect livereload pkg to connect nodemon && livereload
app.use(connectLiveReload());


// mount routes ---------------------------------------------------

// home/landing page
app.get('/', function (req, res) {
    // res.send('made it home')
    db.Fly.find({})
        .then(flies => {
            res.render('home', {
                flies: flies
            })
        })
})

app.get('/about', (req, res) => {
    res.render('about')
})


/* SEARCH ROUTE
adapted from DevSprout https://www.youtube.com/watch?v=9_lKMTXVk64,
and Code Step By Step https://www.youtube.com/watch?v=bIWZ8EnLk54
------------------------------------------------------*/
app.get("/search", (req, res) => {
    console.log(req.query.query)
    db.Fly.find({

        $or: [
            { name: {$regex: req.query.query, $options: 'ix'} },
            { ingredients: {$regex: req.query.query, $options: 'ix'} },        
            { type: {$regex: req.query.query, $options: 'ix'} },
            { imitating: {$regex: req.query.query, $options: 'ix'} }
        ]
    })
        .then(flies => res.render(`fly-index`, {
            flies: flies
        }))
})


app.get('/seed', function(req, res) {
    // remove existing seed data
    db.Fly.deleteMany({})
        .then(removedFlies => {
            db.Fly.insertMany(db.seedFlies)
                .then(addedFlies => {
                    console.log(`Added ${addedFlies.length} flies`)
                    res.json(addedFlies)
                })
            console.log(`Removed ${removedFlies.length} flies`)
            
            // seed fly collection with data
        })
})

// tell app to look to 'controllers' to handle routes that begin /flies or /notes
app.use('/flies', fliesCtrl);
app.use('/notes', notesCtrl);

app.get('*', function(req, res) {
    res.send(`404: can't find what you're looking 4`)
})

app.listen(process.env.PORT, function() {
    console.log(`Express is listening to port ${process.env.PORT}`)
})