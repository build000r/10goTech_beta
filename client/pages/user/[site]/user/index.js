import Link from "next/link";
import { Button, Grid, Header } from "semantic-ui-react";
import { useRouter } from "next/router";
import { buildClient } from "../../../../api/build-client";

const index = () => {
  const { site } = useRouter().query;
  const isTempTitle = (sitetitle) => sitetitle.includes("Change_This_Title");

  return (
    <div>
      <Header as="h1" textAlign="center">
        User Dashboard
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
              <Link href={`/user/${site}/user/orders`}>
                <Button
                  size="huge"
                  style={{ marginBottom: "15px", width: "250px" }}
                >
                  orders
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

  return { ...data };
};

export default index;
