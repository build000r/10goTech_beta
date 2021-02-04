import { buildClient } from "../../../api/build-client";
import { Segment, Header } from "semantic-ui-react";

const privacyPolicy = ({ privacyPolicy }) => {
  return (
    <Segment basic style={{ minHeight: "90vh" }}>
      <Header as="h2" textAlign="center">
        Privacy Policy
      </Header>
      {privacyPolicy}
    </Segment>
  );
};

privacyPolicy.getInitialProps = async (context) => {
  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  return { privacyPolicy: site.privacyPolicy };
};

export default privacyPolicy;
