var mongoose = require('mongoose');
var findOrCreate=require('mongoose-findorcreate');
var connect = process.env.MONGODB_URI;
var Schema = mongoose.Schema;

if (! process.env.MONGODB_URI) {
    console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
    process.exit(1);
}

mongoose.connection.on('connected', function() {
    console.log("connected to MongoDb!");
})
mongoose.connection.on('error', function() {
    console.log("error connecting to MongoDb");
    process.exit(1);
})

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    facebookId: String,
})

userSchema.plugin(findOrCreate);

// Step 2: Create all of your models here, as properties.
var User = mongoose.model("User", userSchema);


// Step 3: Export your models object
module.exports = {
  User: User,
}
