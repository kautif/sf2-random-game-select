// Pages
    // Home Page
        // Default to if not logged in
    // Registration
    // Login
    // Dashboard
        // Default to if logged in and cookie found
        // Go to title screen
        // Go to selector
        // Add Game
            // Title
                // Find title via API
                // If no title found, require manual entry
            // Image
                // Find image based on title
                // If title is not found, require user to upload image
                    // Set dimension requirements on image, 
                        // If not met, compress and size image down to reqd dimensions
            // Votes
                // Must be 1 or more votes
        // Edit Game
        // Remove Game
const PORT = process.env.PORT || 4000;

const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const session = require("express-session");
const bodyParser = require('body-parser');
// const MongoStore = require("connect-mongo");
// const passport = require("./Auth");

// Connect to mongodb
const dbURI = 'mongodb+srv://test-user:testtest@cluster0.60anv.mongodb.net/sf-app?retryWrites=true&w=majority';

mongoose.connect(
    dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Mongoose connected");
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000/",
    credentials: true
}))

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(cors({
//     origin: `http://localhost:${PORT}`,
//     credentials: true
// }))

app.use(session({
    secret: 'foo',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser("foo"));
app.use(passport.initialize());
app.use(passport.session());
require('./Auth/passportConfig')(passport);


app.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.send("User doesn't exist");
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                }
                res.send("Authenticated");
                console.log(`Logged in ${req.user}`);
            })
        }
    })(req, res, next);
})

app.post('/register', (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) {
            throw err;
        } 
        if (doc) {
            res.send("User Already Exists");
        }
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            });
            await newUser.save();
            res.send("User Created");
        }
    })
})

app.post('/user', (req, res) => {
    console.log(req.body);
})

// app.use(
//     session({
//       resave: false,
//       saveUninitialized: false, 
//       secret: 'foo',
//       store: MongoStore.create({ 
//         mongoUrl:dbURI,
//       }),
//     })
//   );

  app.listen({ port: PORT }, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})


//Connect with our db
// mongoose.connect(dbURI, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
// }, (err, connection) => {
// if(err) {
// console.error(err)
// return
// }    
// console.log('Connected to DB');
//     app.listen({ port: PORT }, () => {
//         console.log(`Server running at http://localhost:${PORT}`);
//     })})

// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

// const path = require('path');