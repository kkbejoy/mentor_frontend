import axios from "axios";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import {
  deleteFromLocalStorage,
  editLocalStorageField,
} from "../../utilities/localStorageUtilities";

//Moderators Base instance for routes that requires JWT
const moderatorAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

//Moderator Axios Request Interceptor
moderatorAxiosInstance.interceptors.request.use(
  (config) => {
    let moderatorAuthData = localStorage.getItem("moderatorAuth");
    moderatorAuthData = JSON.parse(moderatorAuthData);
    const moderatorAccessToken = moderatorAuthData?.accessToken;
    // console.log(
    //   "Access Token from local",
    //   moderatorAuthData,
    //   moderatorAccessToken
    // );
    if (moderatorAccessToken) {
      config.headers.Authorization = `Bearer ${moderatorAccessToken}`;
      // console.log(
      //   "Access token input to request",
      //   config.headers.Authorization,
      //   config.headers.Authorization === moderatorAccessToken
      // );
    }
    // console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Moderator axios response Interceptor
moderatorAxiosInstance.interceptors.response.use(
  (response) => {
    console.log("Success Response from response Interceptors", response);
    return response;
  },
  async (error) => {
    console.log("Error Response  From response Interceptros", error);
    //Fetching user details including refresh tokens
    const authDetails = await getUserIdAndToken("moderatorAuth");
    const { refreshToken: refreshTokenFromLocalStorage } = authDetails;
    const originalRequest = error.config;
    // console.log(
    //   "Auth details from local - from response interceptor",
    //   authDetails,
    //   refreshTokenFromLocalStorage,
    //   error.response.status
    // );

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("Entered into 401 first Refresh generator");
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          BASE_URL + END_POINTS.MODERATOR_AccessTokenRegenerate,
          {
            refreshToken: refreshTokenFromLocalStorage,
          }
        );
        const { accessToken } = response.data;
        console.log("New Access Token", accessToken);
        await editLocalStorageField(
          "moderatorAuth",
          "accessToken",
          accessToken
        );

        return moderatorAxiosInstance(originalRequest);
      } catch (error) {
        console.error("Token refresh unsuccessfull", error);
        await deleteFromLocalStorage("moderatorAuth");
      }
    }
    return error;
  }
);

export default moderatorAxiosInstance;
