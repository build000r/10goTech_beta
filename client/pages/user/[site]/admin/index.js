import Link from "next/link";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Item,
  Segment,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { buildClient } from "../../../../api/build-client";
import { useAuth } from "../../../../hooks/use-auth";
import Layout from "../../../../components/layouts";

const index = ({ user, siteOwnerId }) => {
  const { site } = useRouter().query;

  console.log(site);

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

  const renderIfAuth = () => (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Admin Account Menu",
        subHeader: "Update the content and configuration of your website",
        dividerText: "What would you like to do?",
      }}
    >
      <Item.Group>
        {showItem(
          `/user/${site}/admin/update`,
          "Update Site",
          "Site Content & Email Configuration"
        )}
        {showItem(
          `/admin/${user.userOfSite}/account/${site}`,
          "Manage Subscription",
          "Update your payment method & adjust or cancel your subscription"
        )}
        {showItem(
          `/user/${site}/admin/create-service`,
          "Create New Service",
          "Create new order-able items for your website users to view."
        )}
        {showItem(`/user/${site}/admin/orders`, "View Orders", "orders")}
        {showItem(`/user/${site}/admin/users`, "View Users", "orders")}
        {showItem(`/user/${site}/auth/signout`, "Sign out", "")}
      </Item.Group>
    </Layout>
  );

  return useAuth({
    user,
    currentUrlSite: site,
    renderIfAuth,
    siteOwnerId,
  });

  return renderIfAuth();
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const siteOwnerId = data.ownerId;

  const user = currentUser.currentUser;

  return { user, siteOwnerId };
};

export default index;
