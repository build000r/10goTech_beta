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
      case "hairytask" || "www.hairytask.com":
        return "/user/vacation";
      case "robbaratta" || "www.robbaratta.com":
        return "/user/baratta";
      case "wivud" || "www.wivud.com":
        return "/user/vacation";
      default:
        console.log("URL received, ", url);
        return "/admin/rfp";
    }
  };

  useEffect(() => {
    let link;

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
      default:
        link = lookupSubdomainForCustomUrl(url);
        Router.push("https://www." + subdomain + ".com" + link);
        break;
    }
  }, [subdomain]);

  return <Segment basic style={{ minHeight: "100vh" }} loading></Segment>;
};

export default index;
