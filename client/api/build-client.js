import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // On the server

    const baseURL = window.location.origin + "/";

    return axios.create({
      baseURL,
      //FOR DEVELOPMENT MODE:
      // baseURL:
      // "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // On the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export { buildClient };
