const express = require("express");
const addauthorRouter = express.Router();
const Authordata = require('../model/Authordata');
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
    addauthorRouter.get('/', function (req, res) {
        res.render('addauthor', { nav, title: "Add Author" });
    });

    addauthorRouter.post('/adda', upload.single('image'), async (req, res) => {
        var item = {
            author: req.body.author,
            title: req.body.title,
            genre: req.body.genre,
            link: req.body.link,
            desc: req.body.desc,
            image: req.file.filename,
        }

        var author = Authordata(item);
        author.save();//saving to database
        res.redirect('/authors');

    });
    return addauthorRouter;
}

module.exports = router;