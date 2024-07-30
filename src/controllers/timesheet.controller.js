import { Timesheet} from "../models/timesheet.model.js"
import mongoose from "mongoose";

const registertimesheet = async (req,res)=>{
    const timesheet = new Timesheet(req.body)
    try {
        const doc = await timesheet.save();
        res.status(201).json(doc);
    } catch (error) {
        res.status(400).json(error)
    }
}

export {
    registertimesheet
}