//Accessing mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('localhost:27017/LibraryApp');

//schema definition
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    author: String,
    title: String,
    genre: String,
    desc: String,
    link: String,
    image: String,

});

//Model creation
var Authordata = mongoose.model('authordata', AuthorSchema);
module.exports = Authordata;