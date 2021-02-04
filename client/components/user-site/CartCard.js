import React, { useState, Fragment } from "react";
import { removeItem } from "../../hooks/cart-helpers";
import { Item, Button } from "semantic-ui-react";

const Card = ({
  product,
  showRemoveItemButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const showRemoveItem = (showRemoveItemButton) => {
    return (
      showRemoveItemButton && (
        <Button
          color="red"
          fluid
          style={{ maxWidth: "350px" }}
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </Button>
      )
    );
  };

  return (
    <Fragment>
      <Item.Group>
        <Item style={{ display: "flex", alignItems: "flex-start" }}>
          {console.log(product.item)}
          <Item.Content style={{ marginLeft: "10px", marginTop: "10px" }}>
            <Item.Header as="a">{product.item.title}</Item.Header>
            <Item.Description>{product.item.brief}</Item.Description>
            <Item.Extra fluid>
              {showRemoveItem(showRemoveItemButton)}
            </Item.Extra>
            {product.item.clickOptionsSelected?.map((o) => {
              return (
                <Item.Extra>
                  <i class="check icon"></i>
                  {o.name}
                </Item.Extra>
              );
            })}
            {product.item.userMessage ? (
              <Item.Extra>
                <i class="sticky note outline icon"></i>{" "}
                {product.item.userMessage}
              </Item.Extra>
            ) : (
              ""
            )}
          </Item.Content>
        </Item>
        <br />
      </Item.Group>
    </Fragment>
  );
};

export default Card;
