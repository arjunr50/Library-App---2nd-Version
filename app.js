const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
mongoose.connect('localhost:27017/LibraryApp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected")).catch((err) => { console.log(err); })
const methodOverride = require('method-override');
const port = process.env.PORT || 5000;
const nav = [
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authors' },
    { link: '/login', name: 'Log Out' }
];
const nav1 = [
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authors' },
    { link: '/addbook', name: 'Add Book' },
    { link: '/login', name: 'Log Out' }
];
const nav2 = [
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authors' },
    { link: '/addauthor', name: 'Add Author' },
    { link: '/login', name: 'Log Out' }
];
const nav3 = [
    { link: '/login', name: 'Login' },
    { link: '/signUp', name: 'Signup' }

];
var authors = [
    {
        title: 'Tom and Jerry',
        author: 'Joseph Barbera',
        genre: 'Cartoon',
        description: 'The series features comic fights between an iconic pair of adversaries, a house cat (Tom) and a mouse (Jerry). The plots of each short usually center on Tom and Jerry`s numerous attempts to have the best of each other and the mayhem and destruction that follows.',
        img: 'Joseph.jpeg'
    },
    {
        title: 'Harry Potter and the Sorcerer`s Stone',
        author: 'J K Rowling',
        genre: 'Fantasy, Adventure',
        description: 'When mysterious letters start arriving on his doorstep, Harry Potter has never heard of Hogwarts School of Witchcraft and Wizardry. They are swiftly confiscated by his aunt and uncle. Then, on Harry’s eleventh birthday, a strange man bursts in with some important news: Harry Potter is a wizard and has been awarded a place to study at Hogwarts. And so the first of the Harry Potter adventures is set to begin.',
        img: 'Rowling.jpg'
    },
    {
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
        genre: 'Novel, Drama, Historical Fiction, Bildungsroman',
        description: 'The unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father`s servant, The Kite Runner is a beautifully crafted novel set in a country that is in the process of being destroyed.',
        img: 'Khaled.jpg'
    },
    {
        title: 'The Lord of the Rings',
        author: 'J. R. R. Tolkien',
        genre: 'Novel, Fantasy Fiction, High fantasy, Chivalric romance, Adventure fiction, Heroic fantasy',
        description: 'The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien`s extensive knowledge of philology and folklore.',
        img: 'Tolkien.jpg'
    }];
const booksRouter = require('./src/routes/bookRoutes')(nav1);
const authorRouter = require('./src/routes/authorRoutes')(nav2);
const signUpRouter = require('./src/routes/signUpRoutes')(nav3);

const addbookRouter = require('./src/routes/addbookRoutes')(nav);
const addauthorRouter = require('./src/routes/addauthorRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
// const booksRouter = express.Router()
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/books', booksRouter);
app.use('/authors', authorRouter);
app.use('/signUp', signUpRouter);


app.use('/addbook', addbookRouter);
app.use('/addauthor', addauthorRouter);
app.use('/add', addbookRouter);
app.use('/adda', addauthorRouter);
app.use('/s', signUpRouter);
app.use('/edit/', booksRouter);
app.use('/admin', adminRouter);


app.get('/', function (req, res) {
    // res.sendFile(__dirname + "/src/views/index.html");
    res.render("login", {
        nav3,
        title: 'LOGIN'
    });
});
app.get('/index', function (req, res) {
    // res.sendFile(__dirname + "/src/views/index.html");
    res.render("index", {
        nav,
        title: 'Library',
        authors
    });
});
app.get('/error', function (req, res) {

    res.render("error", {
        nav,
        title: 'Error',

    });
});
app.get('/err', function (req, res) {

    res.render("err", {
        nav,
        title: 'Error1',

    });
});
app.get('/login', function (req, res) {
    // res.sendFile(__dirname + "/src/views/index.html");
    res.render("login", {
        nav3,
        title: 'LOGIN'
    });
});

app.listen(port, () => {
    console.log("Server Ready at " + port)
});