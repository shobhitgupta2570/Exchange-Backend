import { Router } from "express";
import {  registertimesheet } from "../controllers/timesheet.controller.js";


const router = Router()

router.route("/register").post(registertimesheet)

export default router