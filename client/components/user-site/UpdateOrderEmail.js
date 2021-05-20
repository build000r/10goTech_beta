import { useEffect, useState } from "react";
import {
  Card,
  Segment,
  Form,
  Input,
  TextArea,
  Button,
  Container,
} from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";
import Router, { useRouter } from "next/router";
// import Editor from "../email";
import EmailDraftJs from "../email/draftjs";

const UpdateOrderEmail = ({ email, path, ownerId }) => {
  const [values, setValues] = useState({
    subject: "",
    body: "",
    oldBody: "",
    productId: "",
    loading: false,
  });

  const { doRequest, errors } = useRequest({
    url: `/api/notification/email-by-product/${ownerId}/${values.productId}`,
    method: "put",
    body: {
      subject: values.subject,
      body: values.body || values.oldBody,
    },
    onSuccess: () => Router.push(path),
  });

  useEffect(() => {
    if (email) {
      const { subject, productId, body } = email;

      setValues({
        ...values,
        subject,
        oldBody: body,
        productId,
      });
    }
  }, []);

  const handleChange = (name) => (evt) => {
    setValues({ ...values, [name]: evt.target.value });
  };

  const handleBodyChange = (body) => {
    setValues({ ...values, body });
  };

  const handleSubmit = async (evt) => {
    evt && evt.preventDefault();
    setValues({ ...values, loading: true });

    const res = await doRequest();
    setValues({ ...values, loading: false });
  };

  const formCard = () => {
    const { subject, body, loading } = values;

    return (
      <Card fluid>
        <Card.Content>
          <Form loading={loading}>
            <Form.Field>
              <label>Subject</label>
              <Input
                placeholder="subject"
                onChange={handleChange("subject")}
                className="form-control"
                value={subject}
              />
            </Form.Field>
            <Form.Field>
              {/* <label>Body</label>
              <TextArea
                style={{ minHeight: 200 }}
                placeholder="body"
                onChange={handleChange("body")}
                className="form-control"
                value={body}
              /> */}
              {values.oldBody &&
                typeof window !==
                  "undefined"(
                    <EmailDraftJs
                      onBodyChange={handleBodyChange}
                      oldBody={values.oldBody}
                    />
                  )}
            </Form.Field>
          </Form>
        </Card.Content>
        <Button type="submit" fluid onClick={handleSubmit}>
          Update
        </Button>
      </Card>
    );
  };

  return (
    <Container style={{ minHeight: "90vh" }}>
      <Segment>{formCard()}</Segment>;
    </Container>
  );
};

export default UpdateOrderEmail;
