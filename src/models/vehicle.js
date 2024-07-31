import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema({
    vehicleNumber: {
        type: String,
        required: true,
    },
    rcCopy: { type: [String], required: true },
    height: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    length: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleServiceProvider"
    },
    drivers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleServiceProvider"
    }],
    brokers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleServiceProvider",
        required: false
    }],
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    biddingAuthorization: {
        type: Boolean,
    },
    vehicleLatitude: {
        type: String,
        required: false,
    },
    vehicleLongitude: {
        type: String,
        required: false,
    },
    tdsDeclaration: {
        type: String,
        required: false,
    },
    ownerConsent: {
        type: String,
        required: false,
    },
    brokerConsent: {
        type: String,
        required: false,
    }
});

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
