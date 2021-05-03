// create the email associated with this service

import { buildClient } from "../../../../../api/build-client";
import UpdateOrderEmail from "../../../../../components/user-site/UpdateOrderEmail";
import Layout from "../../../../../components/layouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = ({ email, ownerId }) => {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(
    false
  );

  useEffect(() => {
    // update some client side state to say it is now safe to render the client-side only component
    setRenderClientSideComponent(true);
  });

  return (
    <Layout
      leaderboardData={{
        header: "Customize your automated reply",
        subHeader: "This is email is sent immediately upon receipt of order",
      }}
    >
      {renderClientSideComponent && (
        <UpdateOrderEmail
          email={email}
          path={useRouter().asPath}
          ownerId={ownerId}
        />
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { req, res, query } = context;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1, stale-while-revalidate=59"
  );

  const { data: product } = await buildClient(context).get(
    `/api/product/${context.query.site}/${context.query.service}`
  );

  const { data: email } = await buildClient(context).get(
    `/api/notification/email-by-product/${product.id}`
  );

  return {
    props: { email, ownerId: product.site.ownerId },
  };
}

export default index;
