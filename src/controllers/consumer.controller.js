import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Consumer} from "../models/consumer.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


// const generateAccessAndRefereshTokens = async(userId) =>{
//     try {
//         const user = await User.findById(userId)
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()

//         user.refreshToken = refreshToken
//         await user.save({ validateBeforeSave: false })

//         return {accessToken, refreshToken}


//     } catch (error) {
//         throw new ApiError(500, "Something went wrong while generating referesh and access token")
//     }
// }

const registerConsumer = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: phoneNumber, email
    // check for images, check for profileImage
    // upload them to cloudinary, profileImage
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {phoneNumber, email, gstin, type, companyName, website, pan } = req.body
    //console.log("email: ", email);

    if (
        [phoneNumber, email, gstin, type, companyName, website, pan].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await Consumer.findOne({ email,phoneNumber })

    if (existedUser) {
        throw new ApiError(409, "User with email or phoneNumber already exists")
    }
    //console.log(req.files);

    

    const consumer = await Consumer.create({
        phoneNumber, email, gstin, type, companyName, website, pan
    })

    const createdConsumer = await Consumer.findById(consumer._id).select(
        "-refreshToken"
    )

    if (!createdConsumer) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdConsumer, "User registered Successfully")
    )

} )

export {
    registerConsumer
}