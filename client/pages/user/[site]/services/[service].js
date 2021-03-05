import { buildClient } from "../../../../api/build-client";
import Layout from "../../../../components/layouts";
import CheckoutCard from "../../../../components/user-site/CheckoutCard";

const services = ({ product, isAdmin }) => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: product.title,
        subHeader: product.brief,
        dividerText: "Details",
      }}
    >
      <CheckoutCard product={product} isAdmin={isAdmin} />
    </Layout>
  );
};

services.getInitialProps = async (context) => {
  const { data: product } = await buildClient(context).get(
    `/api/product/${context.query.site}/${context.query.service}`
  );

  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );
  const user = currentUser.currentUser;

  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  let isAdmin;

  if (user) {
    isAdmin = site.ownerId === user.id;
  } else {
    isAdmin = false;
  }

  return { product, isAdmin };
};

export default services;
