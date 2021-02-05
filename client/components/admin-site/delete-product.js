import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { emptyCart } from "../../hooks/cart-helpers";
import {
  Card,
  Icon,
  Button,
  Header,
  Form,
  TextArea,
  Segment,
} from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";

const DeleteProduct = ({ siteTitle, productTitle }) => {
  const { doRequest, errors } = useRequest({
    url: `/api/product/${siteTitle}/${productTitle}`,
    method: "delete",
    body: {},
    onSuccess: () => Router.push(`/user/${siteTitle}/services`),
  });

  return (
    <Button floated="right" size="mini" negative onClick={() => doRequest()}>
      Delete Product
    </Button>
  );
};

export default DeleteProduct;
