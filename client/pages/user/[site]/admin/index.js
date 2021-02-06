import Link from "next/link";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { useRouter } from "next/router";
import { buildClient } from "../../../../api/build-client";
import { useAuth } from "../../../../hooks/use-auth";

const index = ({ user, siteOwnerId }) => {
  const { site } = useRouter().query;

  console.log(site);

  const isTempTitle = (sitetitle) => sitetitle.includes("Change_This_Title");

  const renderIfAuth = () => (
    <Container style={{ minHeight: "90vh" }}>
      <Segment>
        <Header as="h1" textAlign="center">
          Admin Account Menu
        </Header>

        <Grid columns={1} style={{ height: "80vh" }}>
          <Grid.Row verticalAlign="middle">
            <Grid.Column stretched>
              <Button.Group
                vertical
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "-50px",
                }}
              >
                <Link href={`/user/${site}/admin/update`}>
                  <Button
                    size="huge"
                    style={{ marginBottom: "15px", width: "250px" }}
                  >
                    Update Site
                  </Button>
                </Link>
                <Link href={`/admin/${user.userOfSite}/account/${site}`}>
                  <Button
                    size="huge"
                    style={{ marginBottom: "15px", width: "250px" }}
                  >
                    Manage Subscription
                  </Button>
                </Link>

                <Link href={`/user/${site}/admin/create-service`}>
                  <Button
                    size="huge"
                    style={{ marginBottom: "15px", width: "250px" }}
                  >
                    Create New Service
                  </Button>
                </Link>
                <Link href={`/user/${site}/admin/orders`}>
                  <Button
                    size="huge"
                    style={{ marginBottom: "15px", width: "250px" }}
                  >
                    View Orders
                  </Button>
                </Link>
                <Link href={`/user/${site}/admin/users`}>
                  <Button
                    size="huge"
                    style={{ marginBottom: "15px", width: "250px" }}
                  >
                    View Users
                  </Button>
                </Link>
                <Link href={`/user/${site}/auth/signout`}>
                  <Button
                    size="huge"
                    style={{ marginBottom: "15px", width: "250px" }}
                  >
                    Sign Out
                  </Button>
                </Link>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
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
