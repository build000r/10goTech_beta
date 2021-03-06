import { Button, Header } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import Link from "next/link";
import { useAuth } from "../../../../hooks/use-auth";
import { useRouter } from "next/router";
import Layout from "../../../../components/layouts";

const index = ({ user }) => {
  const renderIfAuth = () => {
    const { id, email, userOfSite } = user;

    return (
      <Layout
        smallLeaderboard
        leaderboardData={{
          header: `You're signed in as ${email}`,
          subHeader: "",
          btnPath: `/admin/${userOfSite}/account/signout`,
          btnText: "Sign Out",
        }}
      ></Layout>
    );
  };

  return useAuth({
    user,
    currentUrlSite: useRouter().query.site,
    renderIfAuth,
  });
};

index.getInitialProps = async (context) => {
  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const user = currentUser.currentUser;

  return { user };
};

export default index;
