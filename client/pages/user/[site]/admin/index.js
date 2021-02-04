import Link from "next/link";
import { Button, Grid, Header } from "semantic-ui-react";
import { useRouter } from "next/router";
import { buildClient } from "../../../../api/build-client";

const index = ({ userOfSite }) => {
  const { site } = useRouter().query;
  const isTempTitle = (sitetitle) => sitetitle.includes("Change_This_Title");

  return (
    <div>
      <Header as="h1" textAlign="center">
        Administrator Dashboard
        <br />
        for
        <br />
        {isTempTitle(site) ? "Your New Site" : site}
      </Header>
      ;
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
              <Link href={`/admin/${userOfSite}/account/${site}`}>
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
    </div>
  );
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const { userOfSite } = currentUser.currentUser;

  return { ...data, userOfSite };
};

export default index;
