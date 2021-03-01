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
    const base = "https://www.";

    switch (url) {
      case "hairytask":
        return base + url + ".com/user/vacation";
      case "robbaratta":
        return base + url + ".com/user/baratta";
      case "wivud":
        return base + url + ".com/user/vacation";
      default:
        return base + url + ".com/admin/rfp";
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
        Router.push(`/user/${subdomain}`);
        break;
    }
  }, [subdomain]);

  return <Segment basic style={{ minHeight: "100vh" }} loading></Segment>;
};

export default index;
