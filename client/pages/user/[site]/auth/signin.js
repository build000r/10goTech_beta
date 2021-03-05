import { Grid, Segment } from "semantic-ui-react";
import { Signin } from "../../../../components/auth/signin";
import VertCenterGrid from "../../../../components/grid/vert-center";
import Layout from "../../../../components/layouts";

const signin = () => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Sign In",
        subHeader: "Welcome back",
        dividerText: "Existing User Sign in",
      }}
    >
      <Signin siteType="user" />
    </Layout>
  );
};

export default signin;
