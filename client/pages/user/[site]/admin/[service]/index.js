import { buildClient } from "../../../../../api/build-client";
import AddUpdateProduct from "../../../../../components/user-site/AddUpdateProduct";
import { useRouter } from "next/router";

const index = ({ product }) => {
  return (
    <div>
      <AddUpdateProduct site={useRouter().query.site} product={product} />
    </div>
  );
};

index.getInitialProps = async (context) => {
  const { data: product } = await buildClient(context).get(
    `/api/product/${context.query.site}/${context.query.service}`
  );

  return { product };
};

export default index;
