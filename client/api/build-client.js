import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // On the server

    return axios.create({
      baseURL: "http://www.10gotech.com/",
      // baseURL: FOR DEVELOPMENT MODE:
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
