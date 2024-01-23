const env = import.meta.env;
export const BASE_URL = env.VITE_SERVER_URL;

export const CLIENT_URL = "https://mentornudge.online";

export const userTypes = {
  MENTOR: "mentor",
  MENTEE: "mentee",
  MODERATOR: "moderator",
};
