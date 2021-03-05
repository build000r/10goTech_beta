import { buildClient } from "../../../api/build-client";
import { Segment, Header } from "semantic-ui-react";
import Layout from "../../../components/layouts";

const tos = ({ tos }) => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Terms of Service",
        subHeader: "",
        dividerText: "",
      }}
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
