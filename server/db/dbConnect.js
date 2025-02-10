const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect () {
    mongoose.connect(
        process.env.REACT_APP_NODE_BACKEND
    ).then(() => {
        console.log("connected to DB");
    }).catch((error) => {
        console.log("db connection failed");
        console.error(error);
    })
}

module.exports = dbConnect;