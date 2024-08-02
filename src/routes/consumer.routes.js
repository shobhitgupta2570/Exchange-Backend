import { Router } from "express";
import { loginConsumer, registerConsumer, sendConsumerOtp, } from "../controllers/consumer.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()



router.route("/signup").post(registerConsumer)
router.route("/sendOtp").get(sendConsumerOtp)
router.route("/login").get(loginConsumer)


export default router;