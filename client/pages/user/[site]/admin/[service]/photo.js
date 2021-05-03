import { buildClient } from "../../../../../api/build-client";
import ViewPhotos from "../../../../../components/user-site/ViewPhotos";
import UploadImage from "../../../../../components/util/UploadImage";
import Layout from "../../../../../components/layouts";

const Photo = ({ ownerId, productId, photos }) => {
  return (
    <Layout
      smallLeaderboard
      leaderboardData={{ header: "Upload an Image", subHeader: "" }}
    >
      <UploadImage
        productId={productId}
        // path={useRouter().asPath}
        ownerId={ownerId}
      />
      {photos.length > 0 && <ViewPhotos photos={photos} />}
    </Layout>
  );
};

// Photo.getInitialProps = async (context) => {};

export async function getServerSideProps(context) {
  const { req, res, query } = context;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1, stale-while-revalidate=59"
  );

  // res.setHeader("content-type", "multipart/form-data");

  const { data: product } = await buildClient(context).get(
    `/api/product/${context.query.site}/${context.query.service}`
  );

  console.log(`/api/photos/${product.id}`);

  const { data: photos } = await buildClient(context).get(
    `/api/photos/${product.id}`
  );

  return {
    props: { ownerId: product.site.ownerId, productId: product.id, photos },
  };
}

export default Photo;
