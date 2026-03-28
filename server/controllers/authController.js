const User = require("../models/userModel");// by user we run queey insert , find other
const bcrypt = require("bcrypt");// use to hash the password
const jwt =require("jsonwebtoken") // to generate token

exports.register = async(req,resp)=>{
    // destructuring the required field from request
    const {name , email , password }=req.body;


    const exist = await User.findOne({ email: email });
    // ager user hai to exist me docuemnt aayega mtlb true

    if(exist){
         return resp.json( {
             message: "User Already Exist",
             success :false
            }  ) ;

        }

    const hash = await bcrypt.hash(password ,10 ); /* yha 10 ka mtlab hai   */

    const user = await User.create({
        name:name ,
        email:email,
        password:hash
    });

   return  resp.json({
    name :user.name,
    email:user.email,
    success:true,
    password:user.password
   });
   
}

exports.login = async(req,resp)=>{

    const {email ,password} =req.body;

    const user = await User.findOne({ email: email });

    if(user) {

        const match = await bcrypt.compare( password , user.password  );
        if (!match) return  resp.json({ message: "Wrong password" });

        // If user credentials are correct
        const token = jwt.sign(  { id:user.id }  , process.env.JWT_SECRET  ,  {expiresIn : "1d" }   );

        return     resp.json({
            token:token ,
            message:"login successfully",
            name :`${user.name}`,
            success:true
        });

    }else {
        return resp.json({ message: "User not registerd ",
            success:false
         });
    }

}
