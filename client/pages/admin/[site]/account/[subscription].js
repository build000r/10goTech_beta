import { useRouter } from "next/router";
import VertCenterGrid from "../../../../components/grid/vert-center";
import { buildClient } from "../../../../api/build-client";
import { useAuth } from "../../../../hooks/use-auth";
import { CurrentSubscription } from "../../../../components/payment/CurrentSubscription";
import { UpdatePaymentPerSubscription } from "../../../../components/payment/UpdatePaymentPerSubscription";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HcBP1AbNtIO9WIz2YyuWzAj9jjcgkBW4m1CFzKTMa3F80USq2ic8Hg5BNBFQdV5CCSw8voWoMXZCGxw2RNLVulQ001jMUK3UP"
);

const subscriptionDetails = ({ user, sub, pay }) => {
  const { subscription } = useRouter().query;

  const renderIfAuth = () => {
    return (
      <div>
        <VertCenterGrid>
          <CurrentSubscription
            subscription={sub}
            pay={pay}
            site={subscription}
            userOfSite={user.userOfSite}
          />

          <Elements stripe={stripePromise}>
            <UpdatePaymentPerSubscription subscription={sub} />
          </Elements>
        </VertCenterGrid>
      </div>
    );
  };

  return useAuth({
    user,
    currentUrlSite: useRouter().query.site,
    renderIfAuth,
  });
};

subscriptionDetails.getInitialProps = async (context) => {
  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const user = currentUser.currentUser;

  const { data } = await buildClient(context).get(
    `/api/site/${context.query.subscription}`
  );

  const { data: subscription } = await buildClient(context).get(
    `/api/site-subscriptions/subscription/${data.subscriptionId}`
  );

  const sub = subscription.subscription;
  const pay = subscription.paymentMethod;

  return { user, sub, pay };
};

export default subscriptionDetails;
