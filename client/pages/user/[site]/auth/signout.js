import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { buildClient } from "../../../../api/build-client";
import { useRequest } from "../../../../hooks/use-request";

const signout = ({ currentUser }) => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () =>
      Router.push(
        `/${currentUser.userOfSite === "rfp" ? "admin" : "user"}/${
          currentUser.userOfSite
        }`
      ),
  });

  useEffect(() => {
    doRequest();
  }, []);
  return <div>signing out of {currentUser.userOfSite}</div>;
};

signout.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");

  return data;
};

export default signout;
