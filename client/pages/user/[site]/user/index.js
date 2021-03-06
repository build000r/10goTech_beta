import Link from "next/link";
import { Button, Grid, Header } from "semantic-ui-react";
import { useRouter } from "next/router";
import { buildClient } from "../../../../api/build-client";
import Layout from "../../../../components/layouts";

const index = () => {
  const { site } = useRouter().query;
  const isTempTitle = (sitetitle) => sitetitle.includes("Change_This_Title");

  const showItem = (href, link, meta) => (
    <Item>
      <Item.Content>
        <Item.Header as="a">
          <Link href={href}>{link}</Link>
          {/* <Icon name="hand point right" /> */}
        </Item.Header>
        <Item.Meta>{meta}</Item.Meta>
      </Item.Content>
    </Item>
  );

  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Client Portal",
        subHeader: "Place order",
        dividerText: "What would you like to do?",
      }}
    >
      <Button.Group
        vertical
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "-50px",
        }}
      >
        <Item.Group>
          {showItem(
            `/user/${site}/user/orders`,
            "Orders",
            "A history of your orders"
          )}
          {showItem(`/user/${site}/services`, "Browse Services", "")}
          {showItem(`/user/${site}/cart`, "View Cart", "")}
          {showItem(`/user/${site}/auth/signout`, "Sign Out", "")}
        </Item.Group>
      </Button.Group>
    </Layout>
  );
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  return { ...data };
};

export default index;
