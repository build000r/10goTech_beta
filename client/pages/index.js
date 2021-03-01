import { Segment } from "semantic-ui-react";
import { useEffect } from "react";
import Router from "next/router";

const index = () => {
  const lookupSubdomainForCustomUrl = (url) => {
    switch (url) {
      case "hairytask":
        return "/user/vacation";
      case "robbaratta":
        return "/user/baratta";
      case "wivud":
        return "/user/vacation";
      default:
        return "/admin/rfp";
    }
  };

  useEffect(() => {
    let link;

    const getSubdomain = () =>
      typeof window !== "undefined"
        ? window.location.host.split(".")[0]
        : getSubdomain();

    const getUrl = () =>
      typeof window !== "undefined"
        ? window.location.host.split(".")[1].split(".")[0]
        : getUrl();

    const subdomain = getSubdomain();
    const url = getUrl();

    console.log(subdomain, "subdomain");
    console.log(url, "url");

    if (typeof subdomain === "string") {
      switch (subdomain) {
        case "rfp":
          Router.push(`/admin/rfp`);
          break;
        case "10gotech":
          Router.push(`/admin/rfp`);
          break;
        case "www":
          link = lookupSubdomainForCustomUrl(url);
          Router.push(link);
          break;
        case "com":
          link = lookupSubdomainForCustomUrl(subdomain);
          Router.push(link);
          break;
        default:
          link = lookupSubdomainForCustomUrl(url);
          Router.push("https://www." + subdomain + ".com" + link);
          break;
      }
    }
  }, []);

  return <Segment basic style={{ minHeight: "100vh" }} loading></Segment>;
};

export default index;
