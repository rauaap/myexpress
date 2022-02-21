var express = require('express');
var router = express.Router();
const db = require('../db')
const crypto = require('crypto')

//convenience function to get all users from json db
const getAllUsers = () => Object.values(db.JSON())

//simply lists all values (no keys) from json db
router.get('/', function(req, res, next) {
    res.status(200).json(getAllUsers());
});

//count users whose names include rName request parameter
router.get('/count/:rName', (req, res) => {
    const userNameCount = getAllUsers().reduce((t,c) =>
        t += (c.name.search(req.params.rName) > -1)
    , 0)
    res.status(200).json(userNameCount)
})

//search users with rName and rEmail request parameter
//user is included in response if both rName is found in name and rEmail is found in email
router.get('/search/:rName/:rEmail', (req, res) => {
    const [rName, rEmail] = [req.params.rName, req.params.rEmail]
    const filteredUsers = getAllUsers().filter(({name, email}) => {
        return (name.search(rName) > -1 && email.search(rEmail) > -1)
    })
    res.status(200).json(filteredUsers)
})

//add new users to json db
//if req.body.user is not defined error handlers deal with it (found in /utils/middleware.js)
router.post('/', (req, res, next) => {
    const newUser = req.body.user
    if (!(newUser.name && newUser.email)) {
        return res.status(400).send({'error': 'invalid user data'})
    }
    db.set(crypto.randomUUID(), {name: newUser.name, email: newUser.email})
    res.status(200).json({
        name: newUser.name, email: newUser.email
    })
})

module.exports = router;
