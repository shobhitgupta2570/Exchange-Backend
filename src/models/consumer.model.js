import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const consumerSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true, 
        },
        type: {
            type: String,
            enum: ["consumer", "transporter"],
            required: true
         },
        phoneNumber: {
            type: Number,
            required: [true, "Phone Number is required"],
            unique: true,
        },
        gstin: {
            type: String,
            required: true,
        },
        pan:{
            type: String,
            required: true
        },
        companyName:{
            type: String,
            required: true
        },
        website:{
            type: String,
            required: true
        },
       
    },
    {
        timestamps: true
    }
)


consumerSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            phoneNumber: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
consumerSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const Consumer = mongoose.model("Consumer", consumerSchema)