import { buildClient } from "../../../api/build-client";
import { Segment, Header } from "semantic-ui-react";
import Layout from "../../../components/layouts";

const privacyPolicy = ({ privacyPolicy }) => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Privacy Policy",
        subHeader: "",
        dividerText: "",
      }}
    >
      {privacyPolicy}
    </Layout>
  );
};

privacyPolicy.getInitialProps = async (context) => {
  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  return { privacyPolicy: site.privacyPolicy };
};

export default privacyPolicy;
