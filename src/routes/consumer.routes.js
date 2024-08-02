import { Router } from "express";
import { registerConsumer, sendOtpOnPhone, sendOtpOnEmail } from "../controllers/consumer.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()



router.route("/signup").post(registerConsumer)
router.route("/sendOtp/phone").post(sendOtpOnPhone)
router.route("/sendOtp/email").post(sendOtpOnEmail)


export default router;