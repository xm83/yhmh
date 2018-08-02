var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var models = require('./models');
var User = models.User;

module.exports = function(passport) {
    
    function hashPassword(password) {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }

    // Passport-related auth routes here, to the router
    router.post('/register', (req, res) => {
        User.findOne({
            email: req.body.email
        })
        .exec()
        .then(result => {
            if (!result) {
                // new user, can register
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashPassword(req.body.password),
                });
                newUser.save()
                    .then(res.status(200).json({message: 'Registered!' }))
                    .catch(err => res.status(500).json({ message: `Error: ${err}` }));
            } else {
                // user already exists
                res.status(500).json({message: 'User already exists'})
            }
        })
        .catch(err => res.status(500).json({ message: `Error: ${err}` }));
        
    });

    router.post('/login', (req, res) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/'
            
        })(req, res)
        // console.log(req);
        // res.send("success")
    })

    // router.post('/login', passport.authenticate('local'), (req, res) => {
    //     res.redirect('/');
    // });


    router.get('/auth/facebook', passport.authenticate('facebook'));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/');
        }
    );

    // router.get('/login', (req, res) => {
    //     // when this happens, it's due to failure of logging in
    //     console.log('!!!reqauthInfo', req.authInfo);
    //     res.json({ status: 400, message: 'failure logging in' });
    // });

    // universal route that checks if a user is logged in or not
    // from this point on, user would be logged in; i.e. req.user will be an obj instead of null
    router.use('/*', (req, res, next) => {
        // console.log("wild card req.body", req.body);
        // console.log("wild card req.body.user", req.body.user);
        if (!req.user) {
            res.status(400).json({message: 'user not logged in' });
        } else {
            next();
        }
    });

    router.get('/', (req, res) => {
        User.findById(req.user.id)
        .then(user => res.status(200).json({ message: 'user logged in!', user}))
        .catch(err => res.status(500).json({ message: `Error: ${err}` }));
    });


    router.get('/logout', function(req, res){
        /*  req.logout();
            res.redirect('/login');*/
        req.session.destroy();
        res.status(200).json({message: 'success logging out'})
    })


    return router;
}
