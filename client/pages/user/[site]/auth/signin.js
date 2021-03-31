import Link from "next/link";
import { Button } from "semantic-ui-react";
import { Signin } from "../../../../components/auth/signin";
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
      <Button basic floated="right" style={{ marginTop: "30px" }}>
        <Link href="/admin/rfp/signin">Go to admin login</Link>
      </Button>
    </Layout>
  );
};

export default signin;
