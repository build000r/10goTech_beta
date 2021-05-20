import { useState } from "react";
import { useRouter } from "next/router";
import { Divider, Icon, Item, Grid, Card, Button } from "semantic-ui-react";
import Layout from "../layouts";
import { Signup } from "../auth/signup-basic";
import newService from "../media/fence-loop.gif";
import homepage from "../media/homepage.gif";
import orderFence from "../media/order-fence.gif";
import orders from "../media/orders.gif";
import reply from "../media/reply.gif";

import { Fragment } from "react";
import { useMediaQuery } from "../../hooks/use-media-query";

const LandingPage = () => {
  const [active, setActive] = useState("what");
  const [jargon, setJargon] = useState("Off");

  //   const { site } = useRouter().query;
  const site = "rfp";

  const showItem = ({ header, subheader, paragraph1, demo1, paragraph2 }) => (
    <Item key={header}>
      <Item.Content>
        <Item.Header>{header}</Item.Header>
        <Item.Meta>{subheader}</Item.Meta>
        <Item.Description>
          <a href={`https://${demo1}`} target="_blank">
            {demo1}
          </a>
          {paragraph1}
        </Item.Description>
        <Item.Description>
          <p>{paragraph2}</p>
        </Item.Description>
      </Item.Content>
    </Item>
  );

  const ActiveContentTemplate = ({ items }) => (
    <Fragment>
      <Item.Group divided>{items.map((item) => showItem(item))}</Item.Group>
    </Fragment>
  );

  const showGoals = (icon, noIcon) => {
    return (
      <Grid
        columns={useMediaQuery(600) ? 1 : 3}
        divided={useMediaQuery(600) ? false : true}
      >
        <Grid.Row textAlign="center">
          <Grid.Column
            style={{ marginTop: useMediaQuery(600) ? "30px" : "0px" }}
          >
            <Item>
              <Item.Content>
                <Item.Header as="h3">
                  Show the world you mean business
                </Item.Header>
                <Item.Meta>
                  Build trust with current and future clients
                </Item.Meta>
              </Item.Content>
              <Item.Content style={{ marginTop: "20px" }}>
                <Item.Extra>
                  <Icon color="green" name="check" /> Credibility
                </Item.Extra>
                <Item.Extra>
                  <Icon color="green" name="check" /> Legitimacy
                </Item.Extra>
                <Item.Extra>
                  <Icon color="green" name="check" /> Confidence
                </Item.Extra>
              </Item.Content>
            </Item>
          </Grid.Column>
          <Grid.Column
            style={{ marginTop: useMediaQuery(600) ? "30px" : "0px" }}
          >
            <Item>
              <Item.Content>
                <Item.Header as="h3">Communicate efficiently</Item.Header>

                <Item.Description>
                  Spend less time explaining what you can do
                </Item.Description>
              </Item.Content>
              <Item.Content style={{ marginTop: "20px" }}>
                <Item.Extra>
                  <Icon color="green" name="check" /> Share link
                </Item.Extra>
                <Item.Extra>
                  <Icon color="green" name="check" /> Get order
                </Item.Extra>
                <Item.Extra>
                  <Icon color="green" name="check" /> Auto reply
                </Item.Extra>
              </Item.Content>
            </Item>
          </Grid.Column>
          <Grid.Column
            style={{ marginTop: useMediaQuery(600) ? "30px" : "0px" }}
          >
            <Item>
              <Item.Content>
                <Item.Header as="h3">Keep up with new clients</Item.Header>

                <Item.Description>
                  Remember who wanted what when
                </Item.Description>
              </Item.Content>
              <Item.Content style={{ marginTop: "20px" }}>
                <Item.Extra>
                  <Icon color="green" name="check" /> View orders
                </Item.Extra>
                <Item.Extra>
                  <Icon color="green" name="check" /> View clients
                </Item.Extra>
                <Item.Extra>
                  <Icon color="green" name="check" /> Easily filter
                </Item.Extra>
              </Item.Content>
            </Item>{" "}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  return (
    <Layout
      fullPageLeaderboard
      leaderboardData={{
        header: "Build Your Website Now",
        subHeader: "Website builder for service based businesses",
        btnText: "TRY ME",
        btnPath: `/admin/${site}/signup`,
        dividerText: "Focus on what matters",
      }}
    >
      {showGoals("check", "close")}
      <Divider style={{ marginTop: "10vh", marginBottom: "10vh" }} horizontal>
        Build website quickly
      </Divider>

      <Card.Group centered textAlign="center" itemsPerRow={1}>
        <Card basic style={{ maxWidth: "300px" }}>
          <Card.Content>
            <Card.Header textAlign="center">
              Introduce Your Business
            </Card.Header>
          </Card.Content>
          <img src={homepage} loading="lazy" />
        </Card>
        <Card basic style={{ maxWidth: "300px" }}>
          <Card.Content>
            <Card.Header textAlign="center">Define Your Services</Card.Header>
          </Card.Content>
          <img src={newService} loading="lazy" />
        </Card>
        <Card basic style={{ maxWidth: "300px" }}>
          <Card.Content>
            <Card.Header textAlign="center">Share Your Website</Card.Header>
          </Card.Content>
          <img src={orderFence} loading="lazy" />
        </Card>
      </Card.Group>

      <Divider style={{ marginTop: "10vh", marginBottom: "10vh" }} horizontal>
        Manage client relationships
      </Divider>
      <Card.Group centered textAlign="center" itemsPerRow={1}>
        <Card basic style={{ maxWidth: "300px" }}>
          <Card.Content>
            <Card.Header textAlign="center">Reply Automatically</Card.Header>
          </Card.Content>
          <img src={reply} loading="lazy" />
        </Card>
        <Card basic style={{ maxWidth: "300px" }}>
          <Card.Content>
            <Card.Header textAlign="center">Organize Your Orders</Card.Header>
          </Card.Content>
          <img src={orders} loading="lazy" />
        </Card>
      </Card.Group>

      <div style={{ marginTop: "10vh", marginBottom: "10vh" }}>
        <Divider style={{ marginBottom: "10vh" }} horizontal>
          Get Started Now
        </Divider>
        <Signup createSitePermission="true" />
      </div>
    </Layout>
  );
};

export default LandingPage;
