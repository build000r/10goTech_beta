import { buildClient } from "../../../api/build-client";
import { Segment, Header } from "semantic-ui-react";

const tos = ({ tos }) => {
  return (
    <Segment basic style={{ minHeight: "90vh" }}>
      <Header as="h2" textAlign="center">
        Privacy Policy
      </Header>
      {tos}
    </Segment>
  );
};

tos.getInitialProps = async (context) => {
  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  return { tos: site.termsOfService };
};

export default tos;
