import { Signup } from "../../../components/auth/signup-basic";
import Layout from "../../../components/layouts";

const signup = () => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Welcome to 10goTech",
        subHeader: "",
        dividerText: "New user sign up",
      }}
    >
      <Signup createSitePermission="true" />
    </Layout>
  );
};

export default signup;
