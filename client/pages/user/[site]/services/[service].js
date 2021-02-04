import { buildClient } from "../../../../api/build-client";
import CheckoutCard from "../../../../components/user-site/CheckoutCard";

const services = ({ product, isAdmin }) => {
  return <CheckoutCard product={product} isAdmin={isAdmin} />;
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
