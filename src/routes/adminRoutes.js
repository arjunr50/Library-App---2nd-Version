const express = require("express");
const adminRouter = express.Router();
const Bookdata = require('../model/Bookdata');
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

    adminRouter.get('/', (req, res) => {
        res.render('addbook', {
            nav,
            title: 'Library'
        });
    });
    adminRouter.post('/add', upload.single('image'), async (req, res) => {
        let item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            link: req.body.link,
            blurb: req.body.blurb,
            image: req.file.filename,
        }
        var book = Bookdata(item);
        book.save();
        res.redirect('/books');

        var itemAuth = {
            author: req.body.author,
            title: req.body.title,
            genre: req.body.genre,
            link: req.body.link,
            desc: req.body.desc,
            image: req.file.filename
        }
        var author = Authordata(itemAuth);
        author.save();

    });

    adminRouter.get('/edit/:id', (req, res) => {
        const id = req.params.id;
        Bookdata.findOne({ _id: id })
            .then(function (book) {
                res.render('addbookedit', {
                    nav,
                    title: 'Update Book',
                    book
                });
            });
    });

    adminRouter.post('/update/:id', upload.single('image'), async (req, res) => {
        const id = req.params.id;
        var item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            link: req.body.link,
            blurb: req.body.blurb,
            image: req.file.filename,

        }

        Bookdata.findByIdAndUpdate({ _id: id }, item, function (req, res) {

        });
        res.redirect('/books')
    });

    adminRouter.get('/delete/:id', (req, res) => {
        const id = req.params.id;
        Bookdata.deleteOne({ _id: id })
            .then(function (book) {

                res.redirect('/books');
            });
    });

    adminRouter.get('/editauthor/:id', (req, res) => {
        const id = req.params.id;
        Authordata.findOne({ _id: id })
            .then(function (author) {
                res.render('addauthoredit', {
                    nav,
                    title: 'Update Author',
                    author
                });
            });
    });

    adminRouter.get('/deleteauthor/:id', (req, res) => {
        const id = req.params.id;
        Authordata.deleteOne({ _id: id })
            .then(function (author) {

                res.redirect('/authors');
            });
    });

    adminRouter.post('/updateAuthor/:id', upload.single('image'), async (req, res) => {
        const id = req.params.id;
        var item = {

            author: req.body.author,
            title: req.body.title,
            genre: req.body.genre,
            link: req.body.link,
            desc: req.body.desc,
            image: req.file.filename
        };
        Authordata.findByIdAndUpdate({ _id: id }, item, function (req, res) {
        });
        res.redirect('/authors');
    });

    return adminRouter;
}

module.exports = router;