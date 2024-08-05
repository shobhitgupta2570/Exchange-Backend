import axios from "axios";
import { ulipToken } from "./ulipApiAccess.js";

async function gstVerification(req, res) {

    try {
        if (req.body.gstin === "") {
            throw new ApiError(400, "Please enter GST number");
        }

        const options = {
            method: 'POST',
            url: 'https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/GST/01',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ulipToken}`,
            },
            data: { gstin: req.body.gstin }
        };

        const apiResponse = await axios.request(options);
        const response = apiResponse?.data?.response?.[0]?.response;

        return res.status(200).json(response);
    }
    catch (error) {
        console.log('Error', error);
        res.status(400).json(error.message);
    }
};

export { gstVerification };