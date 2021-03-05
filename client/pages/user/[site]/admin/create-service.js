import { Container, Header } from "semantic-ui-react";
import AddUpdateProduct from "../../../../components/user-site/AddUpdateProduct";
import { useRouter } from "next/router";
import Layout from "../../../../components/layouts";

const createService = () => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Create a New Service Offering",
        subHeader: "",
      }}
    >
      <AddUpdateProduct site={useRouter().query.site} />
    </Layout>
  );
};

export default createService;
