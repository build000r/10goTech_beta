import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Header, Segment, Divider } from "semantic-ui-react";

import Card from "../../../components/user-site/CartCard";
import Checkout from "../../../components/user-site/Checkout";
import { getCart } from "../../../hooks/cart-helpers";
import { useRouter } from "next/router";
import { buildClient } from "../../../api/build-client";
import { useAuth } from "../../../hooks/use-auth";
import Layout from "../../../components/layouts";

const Cart = ({ user }) => {
  const [items, setItems] = useState([]);
  const [success, setSuccess] = useState(false);
  const [run, setRun] = useState(false); // to avoid infinite loop

  const link = useRouter().query.site;

  useEffect(() => {
    window.scrollTo(0, 0);
    setItems(getCart());
  }, [run]);

  const showItems = () => (
    <Segment>
      {items.map((product, i) => (
        <Fragment>
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveItemButton={true}
            run={run}
            setRun={setRun}
          />
          <Divider />
        </Fragment>
      ))}
    </Segment>
  );

  const noItemsMessage = () => {
    if (success) {
      return "";
    } else {
      return (
        <Fragment>
          <Header>Cart Empty</Header>
          <Link href={`/user/${link}/services`}>Shop for services</Link>
        </Fragment>
      );
    }
  };

  const renderIfAuth = () => (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: `There are ${items.length} item${
          items.length > 0 ? "s" : ""
        } in your order`,
        subHeader: "Shop for services, and submit the details when ready.",
        dividerText: "Items",
      }}
    >
      <Checkout
        products={items.map((i) => i.item)}
        user={user}
        setRun={setRun}
        run={run}
        tellSuccess={(bool) => {
          setSuccess(bool);
        }}
      />

      {items.length > 0 ? showItems(items) : noItemsMessage()}
    </Layout>
  );

  return useAuth({
    user,
    currentUrlSite: link,
    renderIfAuth,
  });
};

Cart.getInitialProps = async (context) => {
  const client = buildClient(context);

  const { data: currentUser } = await client.get("/api/users/currentuser");
  const user = currentUser.currentUser;

  return { user };
};

export default Cart;
