import { Segment, Header, Card, Item } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import moment from "moment";

const orders = ({ orders }) => {
  const purchaseHistoryCard = (history) => {
    return (
      <Segment basic style={{ minHeight: "90vh" }}>
        <Header textAlign="center">
          Requests Submitted
          <Header.Subheader>
            Please check your email for further details on how to proceed.
          </Header.Subheader>
        </Header>

        <Card.Group centered>
          {history.map((h, i) => {
            return h.products.map((p, i) => {
              return (
                <Card
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Item.Content
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  >
                    <Item.Header as="a">{p.title}</Item.Header>
                    <Item.Description>{h.status}</Item.Description>
                    <Item.Description>
                      {moment(h.createdAt).fromNow()}
                    </Item.Description>
                    <Item.Description>
                      {" "}
                      {p.clickOptionsSelected.map((o) => (
                        <Item.Extra>
                          <i class="check icon"></i>
                          {o.name}
                        </Item.Extra>
                      ))}
                      <Item.Extra>
                        <i class="sticky note outline icon"></i> {p.userMessage}
                      </Item.Extra>
                    </Item.Description>
                  </Item.Content>
                </Card>
              );
            });
          })}
        </Card.Group>
      </Segment>
    );
  };

  return <div>{purchaseHistoryCard(orders)}</div>;
};

orders.getInitialProps = async (context) => {
  const client = buildClient(context);

  const { data: currentUser } = await client.get("/api/users/currentuser");
  const user = currentUser.currentUser;

  const { data: orders } = await client.get(`/api/orders/${user.userOfSite}`);

  return { user, orders };
};

export default orders;
