import { Router } from "express";
import { loginConsumer, registerConsumer, sendConsumerOtp, sendConsumerOtpLogin } from "../controllers/consumer.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()



router.route("/signup").post(registerConsumer)
router.route("/sendOtp").get(sendConsumerOtp)
router.route("/login").get(loginConsumer)
router.route("/sendOtpLogin").get(sendConsumerOtpLogin)

export default router;