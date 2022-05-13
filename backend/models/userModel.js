const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
    },
    photoId:{
        type:Number
    },
    password:{
        type:String,
        required:[true,'password is required'],
    }
});

userSchema.pre('save', async function (){
    this.password = await bcrypt.hash(this.password,10);
})

module.exports = mongoose.model("User", userSchema);