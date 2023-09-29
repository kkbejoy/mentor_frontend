import axios from "axios";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import { editLocalStorageField } from "../../utilities/localStorageUtilities";

const mentorAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

//Mentor Axios Request Interceptors
mentorAxiosInstance.interceptors.request.use(
  (config) => {
    let mentorAuthData = localStorage.getItem("mentorAuth");
    mentorAuthData = JSON.parse(mentorAuthData);
    const mentorAccessToken = mentorAuthData?.accessToken;
    console.log("Access Token", mentorAccessToken);

    if (mentorAccessToken) {
      config.headers.Authorization = `Bearer ${mentorAccessToken}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Mentor axios response Interceptor
mentorAxiosInstance.interceptors.response.use(
  (response) => {
    console.log("Success Response from response Interceptors", response);
    return response;
  },
  async (error) => {
    console.log("Error Response  From response Interceptros", error);
    const authDetails = await getUserIdAndToken("mentorAuth");
    const { refreshToken: refreshTokenFromLocalStorage } = authDetails;
    const originalRequest = error.config;
    console.log("auth detail", authDetails, refreshTokenFromLocalStorage);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          BASE_URL + END_POINTS.MENTEE_AccessTokenRegenerate,
          {
            refreshToken: refreshTokenFromLocalStorage,
          }
        );
        const { accessToken } = response.data;
        await editLocalStorageField("mentorAuth", "refreshToken", accessToken);
        console.log("New Access Token", accessToken);
        return mentorAxiosInstance(originalRequest);
      } catch (error) {
        console.error("Token refresh unsuccessfull", error);
      }
    }
  }
);
export default mentorAxiosInstance;
