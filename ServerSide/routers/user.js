let express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
let UserRegister = require('../models/userRegisterModel')
router.post('/register', (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        // password: User.hashPassword(res.body.password),
        creation_dt: Date.now(),
        password: bcrypt.hashSync(req.body.password, 10)
    });
    let promise = user.save()
    promise.then( (doc) => {
        return res.status(201).json(doc)
    })
    promise.catch( (err) => {
        return res.status(501).json({message: ' Error registering user.'})
    })
    // user.save(( err, docs) => {
    //     if(!err)  
    //     {
    //         res.send(docs);
    //         console.log(docs)
    //     }
    // })      
});                     

router.post('/login', (res, req, next) => {
    // user.email = req.body.email
    let promise =  UserRegister.findOne({email: req.body.email}).exec();
    console.log(promise);
    promise.then( (doc) => {
        if(doc) { 
            // if(doc.isValid(req.body.password));
            bcrypt.compareSync(req.body.password)
        }
        else {
            return res.status(501).json({message: 'User email is not registerd.'})
        }
    });
    promise.catch( (err) => {
        return res.status(501).json({message: ' Some Internal Error.'})
    })
})

module.exports = router;