
const express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
let {Loging} = require('../models/loginModel');

// router.post('/', (req, res) => {
//     // var login = new Loging({
//         // email: req.body.email,
//       const  email = req.body.email
//       const user = { name: email}
//     // });
//    const accessToken =  jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
//    res.json({accessToken: accessToken});
// });

router.post('/',   (request, response) => {
  try {
      var user =  Loging.findOne({ username: request.body.username }).exec();
      if(!user) {
          return response.status(400).send({ message: "The username does not exist" });
      }
      if(!Bcrypt.compareSync(request.body.password, user.password)) {
          return response.status(400).send({ message: "The password is invalid" });
      }
      response.send({ message: "The username and password combination is correct!" });
  } catch (error) {
      response.status(500).send(error);
  }
});
module.exports = router;