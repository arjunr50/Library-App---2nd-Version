//Accessing mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('localhost:27017/LibraryApp');

//schema definition
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    link: String,
    blurb: String,
    image: String

});

//Model creation
var Bookdata = mongoose.model('bookdata', BookSchema);
module.exports = Bookdata;