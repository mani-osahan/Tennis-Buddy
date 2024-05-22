import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please provide a name"]
    },
    email: {
        type: String, 
        unique: true, 
        required: [true, "Please provide an email address"]
    }, 
    password: {
        type: String, 
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String, 
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.user || mongoose.model("user", userSchema)

export default User