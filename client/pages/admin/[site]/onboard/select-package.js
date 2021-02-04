import { Button, Icon, Card, Header } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import VertCenterGrid from "../../../../components/grid/vert-center";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../../../../components/payment/checkout-form";

const stripePromise = loadStripe(
  "pk_test_51HcBP1AbNtIO9WIz2YyuWzAj9jjcgkBW4m1CFzKTMa3F80USq2ic8Hg5BNBFQdV5CCSw8voWoMXZCGxw2RNLVulQ001jMUK3UP"
);

const index = ({ packages, currentUser, onePackage }) => {
  const [values, setValues] = useState({
    active: "feedback",
    payment: false,
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
          {/* {active ? packages[active].monthlyPrice : ""} */}
          {monthlyPrice} per month
        </Card.Content>
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

  const showPackagePayment = () => {
    title = capitalizeFirstLetter(title);

    return (
      <Elements stripe={stripePromise}>
        <Card fluid>
          <Card.Content extra>
            <Icon name="check" /> {freeTrial} day free trial
          </Card.Content>

          <Card.Content extra>
            <Icon name="check" /> Easy to cancel
          </Card.Content>

          <Card.Content extra>
            Billed at ${monthlyPrice} per month once your free trial expires
          </Card.Content>

          <CheckoutForm packageId={id} />
        </Card>
      </Elements>
    );
  };

  return (
    <Fragment>
      <VertCenterGrid>
        <Header textAlign="center">Three Packages Available</Header>
        <Button.Group fluid basic attached="top">
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
        </Button.Group>
        {payment ? showPackagePayment() : showPackageDetails()}
      </VertCenterGrid>
    </Fragment>
  );
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/site-subscription/rfp");

  return { ...data };
};

export default index;

// One website plus bi-monthly 2-hour consulting sessions with a technology startup expert. This package is best suited for those using the website as an MVP for proof of concept to raise funding.

// Iterate towards an investable company as quickly as possible with bi-monthly 2-hour long consulting sessions with a technology startup expert. Scalability, business model, business process (re)engineering, and your target market are common subjects.
