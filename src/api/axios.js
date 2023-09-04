import axios from "axios";
import { BASE_URL } from "../constants/constants";

const axiosApi = axios.create({
  baseURL: BASE_URL,
});
export default axiosApi;
// Define type here
