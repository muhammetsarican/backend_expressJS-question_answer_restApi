const express = require("express");
const dotenv = require("dotenv");
const router=require("./routers/");
const connectDatabase=require("./helpers/database/connectDatabase")
const errorHandler=require("./middleware/error/errorHandler")

const app = express();

// Mongo Database
connectDatabase()
dotenv.config({
    path: "./config/env/config.env"
})
const PORT = process.env.PORT;

app.get("/", (req, res, next) => {
    res.send("The get method")
})
// Express - Body Middleware

app.use(express.json())

app.use("/api", router)

// Error Handling
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})