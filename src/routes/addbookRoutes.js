const express = require("express");
const addbookRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const multer = require('multer')

const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
        callback(null, './public/uploads/images');
    },

    //add back the extension
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});

function router(nav) {
    addbookRouter.get('/', function (req, res) {
        res.render('addbook', { nav, title: "Add Book" });
    });

    addbookRouter.post('/add', upload.single('image'), async (req, res) => {
        var item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            link: req.body.link,
            blurb: req.body.blurb,
            image: req.file.filename,
        }

        var book = Bookdata(item);
        book.save();//saving to database
        res.redirect('/books');

    });

    return addbookRouter;
}

module.exports = router;