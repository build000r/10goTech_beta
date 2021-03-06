// create the email associated with this service

import { buildClient } from "../../../../../api/build-client";
import UpdateOrderEmail from "../../../../../components/user-site/UpdateOrderEmail";
import Layout from "../../../../../components/layouts";
import { useRouter } from "next/router";

const index = ({ email, ownerId }) => {
  return (
    <Layout
      leaderboardData={{
        header: "Customize your automated reply",
        subHeader: "This is email is sent immediately upon receipt of order",
      }}
    >
      <UpdateOrderEmail
        email={email}
        path={useRouter().asPath}
        ownerId={ownerId}
      />
    </Layout>
  );
};

index.getInitialProps = async (context) => {
  const { data: product } = await buildClient(context).get(
    `/api/product/${context.query.site}/${context.query.service}`
  );

  const { data: email } = await buildClient(context).get(
    `/api/notification/email-by-product/${product.id}`
  );

  return { email, ownerId: product.site.ownerId };
};

export default index;
