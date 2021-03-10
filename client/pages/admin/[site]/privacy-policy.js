import { buildClient } from "../../../api/build-client";
import Layout from "../../../components/layouts";

const privacyPolicy = ({ privacyPolicy }) => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{ header: "Terms of Service", subHeader: "" }}
    >
      {privacyPolicy}
    </Layout>
  );
};

privacyPolicy.getInitialProps = async (context) => {
  console.log("requesting site...");
  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  console.log("request finished");

  return { privacyPolicy: site.privacyPolicy };
};

export default privacyPolicy;
