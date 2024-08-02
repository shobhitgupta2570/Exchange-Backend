import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Consumer} from "../models/consumer.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import axios from "axios";
import otpGenerator from 'otp-generator';

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

const loginConsumer = asyncHandler(async (req,res)=>{
    try {
        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const cDate = new Date();
        const phoneNumber = req.body.phoneNumber;
        const existedUser = await Consumer.findOne({ phoneNumber })

    if (!existedUser) {
        throw new ApiError(409, " phoneNumber does not exist")
    }
        // sent otp on mobile number
        await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            params: {
                authorization: process.env.FAST2SMS_API_KEY,
                variables_values: otp,
                route: 'otp',
                numbers: phoneNumber
            }
        });

        // console.log('sent otp')
        return res.status(201).json(
            new ApiResponse(201, {otp}, "OTP sent successfully!"));
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(400).json(
            // { success: false, message: 'Failed to send OTP.' }
            new ApiResponse(400, {error}, "Failed to send OTP")
        );
    }
})

const sendConsumerOtp = asyncHandler(async (req, res) => {
    try {
        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const cDate = new Date();
        const phoneNumber = req.body.phoneNumber;
        const existedUser = await Consumer.findOne({ phoneNumber })

    if (existedUser) {
        throw new ApiError(409, " phoneNumber already exists")
    }
        // sent otp on mobile number
        await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            params: {
                authorization: process.env.FAST2SMS_API_KEY,
                variables_values: otp,
                route: 'otp',
                numbers: phoneNumber
            }
        });

        // console.log('sent otp')
        return res.status(201).json(
            new ApiResponse(201, {otp}, "OTP sent successfully!"));
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(400).json(
            // { success: false, message: 'Failed to send OTP.' }
            new ApiResponse(400, {error}, "Failed to send OTP")
        );
    }
})



// const verifyConsumerOtp = async (req, res) => {
//     try {

//         const existingOtp = await otpModel.findOne({ mobileNumber: req.body.mobileNumber });
//         console.log('existingOtpDetails', existingOtp);
//         if (!existingOtp.otp) {
//             throw new Error('Otp does not exists');
//         }

//         // otp expiration time is 5 minutes
//         const cDate = new Date();

//         if (cDate.getTime() > (existingOtp.otpExpiration + 300000)) {
//             throw new Error('Otp expired');
//         }

//         if (existingOtp.otp != req.body.otp) {
//             throw new Error('Invalid otp')
//         }

//         return res.status(201).json({ success: true })
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: error?.message
//         })
//     }
// }

export {
    registerConsumer, sendConsumerOtp, loginConsumer
}