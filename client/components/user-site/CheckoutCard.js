import { useState } from "react";
import {
  Item,
  Button,
  Form,
  TextArea,
  Segment,
  Message,
} from "semantic-ui-react";
import Checkbox from "../../components/user-site/Checkbox";

import Link from "next/link";

const CheckoutCard = ({ product, isAdmin }) => {
  const [values, setValues] = useState({
    showAddToCartButton: true, // depends if logged in
    redirect: "",
    clickOptionsSelected: [],
    userMessage: "",
    loading: false,
  });

  const {
    showAddToCartButton,
    redirect,
    selected,
    userMessage,
    loading,
  } = values;

  const adminLinks = () =>
    isAdmin ? (
      <div>
        <Message floating>
          <Message.Header>Only the site owner can see this.</Message.Header>
          <Message.Content>
            <Link href={`/user/${product.site.title}/admin/${product.slug}`}>
              <Button>Edit/Delete Service</Button>
            </Link>
            <Link
              href={`/user/${product.site.title}/admin/${product.slug}/photo`}
            >
              <Button>Edit Photos</Button>
            </Link>
            <Link
              href={`/user/${product.site.title}/admin/${product.slug}/email`}
            >
              <Button>Edit Email</Button>
            </Link>
          </Message.Content>
        </Message>
      </div>
    ) : null;

  const addCartItemToLocalStorage = (item) => {
    let cart = [];

    if (typeof window === "undefined") {
      return;
    }

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({ item, count: 1 });

    // not removing duplicates
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Link href={`/user/${product.site.title}/cart`} fluid>
          <Button
            fluid
            color="green"
            onClick={async () => {
              product.clickOptionsSelected = values.clickOptionsSelected;
              product.userMessage = values.userMessage;

              console.log("product", product);

              addCartItemToLocalStorage(product);
            }}
          >
            Add to cart
          </Button>
        </Link>
      )
    );
  };

  const handleClickOptions = (opts) => {
    setValues({ ...values, clickOptionsSelected: opts });
  };

  const showCustomTextArea = () => (
    <Form>
      <TextArea
        placeholder={product.customerNote}
        onChange={(e) => {
          setValues({ ...values, userMessage: e.target.value });
        }}
        className="form-control"
        value={userMessage}
      ></TextArea>
    </Form>
  );

  const checkoutCard = () => {
    return (
      <Segment basic style={{ minHeight: "90vh" }}>
        {adminLinks()}
        <Item.Group centered>
          <Item centered>
            <Item.Content style={{ marginTop: "10px" }}>
              <Item.Header>{product.title}</Item.Header>
              <Item.Description>{product.description}</Item.Description>
              <Item.Extra fluid></Item.Extra>
              {Checkbox(product.clickOptions, handleClickOptions)}
              {showCustomTextArea()}
            </Item.Content>
          </Item>
          <Item>
            <Item.Extra fluid>
              {isAdmin ? (
                <Button active={false} fluid color="green">
                  Add to cart (disabled while administrator is logged in)
                </Button>
              ) : (
                showAddToCart(showAddToCartButton)
              )}
            </Item.Extra>
          </Item>
          <br />
        </Item.Group>
      </Segment>
    );
  };

  return checkoutCard();
};

export default CheckoutCard;
