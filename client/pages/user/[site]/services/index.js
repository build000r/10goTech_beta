import { buildClient } from "../../../../api/build-client";
import { Segment, Card, Button, Grid, Message } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "../../../../hooks/use-media-query";
import Slideshow from "../../../../components/util/Slideshow";
import Layout from "../../../../components/layouts";

const index = ({ products, isAdmin, siteTitle, site }) => {
  const adminLinks = (slug) =>
    isAdmin ? (
      <div>
        <Message floating>
          <Message.Header>Only the site owner can see this.</Message.Header>
          <Message.Content>
            <Link href={`/user/${siteTitle}/admin/${slug}`}>
              <Button>Edit Service</Button>
            </Link>
            <Link href={`/user/${siteTitle}/admin/${slug}/photo`}>
              <Button>Edit Photos</Button>
            </Link>
            <Link href={`/user/${siteTitle}/admin/${slug}/email`}>
              <Button>Edit Email</Button>
            </Link>
          </Message.Content>
        </Message>
      </div>
    ) : null;

  const productCard = (title, brief, link, id, slug) => (
    <Card raised key={id}>
      {adminLinks(slug)}
      <Slideshow productId={id} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{brief}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link href={link} className="mr-2">
          <Button fluid color="linkedin">
            View Details
          </Button>
        </Link>
      </Card.Content>
    </Card>
  );

  const renderItemsPerRow = (num) => (
    <Card.Group itemsPerRow={num}>
      {products.map((p) => {
        let { brief, clickOptions, description, id, site, title, slug } = p;

        return productCard(
          title,
          brief,
          `/user/${useRouter().query.site}/services/${slug}`,
          id,
          slug,
          site.title
        );
      })}
    </Card.Group>
  );

  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: site.servicesPageHeadline || "Capabilities",
        subHeader:
          site.servicesPageSubheadline ||
          "Discover, plan, and build a software company",
        dividerText: "Select Service(s)",
      }}
    >
      {isAdmin ? (
        <div>
          <Message floating>
            <Message.Header>Only the site owner can see this.</Message.Header>
            <Message.Content>
              <Link href={`/user/${siteTitle}/admin/create-service`}>
                <Button>Create a new Service</Button>
              </Link>
            </Message.Content>
          </Message>
        </div>
      ) : null}
      <Grid columns={1}>
        <Grid.Row verticalAlign="top" centered>
          <Grid.Column stretched>
            <Segment basic>
              {useMediaQuery(700) ? renderItemsPerRow(1) : renderItemsPerRow(3)}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

index.getInitialProps = async (context) => {
  const { data: products } = await buildClient(context).get(
    `/api/product/${context.query.site}`
  );

  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );
  const user = currentUser.currentUser;

  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  console.log(site);

  let isAdmin;

  if (user) {
    isAdmin = site.ownerId === user.id;
  } else {
    isAdmin = false;
  }

  const siteTitle = site.title;

  return { products, isAdmin, siteTitle, site };
};

export default index;
