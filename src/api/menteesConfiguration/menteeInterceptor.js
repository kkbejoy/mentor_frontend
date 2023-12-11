import axios from "axios";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import {
  deleteFromLocalStorage,
  editLocalStorageField,
} from "../../utilities/localStorageUtilities";
// import { toast } from "sonner";

const menteesAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

menteesAxiosInstance.interceptors.request.use(
  (config) => {
    try {
      let menteesAuthData = localStorage.getItem("menteeAuth");
      if (!menteesAuthData) throw new Error("Auth data null");
      menteesAuthData = JSON.parse(menteesAuthData);
      const menteesAccessToken = menteesAuthData?.accessToken || 0;
      // console.log("Access Token", menteesAccessToken);
      // console.log("Checking  mentee axios interceptor ");
      if (menteesAccessToken) {
        config.headers.Authorization = `Bearer ${menteesAccessToken}`;
      }
      // console.log(config);
      return Promise.resolve(config);
    } catch (error) {
      console.log("Error from req interceptor", error);
    }
  },
  (error) => {
    console.log("Error Form mentee req interceptor", error);
    return Promise.reject(error);
  }
);

//Mentee axios response Interceptor
menteesAxiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Success Response from response Interceptors", response);
    return response;
  },
  async (error) => {
    console.log("Error Response  From response Interceptros", error);
    const authDetails = await getUserIdAndToken("menteeAuth");
    const { refreshToken: refreshTokenFromLocalStorage } = authDetails;
    const originalRequest = error.config;
    // console.log("auth detail", authDetails, refreshTokenFromLocalStorage);

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
        await editLocalStorageField("menteeAuth", "accessToken", accessToken);
        console.log("New Access Token", accessToken);
        return menteesAxiosInstance(originalRequest);
      } catch (error) {
        console.error("Token refresh unsuccessfull", error);
        await deleteFromLocalStorage("menteeAuth");
      }
    }
    return error;
  }
);

export default menteesAxiosInstance;
