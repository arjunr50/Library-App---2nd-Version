const express = require("express");
const Userdata = require('../model/Userdata');
const signUpRoutes = express.Router();

const nav3 = [
    {
        link: '/login', name: 'Login'
    },
    {
        link: '/signup', name: 'Sign Up'
    }
]
function router(nav) {
    signUpRoutes.get('/', function (req, res) {
        res.render('signup', { nav, title: "Sign Up" });
    });

    signUpRoutes.post('/s', function (req, res) {
        const item = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,

        }

        const user = Userdata(item);
        user.save();//saving to database
        res.redirect('/login');

    });
    signUpRoutes.post('/check', async (req, res) => {
        try {
            const user = await Userdata.findByCredentials(req.body.email, req.body.password)
            return res.redirect('/index')
        } catch (err) {
            res.status(400).render("err", {
                nav3,
                title: "Login Error",
                error: "Access Denied",
                message: err
            })
        }
    })

    return signUpRoutes;
}

module.exports = router;