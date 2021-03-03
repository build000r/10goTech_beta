import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // On the server

    const baseURL = "https://" + req.headers.host + "/";

    // console.log("this the build clitent");
    // if (typeof window !== "undefined") {
    //   console.log("this the build clitent", window.location.origin + "/");
    // }

    return axios.create({
      // baseURL,
      // baseURL: "https://www.10gotech.com/",
      // FOR DEVELOPMENT MODE:
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
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
