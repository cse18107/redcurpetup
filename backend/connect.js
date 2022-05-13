const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./.env'});


function connect (){
    mongoose.connect(process.env.DB).then(()=>{
        console.log('DB is connected successfully');
    }).catch(()=>{
        console.log('DB is not connected');
    })
}

module.exports = connect;