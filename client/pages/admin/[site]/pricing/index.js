import { Button, Icon, Card, Header } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Layout from "../../../../components/layouts";

const index = ({ packages }) => {
  const [active, setActive] = useState("solo");
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

  const showPackageIncludes = () => (
    <Card fluid>
      <Card.Content extra>
        <Icon name="check" /> {sites} Website
      </Card.Content>
      <Card.Content extra>
        <Icon name="check" /> {freeTrial} day free trial (1 click cancellation)
      </Card.Content>
      <Card.Content extra>
        <Icon name="check" /> Custom Domain
      </Card.Content>
      <Card.Content extra>
        <Icon name="check" /> Adminstrator Account
      </Card.Content>
      <Card.Content extra>
        <Icon name="check" /> Client Accounts
      </Card.Content>
      <Card.Content extra>
        <Icon name="check" /> Customer Relationship Manager
      </Card.Content>

      <Card.Content extra textAlign="center">
        <Icon name="dollar sign" />
        {/* {active ? packages[active].monthlyPrice : ""} */}
        {monthlyPrice} per month
      </Card.Content>
    </Card>
  );

  return (
    <Fragment>
      <Layout
        smallLeaderboard
        leaderboardData={{
          header: "Create your website",
          subHeader: "Cancel anytime & enjoy a 7 day free trial",
          dividerText: "Get Started",
        }}
      >
        {showPackageIncludes()}
        <Link href={`/admin/${site}/signup`}>
          <Button attached="bottom" fluid color="linkedin">
            Create an account to get started
          </Button>
        </Link>
      </Layout>
    </Fragment>
  );
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/site-subscription/rfp");

  return { ...data };
};

export default index;
