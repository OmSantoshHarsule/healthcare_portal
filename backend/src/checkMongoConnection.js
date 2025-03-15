// Simple script to check MongoDB connection status
require("dotenv").config();
var mongoose = require("mongoose");
// Get MongoDB URI from environment variables
var MONGODB_URI = process.env.MONGODB_URI;
console.log("Attempting to connect to MongoDB...");
console.log("Connection string: ".concat(MONGODB_URI.replace(/\/\/([^:]+):[^@]+@/, "//***:***@"))); // Hide password in logs
// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(function () {
    console.log('✅ Successfully connected to MongoDB');
    console.log('Connection state:', mongoose.connection.readyState);
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    // Check database information
    var db = mongoose.connection.db;
    if (db) {
        console.log('Connected to database:', mongoose.connection.name);
        // List collections
        db.listCollections().toArray()
            .then(function (collections) {
            console.log('Collections in database:');
            collections.forEach(function (collection) {
                console.log("- ".concat(collection.name));
            });
            // Close connection and exit
            mongoose.connection.close()
                .then(function () {
                console.log('MongoDB connection closed');
                process.exit(0);
            });
        })["catch"](function (err) {
            console.error('Error listing collections:', err);
            process.exit(1);
        });
    }
    else {
        console.log('Database information not available');
        process.exit(0);
    }
})["catch"](function (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('Connection state:', mongoose.connection.readyState);
    process.exit(1);
});
