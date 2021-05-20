import { Segment } from "semantic-ui-react";
import { useEffect } from "react";
import Router from "next/router";
import LandingPage from "../components/admin-site/landing-page";

const index = () => {
  const lookupSubdomainForCustomUrl = (url) => {
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
        console.log("www");
        return "t";
      case "10gotech":
        console.log("10gotech");
        return "t";
      case "rfp":
        console.log("rfp");
        return "t";
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

    if (typeof subdomain === "string") {
      switch (subdomain) {
        case "www":
          link = lookupSubdomainForCustomUrl(url);
          return link === "t" ? <LandingPage /> : Router.push(link);
        default:
          link = lookupSubdomainForCustomUrl(subdomain);
          return link === "t" ? <LandingPage /> : Router.push(link);
      }
    }
  }, []);

  return <LandingPage />;
};

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1, stale-while-revalidate=59"
  );

  console.log("server side props", req.headers.host);

  return {
    props: {
      host: req.headers.host,
    },
  };
}

export default index;
