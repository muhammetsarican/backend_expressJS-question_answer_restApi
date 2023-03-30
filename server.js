const express = require("express");
const dotenv = require("dotenv");
const router=require("./routers/");
const connectDatabase=require("./helpers/database/connectDatabase");
const errorHandler=require("./middleware/error/errorHandler");
const path=require("path");

const app = express();

// Mongo Database
connectDatabase()
dotenv.config({
    path: "./config/env/config.env"
})
const PORT = process.env.PORT;

app.get("/", (req, res, next) => {
    res.status(200)
    .json({
        success:true,
        message:"Welcome To ExpressJs"
    })
})
// Express - Body Middleware

app.use(express.json())

app.use("/api", router)

// Error Handling
app.use(errorHandler);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})