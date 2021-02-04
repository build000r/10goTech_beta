import { Container, Header } from "semantic-ui-react";
import AddUpdateProduct from "../../../../components/user-site/AddUpdateProduct";
import { useRouter } from "next/router";

const createService = () => {
  return (
    <Container style={{ minHeight: "90vh" }}>
      <Header>Create a New Service Offering</Header>
      <AddUpdateProduct site={useRouter().query.site} />
    </Container>
  );
};

export default createService;
