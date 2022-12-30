import axios, { AxiosRequestConfig } from "axios";
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

const handleFallback = (method: string, url: string, payload?: AxiosRequestConfig) => {
  switch (method) {
    case "get":
      instance.get(url, payload?.params);
      return;
    case "post":
      instance.post(url, JSON.parse(payload?.data!))
        .catch((err) => {
          console.log("Fallback Error: ", err);
          // const error = err && err.response && err.response.data;
          // if (error && error.message === "unauthorized") {
          //   localStorage.clear()
          //   window.location.replace("/login");
          // }
        });
      return;
    default:
      return
  }
}

instance.interceptors.response.use(
  (res) => {
    if (res.data.data?.access_token) {
      setCookie(null, "auth", `Bearer ${res.data.data.access_token}`);
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
        instance
          .post(API_PATH.auth.REFRESH, { refresh_token: localStorage.getItem("refresh") })
          .then((response) => {
            setCookie(null, "auth", `Bearer ${response.data.data.access_token}`)
            handleFallback(err.config.method, err.config.url, err.config)
          })
          .catch((error) => {
            localStorage.clear()
            window.location.replace("/login");
          });

        return;
      }

      window.location.replace("/login");
      throw Promise.reject("Invalid credential");
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
