import { Button, Icon, Card, Header } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../../../../components/payment/checkout-form";
import Layout from "../../../../components/layouts";

const stripePromise = loadStripe(
  "pk_live_51HcBP1AbNtIO9WIzJZdkXSA3YTs4VwLHf9V5PjtLraiKEQFoZE8UfWn7rT1FYpaoLEoeWmdBltvjdseEZRpIyQEK00C4GPYpLW"
);

const index = ({ packages, currentUser, onePackage }) => {
  const [values, setValues] = useState({
    active: "solo",
    payment: true,
  });

  const { active, payment } = values;

  const { site } = useRouter().query;

  const activePackage = packages.find((p, i) => {
    if (p.title === active) {
      return p;
    }
  });

  let {
    description,
    freeTrial,
    sites,
    monthlyPrice,
    title,
    id,
  } = activePackage;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const showPackageDetails = () => (
    <Fragment>
      <Card fluid>
        {/* <Card.Content>
          <Card.Meta>{description}</Card.Meta>
        </Card.Content> */}
        {showPackageIncludes()}
      </Card>
      {/* <Link href={`/admin/${site}/pricing/${title}`}> */}
      <Button
        attached="bottom"
        fluid
        color="linkedin"
        onClick={() =>
          setValues({
            ...values,
            payment: true,
          })
        }
      >
        Choose {title} package
      </Button>
      {/* </Link> */}
    </Fragment>
  );

  const showPackageIncludes = () => (
    <Fragment>
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
    </Fragment>
  );

  const showPackagePayment = () => {
    title = capitalizeFirstLetter(title);

    return (
      <Elements stripe={stripePromise}>
        <Card fluid>
          {showPackageIncludes()}
          <CheckoutForm packageId={id} />
        </Card>
      </Elements>
    );
  };

  const showContent = () => (
    <Fragment>
      {/* <Button.Group fluid basic attached="top">
        {packages.map((p) => (
          // <Link href={`/admin/${site}/pricing/${p.title}`}>
          <Button
            key={p.id}
            active={active === p.title}
            onClick={() =>
              setValues({
                active: `${p.title}`,
                payment: false,
              })
            }
          >
            {capitalizeFirstLetter(p.title)}
          </Button>
        ))}
      </Button.Group> */}
      {payment ? showPackagePayment() : showPackageDetails()}
    </Fragment>
  );

  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Create your website",
        subHeader: "Cancel anytime & enjoy a 7 day free trial",
        dividerText: "Get Started",
      }}
    >
      {showContent()}
    </Layout>
  );
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/site-subscription/rfp");

  return { ...data };
};

export default index;

// One website plus bi-monthly 2-hour consulting sessions with a technology startup expert. This package is best suited for those using the website as an MVP for proof of concept to raise funding.

// Iterate towards an investable company as quickly as possible with bi-monthly 2-hour long consulting sessions with a technology startup expert. Scalability, business model, business process (re)engineering, and your target market are common subjects.
