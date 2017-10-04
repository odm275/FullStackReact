const mongoose = require('mongoose');
const { Schema } = mongoose;// same as mongoose.schema; Set schema = mongoose.schema

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);