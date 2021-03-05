import { Card, Grid, Segment } from "semantic-ui-react";
import { Signup } from "../../../../components/auth/signup-basic-user";
import Layout from "../../../../components/layouts";

const signup = () => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Sign Up",
        subHeader: "To accelerate conversations about your project",
        dividerText: "New user sign up",
      }}
    >
      <Signup />
    </Layout>
  );
};

export default signup;
