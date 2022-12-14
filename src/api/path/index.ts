// define every api end point
// ex : localhost://8080/register => "/register" need to be defined here as api path inside "auth" object

export const API_PATH = {
  auth: {
    REGISTER: "/register",
    LOGIN: "/login",
    CHECK_EMAIL: "/check-email",
  },
  user: {
    PROFILE: "/get-profile",
  },
};
