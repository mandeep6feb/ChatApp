const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/renter', (err) => {
    if(!err)
    console.log('MongoDB Connection Succeeded');
    else
    console.log('Error In MongoDB Connection : ', JSON.stringify(err, undefined, 2));
});