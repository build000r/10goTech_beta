import { useState } from "react";
import {
  Item,
  Divider,
  Segment,
  Button,
  Header,
  Label,
  Card,
  Dropdown,
  Container,
} from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import { useMediaQuery } from "../../../../hooks/use-media-query";
import { useRequest } from "../../../../hooks/use-request";
import Router, { useRouter } from "next/router";
import Layout from "../../../../components/layouts";

const services = ({ orders, siteUsers }) => {
  console.log(orders);
  if (orders.length === 0) {
    return (
      <Container style={{ minHeight: "90vh" }}>
        <Header>
          When you receive your first order, it will show up here.
        </Header>
      </Container>
    );
  }

  const path = useRouter().asPath;

  const [values, setValues] = useState({
    ownerNote: "Order is currently being reviewed",
    crmStatus: "",
    orderId: "",
    loading: false,
  });

  const { ownerNote, crmStatus, orderId } = values;

  const { doRequest, errors } = useRequest({
    url: `/api/order`, // MUST CHANGE
    method: "put",
    body: {
      ownerNote,
      crmStatus,
      orderId,
    },
    onSuccess: () => Router.push(path),
  });

  const options = [
    { key: "created", icon: "edit", text: "Created", value: "created" },
    {
      key: "following-up",
      icon: "phone",
      text: "Following up",
      value: "following-up",
    },
    {
      key: "closed-won",
      icon: "check",
      text: "Closed won",
      value: "closed-won",
    },
    {
      key: "closed-lost",
      icon: "delete",
      text: "Closed lost",
      value: "closed-lost",
    },
  ];

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault(); // keep browser from reloading when btn click

    setValues({ ...values, loading: true });

    await doRequest();

    setValues({ ...values, loading: false });
  };

  const updateOrderStatus = (orderId) => (
    <Button.Group floated="right" color="teal">
      <Button onClick={clickSubmit}>Update Status</Button>
      <Dropdown
        onChange={(e) => {
          return setValues({
            ...values,
            crmStatus: options.filter((o) => o.text === e.target.outerText)[0]
              .key,
            orderId,
          });
        }}
        className="button icon"
        floating
        options={options}
        trigger={<></>}
      />
    </Button.Group>
  );

  // do request update status /api/order put

  const filterByStatus = () => <div>only show orders with certain status</div>;

  const showProducts = (products) => {
    return products.map((product) => {
      let {
        brief,
        clickOptionsSelected,
        id,
        site,
        title,
        userMessage,
      } = product;

      return (
        <Item>
          <Divider horizontal>Service Requested</Divider>{" "}
          <Item.Content>
            <Item.Header as="h4">{title}</Item.Header>
            <Item.Meta>{brief}</Item.Meta>
            {clickOptionsSelected.map((o, i) => (
              <Item.Extra key={i}>
                <i class="check icon"></i>
                {o.name}
              </Item.Extra>
            ))}
            <Item.Description>
              {" "}
              <i class="sticky note outline icon"></i> {userMessage}
            </Item.Description>
          </Item.Content>
        </Item>
      );
    });
  };

  const getOrderer = (id) =>
    siteUsers.filter((u) => u.id === id || u._id === id);

  return (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Order History",
        subHeader: "View and update orders",
        dividerText: "What would you like to do?",
      }}
    >
      <Item.Group divided>
        <Card.Group centered itemsPerRow={useMediaQuery(700) ? 1 : 3}>
          {orders.map((order) => {
            let { crmStatus, userId, products, id } = order;

            let orderer;

            if (id) {
              orderer = getOrderer(userId)[0];
            }

            const { name, email, phone, createdAt } = orderer;

            return (
              <Card>
                <Card.Content>
                  <Card.Header as="h3">
                    Order created {new Date(createdAt).toLocaleDateString()} at{" "}
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
                        {showProducts(products)}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Card.Content>
                <Card.Content extra>
                  {updateOrderStatus(id)}
                  <Label>{crmStatus}</Label>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </Item.Group>
    </Layout>
  );
};

services.getInitialProps = async (context) => {
  let { data: orders } = await buildClient(context).get(
    `/api/orders/${context.query.site}`
  );

  const { data: siteUsers } = await buildClient(context).get(
    `/api/users/by-site/${context.query.site}`
  );

  orders = orders.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return { orders, siteUsers };
};

export default services;
