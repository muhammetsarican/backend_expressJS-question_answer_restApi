const mongoose = require("mongoose");
const encrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require("crypto");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password which longer than 6 digit"],
        required: [true, "Please provide a password"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_img: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
});
UserSchema.methods.getResetPasswordTokenFromUser = function(){
    const randomHexString=crypto.randomBytes(15).toString("hex");
    console.log(randomHexString);

    const {RESET_PASSWORD_EXPIRES}=process.env;

    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(randomHexString)
    .digest("hex");

    this.resetPasswordToken=resetPasswordToken;
    this.resetPasswordExpire=Date.now()+parseInt(RESET_PASSWORD_EXPIRES);

    return resetPasswordToken;
};
// Userschema Methods
UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    const payload = {
        id: this._id,
        name: this.name
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
    return token;
}

// Pre Hooks
UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        next();
    }
    encrypt.genSalt(10, (err, salt) => {
        if (err) next(err)
        encrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        })
    })
})
module.exports = mongoose.model("User", UserSchema);