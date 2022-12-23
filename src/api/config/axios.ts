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
      setCookie(null, "auth", `Bearer ${res.data.data.access_token}`)
      localStorage.setItem("refresh", res.data.data.refresh_token);
    }
    return res;
  },
  (err) => {
    const error = err && err.response && err.response.data;
    if (error && error.error === "unauthorized") {
      destroyCookie(null, 'auth');

      // To be checked further
      if (localStorage.getItem("refresh")) {
        instance.post(API_PATH.auth.REFRESH, { refresh_token: localStorage.getItem("refresh") })
          .then((response) => setCookie(null, 'auth', response.data.access_token))
          .catch((error) => localStorage.clear())
        return
      }

      window.location.replace("/login");
      throw "Invalid credential";
    } else {
      if (err.code === "ERR_NETWORK") {
        return Promise.reject(handleHttpResponse("0"));
      } else {
        throw error;
      }
    }
  }
);

export default instance;
