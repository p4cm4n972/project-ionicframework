const User = require('../models/user');
const config = require('../config/database')

module.exports = (router) => {
    
router.post('/register', (req, res) => {

    if(!req.body.username) {
        res.json({ success: false, message: 'you must provide a login'});
    } else {
        if(!req.body.password) {
        res.json({ success: false, message: 'you must provide a password'});            
        } else {
            
            let user  = new User({
               username: req.body.username,
               password: req.body.password
            });
            user.save((err) => { 
                if(err) {
                    console.log(err)
                    res.json({ success: false, message: 'Could not save user. Error: ', err});
                } else {
                    res.json({ success: true, message: 'User saved'})
                }
            })
        }
    }
});


    return router;
}