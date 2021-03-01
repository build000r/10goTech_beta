import { Segment } from "semantic-ui-react";
import { useEffect } from "react";
import Router from "next/router";

const index = () => {
  const subdomain =
    typeof window !== "undefined" ? window.location.host.split(".")[0] : "";

  useEffect(() => {
    switch (subdomain) {
      case "rfp":
        Router.push(`/admin/rfp`);
        break;
      case "10gotech":
        Router.push(`/admin/rfp`);
        break;
      case "www":
        Router.push(`/admin/rfp`);
        break;
      default:
        Router.push(`/user/${subdomain}`);
        break;
    }
  }, [subdomain]);

  return <Segment basic style={{ minHeight: "100vh" }} loading></Segment>;
};

export default index;
