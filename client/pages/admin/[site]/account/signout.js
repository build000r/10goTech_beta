import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { buildClient } from "../../../../api/build-client";
import { useRequest } from "../../../../hooks/use-request";
import { Button, Header } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../../../components/layouts";

const signout = ({ user }) => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push(`/admin/${user.userOfSite}`),
  });

  if (user) {
    useEffect(() => {
      doRequest();
    }, []);

    return (
      <Layout
        smallLeaderboard
        leaderboardData={{
          header: "You've signed out",
          subHeader: "Update the content and configuration of your website",
          dividerText: "Configure",
        }}
      >
        Signing out of {user.userOfSite}
      </Layout>
    );
  } else {
    return (
      <Layout
        smallLeaderboard
        leaderboardData={{
          header: "You've signed out",
          subHeader: "Update the content and configuration of your website",
          dividerText: "Configure",
        }}
      >
        <Link href={`/admin/${useRouter().query.site}`}>
          <Button fluid>Go home</Button>
        </Link>
      </Layout>
    );
  }
};

signout.getInitialProps = async (context) => {
  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const user = currentUser.currentUser;
  return { user };
};

export default signout;
