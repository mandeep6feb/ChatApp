const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');





var schema = new Schema({
    name: { type: String},
    email: { type: String},
    phone: { type: Number},
    password: { type: String},
    image: {type: String}
});

schema.static.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}
schema.method.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password)
}
module.exports = mongoose.model('User', schema);


// UserRegister.pre('save', (next) => {
//      bcrypt.genSalt(10, (err, salt) => {
//          bcrypt.hash(this.password, salt, (err, hash) => {
//              this.password = hash;
//              this.saltSecret = salt;
//              next();
//          })
//      })
// })
// const userModel = module.exports = mongoose.model('Users', userSchema);
// module.exports = {UserRegister} ;