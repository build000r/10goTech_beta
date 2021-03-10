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
    updateExisting: true,
    productId: "",
    title: "",
    brief: "",
    description: "",
    homepagePosition: "",
    clickOptions: [{ name: "" }],
    error: "",
    loading: false,
    createdProduct: "",
    redirectToProfile: false,
    emailSubject: "",
    emailBody: "",
    slug: "",
    customerNote: "",
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
      brief,
      description,
      clickOptions,
      loading,
      emailBody,
      emailSubject,
      customerNote,
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
            <Form.Field>
              <label>Brief Description</label>
              <Input
                placeholder="brief"
                onChange={handleChange("brief")}
                className="form-control"
                value={brief}
              />
            </Form.Field>
            <Form.Field>
              <label>Longer Description</label>
              <TextArea
                placeholder="description"
                onChange={handleChange("description")}
                className="form-control"
                value={description}
              />
            </Form.Field>
            <Form.Field>
              <label>Custom Note Instructions</label>
              <TextArea
                placeholder="Describe additional information you'd like to receive from the customer ordering this service."
                onChange={handleChange("customerNote")}
                className="form-control"
                value={customerNote}
              />
            </Form.Field>

            {clickOptions.map((o, idx) => (
              <Form.Field>
                <label>Checkbox Option</label>

                <TextArea
                  fluid
                  className="form-control"
                  type="text"
                  placeholder={`Type checkbox option ${idx + 1}`}
                  value={o.name}
                  onChange={handleClickOptionsChange(idx)}
                />

                <Button
                  size="mini"
                  color="red"
                  floated="right"
                  type="button"
                  onClick={handleRemoveClickOption(idx)}
                >
                  <p>-</p>
                </Button>
              </Form.Field>
            ))}
            <Button
              size="mini"
              color="green"
              onClick={handleAddClickOption}
              className="small"
            >
              Add Clickable Option
            </Button>
            {/* <Form.Field>
              <label>
                Next Steps Email (what is sent after an order is placed){" "}
              </label>
              <Input
                placeholder=""
                onChange={handleChange("")}
                className="form-control"
                value={emailSubject}
              />
              <TextArea
                fluid
                className="form-control"
                type="text"
                placeholder={`Email Body`}s
                value={emailBody}
                onChange={() => {}}
              />{" "}
            </Form.Field> */}
          </Form>
        </Card.Content>
        <Button type="submit" fluid onClick={handleSubmit}>
          {product ? "Update" : "Create"}
        </Button>
      </Card>
    );
  };

  return <Segment>{formCard()}</Segment>;
};

export default AddUpdateProduct;
