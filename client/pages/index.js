import { Segment } from "semantic-ui-react";
import { useEffect } from "react";
import Router from "next/router";

const index = () => {
  const lookupSubdomainForCustomUrl = (url) => {
    console.log("url pushed to", url);
    switch (url) {
      // custom domains
      case "hairytask":
        return "/user/vacation";
      case "campbellcoaccounting":
        return "/user/campbell";
      case "robbaratta":
        return "/user/baratta";
      case "wivud":
        return "/user/vacation";
      // end custom domains
      case "www":
        return "/admin/rfp/landing";
      case "10gotech":
        return "/admin/rfp/landing";
      case "rfp":
        return "/admin/rfp/landing";
      // domains without customizations yet
      default:
        return `/user/${url}`;
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

    // console.log(subdomain, "subdomain");
    // console.log(url, "url");

    if (typeof subdomain === "string") {
      switch (subdomain) {
        case "rfp":
          Router.push(`/admin/rfp/landing`);
          break;
        case "10gotech":
          Router.push(`/admin/rfp/landing`);
          break;
        case "www":
          link = lookupSubdomainForCustomUrl(url);
          Router.push(link);
          break;
        default:
          link = lookupSubdomainForCustomUrl(subdomain);
          Router.push(link);
          break;
      }
    }
  }, []);

  return <Segment basic style={{ minHeight: "100vh" }} loading></Segment>;
};

export default index;
