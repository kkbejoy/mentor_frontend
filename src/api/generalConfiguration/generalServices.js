// @ts-nocheck
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import END_POINTS from "../../constants/endpoints";
import { toast } from "sonner";

//Function that sends
export const sentOtp = async (email) => {
  try {
    const responseFromApi = await axios.post(
      `${BASE_URL}${END_POINTS.MENTEE_SEND_OTP}`,
      {
        email: email,
      }
    );
    return responseFromApi;
  } catch (error) {
    console.log(error);
  }
};

//API that sends new Password with OTP

// interface ConfirmNewPasswordParams {
//   emailVerified: string;
//   otp: string;
//   password: string;
//   confirmpassword: string;
// }

export const confirmNewPassword = async ({
  emailVerified,
  otp,
  password,
  confirmpassword,
}) => {
  try {
    const responseFromApi = axios.post(
      `${BASE_URL}${END_POINTS.MENTEE_NEW_PASSWORD_SUBMISSION}`,
      {
        otp: otp,
        password: password,
        confirmPassword: confirmpassword,
        email: emailVerified,
      }
    );
    console.log("res from axios", responseFromApi);
    // toast.success
    return responseFromApi;
  } catch (error) {
    console.log(error);
    toast.error("something went wring");
  }
};
