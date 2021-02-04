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

const DeleteImage = ({ photoId, path, cb }) => {
  const [values, setValues] = useState({
    loading: false,
  });

  const { loading } = values;

  const { doRequest, errors } = useRequest({
    url: `/api/photos/${photoId}`,
    method: "delete",
    body: {},
    onSuccess: () => cb(),
  });

  const handleClick = async (e) => {
    e.preventDefault();

    console.log(`deleting image ${photoId}`);
    setValues({ ...values, loading: true });

    await doRequest();
    setValues({ ...values, loading: false });
  };

  return (
    <Button
      floated="left"
      loading={loading}
      negative
      fluid
      onClick={handleClick}
    >
      Delete Image
    </Button>
  );
};

export default DeleteImage;
