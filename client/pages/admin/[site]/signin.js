import { Signin } from "../../../components/auth/signin";
import Layout from "../../../components/layouts";

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
      <Signin siteType="admin" />
    </Layout>
  );
};

export default signin;
