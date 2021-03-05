import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { emptyCart } from "../../hooks/cart-helpers";
import {
  Card,
  Icon,
  Button,
  Header,
  Container,
  TextArea,
  Segment,
} from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";

const Checkout = ({
  products,
  setRun = (f) => f,
  run = undefined,
  tellSuccess,
  user,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    instance: {},
    address: "",
    productId: "",
  });

  const { doRequest, errors } = useRequest({
    url: `/api/order`,
    method: "post",
    body: {
      products,
    },
    // onSuccess: () => Router.push(`/user/${useRouter().query.site}/user/orders`),
  });

  useEffect(() => {
    // console.log("refresh", data.cart);
  }, []);

  const nextActionButton = () => {
    if (data.success) {
      return (
        <Link href={`/user/${useRouter().query.site}/user/orders`}>
          <Button color="blue" fluid>
            View my Orders
          </Button>
        </Link>
      );
    } else if (products.length > 0) {
      return (
        <Container basic centered style={{ maxWidth: "200px" }}>
          <Button fluid color="green" onClick={buy}>
            Submit Order
          </Button>
        </Container>
      );
    } else {
      return "";
    }
  };

  const showCheckout = () =>
    user ? (
      nextActionButton()
    ) : (
      <Segment basic className="eight wide container">
        <Header textAlign="center">
          You must be signed in to submit your order.
        </Header>
        <Container centered style={{ maxWidth: "100px" }}>
          <Button.Group fluid>
            <Link href={`/user/${useRouter().query.site}/auth/signup`}>
              <Button positive>Sign up</Button>
            </Link>
            <Button.Or />
            <Link href={`/user/${useRouter().query.site}/auth/signin`}>
              <Button positive>Sign in</Button>
            </Link>
          </Button.Group>
        </Container>
      </Segment>
    );

  const buy = async () => {
    setData({ ...data, loading: true });
    console.log("products", products);

    await doRequest();
    // console.log(errors);

    emptyCart(() => {
      setRun(!run); // run useEffect in parent Cart
      tellSuccess(true);
      setData({
        loading: false,
        success: true,
      });
    });
  };

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => {
    if (success) {
      return (
        <Header textAlign="center">
          Your request has been submitted. Thanks!
        </Header>
      );
    } else {
      return (
        <Header
          as="h2"
          icon
          textAlign="center"
          style={{ marginBottom: "25px" }}
        >
          <Icon name="cart" circular />
          <Header.Content></Header.Content>
        </Header>
      );
    }
  };

  const showLoading = (loading) => loading && <h2>loading...</h2>;

  return (
    <div className="class">
      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
