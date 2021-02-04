import { buildClient } from "../../../api/build-client";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react";
import VertCenterGrid from "../../../components/grid/vert-center";
import { Fragment } from "react";
import TinyCard from "../../../components/card/tiny-card";

const index = ({ currentUser, siteExists, siteInfo }) => {
  const { site } = useRouter().query;

  const isSaas = site === "rfp";

  const { title, tagline, homeTitle, aboutUsTitle, aboutUsBlurb } = siteInfo;

  const isUserOfCurrentSite = currentUser
    ? site === currentUser.userOfSite
    : false;

  const claimSite = () => (
    <div>
      a site by the name of {site} doesn't exist yet - do you want to claim it?
      <Button>Claim</Button>
      <Button>View a Demo</Button>
      <Button>Learn More</Button>
    </div>
  );

  const aboutBlurb = () => <p style={{ padding: "50px" }}>{aboutUsBlurb}</p>;

  const existingSite = () => (
    <Fragment>
      <VertCenterGrid>
        <Header as="h2" textAlign="center">
          {homeTitle}
        </Header>
        <Header as="h3" textAlign="center">
          {tagline}
        </Header>
      </VertCenterGrid>

      <Container centered>
        <Segment>
          <Header textAlign="center">{aboutUsTitle}</Header>
          {aboutBlurb()}
          <Grid columns={2} columns="equal">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Card.Group centered>
                  <TinyCard
                    header="View Services"
                    description="Specific & upfront details on the services we offer."
                    linkTo={`/user/${title}/services`}
                  />

                  <TinyCard
                    header="Create Account"
                    description="Create an account to begin your service order."
                    linkTo={`/user/${title}/auth/signup`}
                  />
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </Fragment>
  );

  const saasPage = () => (
    <Fragment>
      <VertCenterGrid addWidth={200}>
        <Header as="h1" textAlign="center">
          flexible websites for complex services
          <Header.Subheader textAlign="center">
            + an engrained methodology for scaling your consultancy
          </Header.Subheader>
        </Header>

        <Button attached="bottom" fluid color="linkedin">
          <Icon className="arrow alternate circle right icon"></Icon>
        </Button>
      </VertCenterGrid>

      <Container centered>
        is this for me ? quiz. if you are figuring out your services, the
        services you currently provide aren't highly scalable, or you don't know
        what that means, this is for you.
        <Segment>
          <Header textAlign="center">
            Leverage the services you provide
            <Header.Subheader>
              Your consultancy is an <strong>idea validation</strong> machine
            </Header.Subheader>
          </Header>
          <p>
            Your willingness to put your boots on the ground, and do the work
            that needs to be done for your clients gives you a profound insight
            into the <strong>problems people will pay to solve</strong>. It also
            provides you with a <strong>case study</strong>, and a{" "}
            <strong>referenceable customer</strong>.
          </p>
          <ul></ul>
          <Container centered>
            <Segment>
              <Header textAlign="center">
                <strong>Problem</strong> + <strong>Case Study</strong> +{" "}
                <strong>Reference</strong> =
                <Header.Subheader>
                  A great first step towards a highly scalable company
                </Header.Subheader>
              </Header>
            </Segment>
          </Container>
        </Segment>
      </Container>

      <Container centered style={{ marginTop: "50px" }}>
        <Segment>
          <Header textAlign="center">
            Validate ideas for less time and capital investment
            <Header.Subheader>
              Quickly iterate through new ideas to find "the one"
            </Header.Subheader>
          </Header>
          <p>It's bad for the environment. Think of all the napkins!</p>
          <p>
            Most of us aren't equipped for the "silicon valley tech startup
            model" of throwing millions of dollars at an idea that has a 2%
            chance to work, but if it does, makes a billion dollars
          </p>
          <Container centered>
            <Segment>
              <Header textAlign="center">
                Perform, Define, and Evaluate services
                <Header.Subheader>
                  A second step towards a highly scalable company
                </Header.Subheader>
              </Header>
            </Segment>
          </Container>
        </Segment>
        <Button attached="bottom">Fast and Inexpensive Idea Validation</Button>
      </Container>

      <p>
        service site + monthly scalability assessment call $200/m. Is this idea
        worth pursuing further? what are the next steps?
      </p>
      <p>service website = $30/m</p>
    </Fragment>
  );

  return siteExists ? (isSaas ? saasPage() : existingSite()) : claimSite();
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");

  let siteExists = true;

  try {
    const res = await buildClient(context).get(
      `/api/site/${context.query.site}`
    );

    return { ...data, siteExists, siteInfo: res.data };
  } catch (error) {
    return { ...data, siteExists: false };
  }
};

export default index;
