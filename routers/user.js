const express=require('express');
const {getSingleUser, getAllUsers}=require("../controllers/user");
const { checkUserExists } = require('../middleware/database/databaseErrorHelpers');
const userQueryMiddleware = require('../middleware/query/userQueryMiddleware');
const User = require('../models/user');

const router=express.Router();

router.get("/", userQueryMiddleware(User), getAllUsers)
router.get("/:id", checkUserExists, getSingleUser)

module.exports =router;