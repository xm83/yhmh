var express = require('express');
var router = express.Router();
var models = require('./models');
var User = models.User;

module.exports = function(passport) {
    // Passport-related auth routes here, to the router
    router.post('/register', (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword(req.body.password),
    });
    newUser.save()
        .then(res.json({ status: 200, message: 'Registered!' }))
        .catch(err => res.json({ status: `Error: ${err}` }));
    });

    router.get('/auth/facebook', passport.authenticate('facebook'));

    router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
    );

    router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
    });

    router.get('/login', (req, res) => {
    // when this happens, it's due to failure of logging in
    console.log('!!!reqauthInfo', req.authInfo);
    res.json({ status: 400, message: 'failure logging in' });
    });

    // universal route that checks if a user is logged in or not
    // from this point on, user would be logged in; i.e. req.user will be an obj instead of null
    router.use('/*', (req, res, next) => {
        // console.log("wild card req.body", req.body);
        // console.log("wild card req.body.user", req.body.user);
        if (!req.user) {
            res.json({ status: 400, message: 'user not logged in' });
        } else {
            next();
        }
    });

    router.get('/', (req, res) => {
        User.findById(req.user.id)
        .then(user => res.json({ status: 200, message: 'user logged in!', user }))
        .catch(err => res.json({ status: `Error: ${err}` }));
    });


    router.get('/logout', function(req, res){
        /*  req.logout();
            res.redirect('/login');*/
        req.session.destroy();
    })


    return router;
}
