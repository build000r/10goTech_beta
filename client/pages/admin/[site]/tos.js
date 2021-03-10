import { buildClient } from "../../../api/build-client";
import Layout from "../../../components/layouts";

const tos = ({ tos }) => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{ header: "Terms of Service", subHeader: "" }}
    >
      {tos}
    </Layout>
  );
};

tos.getInitialProps = async (context) => {
  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  return { tos: site.termsOfService };
};

export default tos;
