import { Segment } from "semantic-ui-react";
import { useEffect } from "react";
import Router from "next/router";

const index = () => {
  const subdomain =
    typeof window !== "undefined" ? window.location.host.split(".")[0] : "";

  const url =
    typeof window !== "undefined"
      ? window.location.host.split(".")[1].split(".")[0]
      : "";

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
    switch (subdomain) {
      case "rfp":
        Router.push(`/admin/rfp`);
        break;
      case "10gotech":
        Router.push(`/admin/rfp`);
        break;
      case "www":
        const link = lookupSubdomainForCustomUrl(url);
        Router.push(link);
        break;
      default:
        const link = lookupSubdomainForCustomUrl(url);
        Router.push("https://www." + subdomain + ".com" + link);
        break;
    }
  }, [subdomain]);

  return <Segment basic style={{ minHeight: "100vh" }} loading></Segment>;
};

export default index;
