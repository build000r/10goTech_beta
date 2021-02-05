import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button, Form, Card } from "semantic-ui-react";
import { useState } from "react";
import Router, { useRouter } from "next/router";

import { useRequest } from "../../hooks/use-request";

const CheckoutForm = ({ packageId }) => {
  const { site } = useRouter().query;

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const subscribeRequest = async (paymentMethod) => {
    const res = await axios.post("/api/site-subscription/subscribe", {
      packageId,
      paymentMethod,
    });

    res.data.subscription.id;
    return res.data;
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      setLoading(true);

      await subscribeRequest(paymentMethod);

      Router.push(`/admin/${site}/account/sites`);
    }
  };

  return (
    <Card centered fluid>
      <form onSubmit={handleSubmit}>
        <Card.Content>
          <CardElement
            style={{ padding: "10px", margin: "10px" }}
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <Button
            attached="bottom"
            fluid
            color="linkedin"
            type="submit"
            disabled={!stripe}
            style={{ marginTop: "10px" }}
            onClick={handleSubmit}
            loading={loading}
          >
            Pay
          </Button>
        </Card.Content>
      </form>
    </Card>
  );
};

export { CheckoutForm };
