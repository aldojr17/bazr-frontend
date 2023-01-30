import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { API_PATH } from "../path";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: parseCookies().auth,
      },
    };
    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const handleHttpResponse = (status: string, message?: string) => {
  switch (status) {
    case "0": {
      return {
        message: "Network Error",
        is_success: false,
        data: null,
      };
    }
    case "404": {
      return "Data Not Found";
    }
    case "400": {
      return message;
    }
    case "500": {
      return new Error("Internal Server Error");
    }
    default: {
      return new Error(`${message || ""}`);
    }
  }
};

instance.interceptors.response.use(
  (res) => {
    if (res.data.data?.access_token) {
      setCookie(null, "auth", `Bearer ${res.data.data.access_token}`, {
        path: "/",
      });
    }
    if (res.data.data?.refresh_token) {
      localStorage.setItem("refresh", res.data.data.refresh_token);
    }

    return res;
  },
  (err) => {
    const error = err && err.response && err.response.data;
    if (error && error.message === "unauthorized") {
      destroyCookie(null, "auth");

      if (localStorage.getItem("refresh")) {
        return instance
          .post(API_PATH.auth.REFRESH, {
            refresh_token: localStorage.getItem("refresh"),
          })
          .then((response) => {
            setCookie(
              null,
              "auth",
              `Bearer ${response.data.data.access_token}`,
              {
                path: "/",
              }
            );

            const originalRequest = err.config;
            originalRequest._retry = true;

            return instance(originalRequest);
          })
          .catch((error) => {
            localStorage.clear();
            window.location.replace("/login");
          });
      }

      throw Promise.reject("Invalid credential");
    } else {
      if (err.code === "ERR_NETWORK" || err.code === "ERR_CONNECTION_REFUSED") {
        return Promise.reject(handleHttpResponse("0"));
      } else {
        throw err.response.data.message;
      }
    }
  }
);

export default instance;
