
//MongoDB Database  →  just stores data(like a warehouse 🏭)
//mongodb driver    →  lets you talk to warehouse(like a phone 📞)
//mongoose          →  Connect to Database , gives you rules & structure(like a manager 👔)


const mongoose = require("mongoose");


async function connectDb()  {

    try{

        await mongoose.connect(process.env.MONGO_URI );
        console.log("db connected successfully " +" server/config/db.js" );
    }catch(err)
    {
        console.log("we got error while connecting db in" + "server/config/db.js" +err);
        // process.exit(0)Stop app — success✅
        //  process.exit(1)Stop app — with error ❌
        process.exit(1);
    }

}


// const userSchema = new mongoose.Schema({
//     email: {
//          type: String,
//          required: true
//          },
//     password: {
//         type :String,
//         required:true,
//         minlength:6,
//      }
// }   ,    );

module.exports =connectDb;

