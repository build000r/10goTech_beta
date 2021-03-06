import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    const baseURL = "https://" + req.headers.host + "/";
    // const baseURL = "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local";

    return axios.create({
      baseURL,
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
