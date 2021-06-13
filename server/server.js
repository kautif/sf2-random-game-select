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

const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({message: "Hello from server"});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

console.log("Hello");