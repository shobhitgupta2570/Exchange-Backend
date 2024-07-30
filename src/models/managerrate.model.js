import mongoose, {Schema} from "mongoose";


const ManagerrateSchema = new Schema(
    {
        employeeEmail: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowecase: true,
            trim: true, 
        },
        managerEmail: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowecase: true,
            trim: true, 
        },
        rate: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
       
    },
    {
        timestamps: true
    }
)


export const Managerrate = mongoose.model("Managerrate", ManagerrateSchema)