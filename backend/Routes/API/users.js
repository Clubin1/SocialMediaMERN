const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../../Models/Users');
const app = express();

/*
    @route POST api/user/register
    @desc if gone to route, check if email already exists,
    if not create new account
    @access public
*/
router.post('/register', (req, res) => {
    // add validation to user sign up
    Users.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: "Email already exists"});
        } else {
            // add salting to user passwords
            const newUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save().then(user => res.json(user)).catch(
                        err => console.log('err')
                    )
                })
            })
        }
    })
});
// Route to login user
router.post('/login', (req, res) => {
    
});
// Route to update user
router.post('/settings:id', (req, res) => {

});
// Route to delete user
router.post('/remove:id', (req, res) => {

});
module.exports = router;