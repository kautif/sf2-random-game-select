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
const PORT = process.env.PORT || 3001;

const express = require('express');
// const cors = require("cors");
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./Auth");

const app = express();

// Connect to mongodb
const dbURI = 'mongodb+srv://test-user:testtest@cluster0.60anv.mongodb.net/sf-app?retryWrites=true&w=majority'

//Connect with our db
mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}, (err, connection) => {
if(err) {
console.error(err)
return
}    
console.log('Connected to DB');
    app.listen({ port: PORT }, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    })})

mongoose.set('useNewUrlParser', true);
mongoose.set("useFindAndModify", false);
mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

const path = require('path');

app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    resave: false,
    saveUninitialized: false, 
    secret: 'foo',
    store: MongoStore.create({ 
      mongoUrl:dbURI,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cors());

const Authentication = require("./routes/Auth");
const User = require("./routes/User");

//Using routers
app.use("/auth", Authentication);
app.use("/user", User);

// app.use(express.static(__dirname));
// app.get("/api", (req, res) => {
//     // res.json({message: "Hello from server"});
//     res.sendFile(path.join(__dirname+'/api.html'));
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// })