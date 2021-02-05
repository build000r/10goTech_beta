import {
  Card,
  Button,
  Message,
  Container,
  Segment,
  Header,
} from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import VertCenterGrid from "../../../../components/grid/vert-center";
import Link from "next/link";
import { Fragment } from "react";
import { useAuth } from "../../../../hooks/use-auth";
import { useRouter } from "next/router";

const sites = ({ user, sites }) => {
  const isTempTitle = (sitetitle) => sitetitle.includes("Change_This_Title");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const createSite = () => (
    <div>
      <Message floating>
        <Message.Content>
          <Link href={`/admin/${user.userOfSite}/onboard/select-package`}>
            <Button color="linkedin" fluid>
              Create New Website
            </Button>
          </Link>
        </Message.Content>
      </Message>
    </div>
  );

  const renderIfAuth = () => {
    return (
      <Container style={{ minHeight: "90vh" }}>
        <div>{createSite()}</div>
        <Segment>
          <Header>Your Websites</Header>
          <Card.Group>
            {sites.length > 0
              ? sites.map((s) => (
                  <Card key={s.title}>
                    <Card.Content>
                      <Card.Header as="h3">
                        {isTempTitle(s.title)
                          ? "Your New Site!"
                          : capitalizeFirstLetter(s.title) + " Site"}
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Link
                          href={`/admin/${user.userOfSite}/account/${s.title}`}
                        >
                          <Button basic color="blue">
                            Subscription
                          </Button>
                        </Link>
                        <Link href={`/user/${s.title}/admin`}>
                          <Button basic color="green">
                            Site
                          </Button>
                        </Link>
                      </div>
                    </Card.Content>
                  </Card>
                ))
              : "no sites created yet"}
          </Card.Group>
        </Segment>
      </Container>
    );
  };

  return useAuth({
    user,
    currentUrlSite: useRouter().query.site,
    renderIfAuth,
  });
};

sites.getInitialProps = async (context) => {
  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const user = currentUser.currentUser;

  if (user) {
    const { data: userSites } = await buildClient(context).get(`/api/site`);

    const sites = userSites.userSites;

    return { user, sites };
  } else {
    return { user };
  }
};

export default sites;
