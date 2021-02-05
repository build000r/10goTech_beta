import {
  Card,
  Container,
  Header,
  Segment,
  Item,
  Divider,
} from "semantic-ui-react";
import AddUpdateProduct from "../../../../components/user-site/AddUpdateProduct";
import { useRouter } from "next/router";
import { buildClient } from "../../../../api/build-client";
import { useMediaQuery } from "../../../../hooks/use-media-query";

const users = ({ users }) => {
  if (!users) {
    return (
      <Header>
        When your first user signs up, their information will appear here.{" "}
      </Header>
    );
  }

  return (
    <Container>
      <Header>{users.length} total users </Header>
      <Segment basic style={{ minHeight: "90vh" }}>
        <Item.Group divided>
          <Card.Group itemsPerRow={useMediaQuery(700) ? 1 : 3}>
            {users.map((user) => {
              const { createdAt, email, id, name, phone } = user;

              return (
                <Card>
                  <Card.Content>
                    <Card.Header as="h3">
                      User created {new Date(createdAt).toLocaleDateString()} at{" "}
                      {new Date(createdAt).toLocaleTimeString()}
                    </Card.Header>
                    <Item>
                      <Item.Content>
                        <Divider horizontal>Customer info</Divider>
                        <Item.Meta>
                          <span>{name ? name : null}</span>
                        </Item.Meta>
                        <Item.Meta>
                          <span>{email}</span>
                        </Item.Meta>
                        <Item.Meta>
                          <span>{phone ? `Phone #: ${phone} ` : ""}</span>
                        </Item.Meta>
                        <Item.Description>
                          {/* {showProducts(products)} */}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Card.Content>
                  <Card.Content extra>
                    {/* {updateOrderStatus(id)} */}
                    {/* <Label>{crmStatus}</Label> */}
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Item.Group>
      </Segment>
      );
    </Container>
  );
};

users.getInitialProps = async (context) => {
  let { data: users } = await buildClient(context).get(
    `/api/users/by-site/${context.query.site}`
  );

  console.log(users);

  users = users.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return { users };
};

export default users;
