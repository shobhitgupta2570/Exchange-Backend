import { Router } from "express";
import { registerConsumer } from "../controllers/consumer.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()



router.route("/signup").post(registerConsumer)



export default router;