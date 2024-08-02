import axios from "axios";
import { ulipToken } from "./ulipApiAccess";

async function drivingLicenceVerification(req, res) {

    try {
        const { dlnumber, dob } = req.body;

        if (
            [dlnumber, dob].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const options = {
            method: 'POST',
            url: 'https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/SARATHI/01',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ulipToken}`,
            },
            data: { dlnumber, dob }
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

export { drivingLicenceVerification };