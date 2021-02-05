import { buildClient } from "../../../../../api/build-client";
import ViewPhotos from "../../../../../components/user-site/ViewPhotos";
import { useRouter } from "next/router";
import UploadImage from "../../../../../components/util/UploadImage";

const Photo = ({ ownerId, productId, photos }) => {
  return (
    <div style={{ minHeight: "90vh" }}>
      <UploadImage
        productId={productId}
        path={useRouter().asPath}
        ownerId={ownerId}
      />
      <ViewPhotos photos={photos} />
    </div>
  );
};

Photo.getInitialProps = async (context) => {
  const { data: product } = await buildClient(context).get(
    `/api/product/${context.query.site}/${context.query.service}`
  );

  // photos by product id

  console.log(`/api/photos/${product.id}`);

  const { data: photos } = await buildClient(context).get(
    `/api/photos/${product.id}`
  );

  return { ownerId: product.site.ownerId, productId: product.id, photos };
};

export default Photo;
