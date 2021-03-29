import React from "react";
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
    <Item style={{ flexDirection: "column!important" }}>
      <Item.Header as="h2">{product.item.title}</Item.Header>
      <Item.Description>{product.item.brief}</Item.Description>

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
          <i class="sticky note outline icon"></i> {product.item.userMessage}
        </Item.Extra>
      ) : (
        ""
      )}
      <Item.Extra style={{ marginTop: "20px" }} fluid>
        {showRemoveItem(showRemoveItemButton)}
      </Item.Extra>
    </Item>
  );
};

export default Card;
