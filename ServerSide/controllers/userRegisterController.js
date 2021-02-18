const express = require('express');
const router = express.Router({mergeParams: true});
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
// const User = mongoose.model('User')
// var { Employee} = require('../models/employee');
let UserRegister = require('../models/userRegisterModel');
const Messages = require('../models/loginModel')
router.get('/register/', (req, res) => {
    UserRegister.find( (err, docs) => {
        if(!err)
        {
            res.send(docs);
            // let promise = UserRegister.findOne({email: req.body.email}).exec();
        }
        else {
            console.log('Error is Retriving email :' + JSON.stringify( err, undefined, 2));
        }                                                                                                       
    });
});    
router.get('/messages', (req, res) => {
    var ipFilter = new Messages({
        to: req.body.to,
        from: req.body.from
    });
    // var query = { to:'5e8c4dded144e917e5f2c704' ,from: '5e94029fdad6013707f867c2' };
    var ipFilter = { to:req.query.to, from: req.query.from};
    var ipFilter = { from:req.query.from, to: req.query.to};
    Messages.find(ipFilter, (err, docs) => {
        if(!err)
        {
            res.send(docs);
            console.log(docs);
        }
        else {
            console.log(  err);
        }                                                                                                       
    });
});
router.get('/register/:userId',(req, res) => {
    var userId = req.params.userId;
    UserRegister.findOne( { _id:  userId })
  .then(doc => {
    // console.log(doc + ' dasf');
    res.send(doc)
  })
  .catch(err => {
    // console.log(err + ' asfrasf');
  });
}); 
router.get('/registerOne/',(req, res) => {
    var ipFilter = new UserRegister({
        email: req.body.email
    });
    var ipFilter = { email:req.query.email};
    UserRegister.findOne(ipFilter, (err, docs) => {
        if(!err)
        {
            res.send(docs);
            console.log(docs);
        }
        else {
            console.log(  err);
        }                                                                                                       
    });
});
router.get('/messages/:userId',(req, res) => {
    var userId = req.params.userId;
    Messages.findOne( { _id:  userId })
  .then(doc => {
    // console.log(doc + ' dasf');
    res.send(doc)
  })
  .catch(err => {
    // console.log(err + ' asfrasf');
  });
});
router.post('/photo', (req,res) => {
    var newItem = new UserRegister();
    newItem.image.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.image.contentType = 'image';
    newItem.save();
   });
router.patch('/register', (req, res) => {
    var user = new UserRegister({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save(( err, docs) => {
        if(!err)
        {
            res.send(docs);
            console.log(docs)
        }
    })
});


router.patch('/login', (req, res) => {
    var user = new UserRegister({
        // name: req.body.name,
        // email: req.body.email,
        // phone: req.body.phone,
        // password: bcrypt.hashSync(req.body.password, 10)
    });
   
    let promise = UserRegister.findOne({email: req.body.email}).exec();
    promise.then( (doc) => {
        if(doc) {
            // console.log(doc);
    // console.log(doc.password);
1
            var passwordIsValid = bcrypt.compareSync(req.body.password, doc.password) ;
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            let jwt_secret = 'mysecret';
            let token = jwt.sign({ id: doc._id }, jwt_secret, {expiresIn: 86400 });
             console.log(token);
            // res.status(200).send(  token);
            return res.status(200).json(token);         
            // console.log(doc.password);
        }
        else {
            // console.log({message: 'User email is not registerd.'})
            return res.status(501).json({message: 'User email is not registerd.'})
         
        }
   
    });
});


let decodedtoken = '';
let verifyToken = function(req, res, next) {
    let token = req.query.token;

    jwt.verify(token, 'mysecret', (err, tokendata) => {
        if(err){
            return res.status(400).json({message: 'Unathorized request'});
        }
        if(tokendata){
                decodedtoken = tokendata;
                console.log(decodedtoken);
                next();
        }
    });
 }
 router.get('/name', verifyToken, (req , res , next) => {
     console.log(decodedtoken.id);
    return res.status(200).json(decodedtoken.id);
});
  //#endregion


// router.patch('/login', (res, req, next) => {
//     var user = new UserRegister({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: bcrypt.hashSync(req.body.password, 10)
//     });
//     let promise = UserRegister.findOne({email: user.email}).exec();

//     promise.then( (doc) => {
//         if(doc) {
//             if(doc.isValid(req.body.password));
//         }
//         else {0
//             return res.status(501).json({message: 'User email is not registerd.'})
//         }
//     });
// })
module.exports = router;