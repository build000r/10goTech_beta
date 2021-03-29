import { useEffect, useState } from "react";
import {
  Card,
  Segment,
  Form,
  Input,
  TextArea,
  Button,
} from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";
import Router from "next/router";
import DeleteProduct from "../admin-site/delete-product";

const AddUpdateProduct = ({ product, site }) => {
  const [values, setValues] = useState({
    title: "",
    error: "",
  });

  // on save create a slug.. lower case & dashes

  // modify state for updating vs creating

  const { doRequest, errors } = useRequest({
    url: !product
      ? `/api/product/${site}`
      : `/api/product/${site}/${values.slug}`, // MUST CHANGE
    method: !product ? "post" : "put",
    body: {
      title: values.title,
      description: values.description,
      brief: values.brief,
      clickOptions:
        values.clickOptions.length > 0 ? values.clickOptions : [{ name: "" }],
      customerNote: values.customerNote,
    },
    onSuccess: () => Router.push(`/user/${site}/services`),
  });

  useEffect(() => {
    if (product) {
      const {
        title,
        brief,
        description,
        slug,
        clickOptions,
        customerNote,
      } = product;

      setValues({
        ...values,
        updateExisting: true,
        title,
        slug,
        brief,
        description,
        clickOptions,
        customerNote,
      });
    }
  }, []);

  const handleChange = (name) => (evt) => {
    setValues({ ...values, [name]: evt.target.value });
  };

  const handleClickOptionsChange = (idx) => (evt) => {
    const newClickOptions = values.clickOptions.map((o, sidx) => {
      if (idx !== sidx) return o;
      return { ...o, name: evt.target.value };
    });

    setValues({ ...values, clickOptions: newClickOptions });
  };

  const handleAddClickOption = () => {
    setValues({
      ...values,
      clickOptions: values.clickOptions.concat([{ name: "" }]),
    });
  };

  const handleRemoveClickOption = (idx) => () => {
    setValues({
      ...values,
      clickOptions: values.clickOptions.filter((s, sidx) => idx !== sidx),
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setValues({ ...values, loading: true });

    const res = await doRequest();
    setValues({ ...values, loading: false });

    console.log(res);
  };

  const formCard = () => {
    const {
      title,

      loading,
    } = values;

    return (
      <Card fluid>
        {product ? (
          <DeleteProduct siteTitle={site} productTitle={values.title} />
        ) : null}
        <Card.Content>
          <Form loading={loading}>
            <Form.Field>
              <label>Title</label>
              <Input
                placeholder="title"
                onChange={handleChange("title")}
                className="form-control"
                value={title}
              />
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    );
  };

  return <Segment>{formCard()}</Segment>;
};

export default AddUpdateProduct;
