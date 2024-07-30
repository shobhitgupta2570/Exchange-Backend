import mongoose, {Schema} from "mongoose";


const TimesheetSchema = new Schema(
    {
        email: {
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
        name: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        managerName: {
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


export const Timesheet = mongoose.model("Timesheet", TimesheetSchema)