const mongoose =require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        required:true,
    },
    email: {
         type: String,
         required: true
         },
    password: {
        type :String,
        required:true,
     }
}   ,  );

//module.exports = mongoose.model("user", userSchema);
//                              ↑           ↑
//                        collection     your schema/blueprint
//                        name in DB

//const User = require("./userModel");

//User.find()            ✅ Get all users
//User.findById(id)    ✅ Find one user
//User.create({ ...})    ✅ Insert a user
//User.findByIdAndUpdate()  ✅ Update
//User.deleteOne()      ✅ Delete

// ye collection ka reference de deta hai  collection ka jispe hum query chalate hai
module.exports = mongoose.model("user" ,userSchema);
