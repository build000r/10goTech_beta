import { Button, Icon, Card, Header } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import VertCenterGrid from "../../../../components/grid/vert-center";

const index = ({ packages }) => {
  const [active, setActive] = useState("feedback");
  const { site } = useRouter().query;

  const activePackage = packages.find((p, i) => {
    if (p.title === active) {
      return p;
    }
  });

  const { description, freeTrial, sites, monthlyPrice, title } = activePackage;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Fragment>
      <VertCenterGrid>
        <Header textAlign="center">Three Packages Available</Header>

        <Button.Group fluid basic attached="top">
          {packages.map((p) => (
            <Button
              key={p.id}
              active={active === p.title}
              onClick={() => setActive(`${p.title}`)}
            >
              {capitalizeFirstLetter(p.title)}
            </Button>
          ))}
        </Button.Group>
        <Card fluid>
          <Card.Content>
            <Card.Meta>{description}</Card.Meta>
          </Card.Content>

          <Card.Content extra>
            <Icon name="check" /> {freeTrial} day free trial (w/ easy
            cancellation)
          </Card.Content>
          <Card.Content extra>
            <Icon name="check" /> {sites} Website
          </Card.Content>
          <Card.Content extra>
            <Icon name="check" /> Client Accounts
          </Card.Content>
          <Card.Content extra>
            <Icon name="check" /> Admin Account
          </Card.Content>
          <Card.Content extra>
            <Icon name="check" /> Service Order/Email Automation
          </Card.Content>

          <Card.Content extra textAlign="center">
            <Icon name="dollar sign" />
            {monthlyPrice} per month
          </Card.Content>
        </Card>
        <Link href={`/admin/${site}/signup`}>
          <Button attached="bottom" fluid color="linkedin">
            Create an account to get started
          </Button>
        </Link>
      </VertCenterGrid>
    </Fragment>
  );
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/site-subscription/rfp");

  return { ...data };
};

export default index;
