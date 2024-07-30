import { Managerrate } from "../models/managerrate.model.js";


const managerrate = async (req,res)=>{
    const managerrating = new Managerrate(req.body)
    try {
        const doc = await managerrating.save();
        res.status(201).json(doc);
    } catch (error) {
        res.status(400).json(error)
    }
}

export {
    managerrate
}