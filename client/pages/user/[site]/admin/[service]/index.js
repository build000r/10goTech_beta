import { buildClient } from "../../../../../api/build-client";
import AddUpdateProduct from "../../../../../components/user-site/AddUpdateProduct";
import { useRouter } from "next/router";
import Layout from "../../../../../components/layouts";

const index = ({ product }) => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Create a New Service Offering",
        subHeader: "",
      }}
    >
      <AddUpdateProduct site={useRouter().query.site} product={product} />
    </Layout>
  );
};

index.getInitialProps = async (context) => {
  const { data: product } = await buildClient(context).get(
    `/api/product/${context.query.site}/${context.query.service}`
  );

  return { product };
};

export default index;
