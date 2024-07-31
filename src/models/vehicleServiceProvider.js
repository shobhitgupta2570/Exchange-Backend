import mongoose, { Schema } from "mongoose";

const vehicleServiceProviderSchema = new Schema(
    {
        aadhar: {
            type: String,
            required: [true, "Aadhar is required"],
            unique: true,
        },
        type: {
            type: String,
            enum: ["owner", "driver", "broker"],
            required: true
        },
        phoneNumber: {
            type: Number,
            required: [true, "Phone Number is required"],
            unique: true,
        },
        pan: {
            type: String,
            required: [true, "Pan is required"],
            uppercase: true,
            unique: true,
        }
    },
    {
        timestamps: true
    }
)


export const VehicleServiceProvider = mongoose.model("VehicleServiceProvider", vehicleServiceProviderSchema);