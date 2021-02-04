import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import VertCenterGrid from "../../../../../components/grid/vert-center";
import { buildClient } from "../../../../../api/build-client";
import { CheckoutForm } from "../../../../../components/payment/checkout-form";
import { Card, Header } from "semantic-ui-react";

const stripePromise = loadStripe(
  "pk_test_51HcBP1AbNtIO9WIz2YyuWzAj9jjcgkBW4m1CFzKTMa3F80USq2ic8Hg5BNBFQdV5CCSw8voWoMXZCGxw2RNLVulQ001jMUK3UP"
);

const Package = ({ onePackage }) => {
  let { title, monthlyPrice, freeTrial } = onePackage;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  title = capitalizeFirstLetter(title);

  return (
    <VertCenterGrid>
      <Elements stripe={stripePromise}>
        <Card centered>
          <Card.Content>
            <Card.Content extra>
              <Icon name="check" /> {freeTrial} day free trial. Easy to cancel.
            </Card.Content>
            <Card.Meta>
              Once the free trial expires, you will be billed ${monthlyPrice}{" "}
              per month. Cancel anytime.
            </Card.Meta>
            <CheckoutForm packageId={onePackage.id} />
          </Card.Content>
        </Card>
      </Elements>
    </VertCenterGrid>
  );
};

Package.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get(
    `/api/site-subscription/rfp/${context.query.package}`
  );

  return { ...data };
};

export default Package;
