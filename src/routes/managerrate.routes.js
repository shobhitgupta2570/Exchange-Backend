import { Router } from "express";
import { managerrate } from "../controllers/managerrate.controller.js";


const router = Router()

router.route("/rate").post(managerrate)

export default router