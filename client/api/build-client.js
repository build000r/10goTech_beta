import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    const baseURL = "https://" + req.headers.host + "/";

    return axios.create({
      baseURL,
      // baseURL:
      //   "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
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
