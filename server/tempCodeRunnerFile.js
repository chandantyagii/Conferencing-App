require("dotenv").config();
const dbConnectFunction =require("./config/db");
const express = require("express");
const cors = require("cors");

const app =  express();

app.use(cors()); /*  is used to allow your frontend and backend to communicate when they run ondifferent origins (ports/domains).*/

app.use(express.json());/*allows frontend to talk to backend across ports/domains */



 dbConnectFunction();




const PORT = process.env.PORT || 4000   ;// ager env me sa port na aya to 4000 chala jayega

app.listen(PORT ,  ()=>{

    console.log(`port runing at ${PORT}`);
}   );
