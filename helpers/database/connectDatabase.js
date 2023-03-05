const mongoose=require("mongoose")
const dotenv = require("dotenv");

dotenv.config({
    path: "./config/env/config.env"
})

const connectDatabase=()=>{
    mongoose.connect(String(process.env.MONGO_URI), {
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        // useUnifiedTopology: true
    })
    .then(()=>console.log("Mongoose connect is successful"))
    .catch((err)=>console.error(new Error(`Not connected: ${err}`)));
}

module.exports=connectDatabase;