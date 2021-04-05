import { useEffect, useState } from "react";
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

const services = ({ serverOrders, siteUsers }) => {
  const [orders, setOrders] = useState(serverOrders);
  const [statusFilter, setStatusFilter] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [sortNew, setSortNew] = useState(true);

  if (orders && orders.length === 0) {
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

  const filterByStatus = (status) => {
    const ordersWithStatus = serverOrders.filter((o) => o.crmStatus === status);

    setStatusMsg("");

    ordersWithStatus.length > 0
      ? setOrders(ordersWithStatus)
      : setStatusMsg(`There are no ${status} items`);
  };

  const sortByNew = (bool) => {
    bool
      ? setOrders(
          orders.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        )
      : setOrders(
          orders.sort(function (b, a) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        );

    setSortNew(bool);
  };

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
        <Item key={id}>
          <Divider horizontal>Service Requested</Divider>{" "}
          <Item.Content>
            <Item.Header as="h4">{title}</Item.Header>
            <Item.Meta>{brief}</Item.Meta>
            {clickOptionsSelected.map((o, i) => (
              <Item.Extra key={i}>
                <i className="check icon"></i>
                {o.name}
              </Item.Extra>
            ))}
            <Item.Description>
              {" "}
              <i className="sticky note outline icon"></i> {userMessage}
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
        subHeader: "Keep track of clients, and the status of their projects.",
        dividerText: "Service Requests",
      }}
    >
      <Item style={{ width: "100%", marginBottom: "30px" }}>
        {/* <Button onClick={() => sortByNew(!sortNew)}>sort</Button> */}

        <Item.Content>
          <Item.Meta>{statusMsg}</Item.Meta>
          <Button.Group fluid>
            <Button onClick={() => filterByStatus("created")}>New</Button>
            <Button onClick={() => filterByStatus("following-up")}>
              Following-Up
            </Button>
            <Button onClick={() => filterByStatus("closed-won")}>Won</Button>
            <Button onClick={() => filterByStatus("closed-lost")}>Lost</Button>
          </Button.Group>
        </Item.Content>
      </Item>

      <Card.Group centered itemsPerRow={useMediaQuery(1000) ? 1 : 3}>
        {orders.map((order) => {
          let { crmStatus, userId, products, id } = order;

          let orderer;

          if (id) {
            orderer = getOrderer(userId)[0];
          }

          const { name, email, phone, createdAt } = orderer;

          return (
            <Card key={id}>
              <Card.Content>
                <Card.Meta>
                  <Header as="h4">
                    {/* Received {new Date(createdAt).toLocaleDateString()} */}
                  </Header>
                </Card.Meta>
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

  let serverOrders = orders.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return { serverOrders, siteUsers };
};

export default services;
