const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String
});
module.exports = userSchema;