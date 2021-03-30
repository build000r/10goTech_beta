import { useRouter } from "next/router";
import { buildClient } from "../../../../api/build-client";
import { useAuth } from "../../../../hooks/use-auth";
import { CurrentSubscription } from "../../../../components/payment/CurrentSubscription";

import Layout from "../../../../components/layouts";
import { Fragment } from "react";

const subscriptionDetails = ({ user, sub, pay }) => {
  const { subscription } = useRouter().query;

  const renderIfAuth = () => {
    return (
      <Layout
        smallLeaderboard
        leaderboardData={{
          header: `${subscription} subscription details`,
          subHeader: `id: ${sub.id}`,
          btnText: "",
          btnPath: "",
          dividerText: "Update or Cancel",
        }}
      >
        <Fragment>
          <CurrentSubscription
            subscription={sub}
            pay={pay}
            site={subscription}
            userOfSite={user.userOfSite}
          />
        </Fragment>
      </Layout>
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

  console.log(sub, pay);
  return { user, sub, pay };
};

export default subscriptionDetails;
