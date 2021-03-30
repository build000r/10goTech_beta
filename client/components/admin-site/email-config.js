import Router from "next/router";
import { useState } from "react";
import { Form, Input, Divider, Header, Icon, Message } from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";

const EmailConfig = ({ config }) => {
  const [values, setValues] = useState({
    loading: false,
    submitted: false,
    title: config.title,
    mailjetFromEmail: config.mailjetFromEmail,
    mailjetFromName: config.mailjetFromName,
  });

  const { doRequest, errors, errMsgArr } = useRequest({
    url: `/api/notification/config`, // MUST CHANGE
    method: "put",
    body: {
      title: values.title,
      mailjetFromEmail: values.mailjetFromEmail,
      mailjetFromName: values.mailjetFromName,
    },
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault(); // keep browser from reloading when btn click

    setValues({ ...values, loading: true });

    await doRequest();

    setValues({ ...values, loading: false, submitted: true });
  };

  return (
    <Form onSubmit={clickSubmit} loading={values.loading}>
      <br />
      <br />
      <br />
      {errors}
      <Divider horizontal>
        <Header as="h4">
          <Icon name="mail" />
          Email Automation Config
        </Header>
      </Divider>{" "}
      <Form.Field>
        <label>Email</label>
        <Input
          value={values.mailjetFromEmail}
          placeholder={
            values.mailjetFromEmail || "Enter new sendgrid email blurb..."
          }
          onChange={handleChange("mailjetFromEmail")}
        />
      </Form.Field>
      <Form.Field>
        <label>Name</label>
        <Input
          value={values.mailjetFromName}
          placeholder={
            values.mailjetFromName || "Enter new sendgrid email blurb..."
          }
          onChange={handleChange("mailjetFromName")}
        />
      </Form.Field>
      {values.submitted ? (
        <Message
          header="Check your email"
          content="Follow the steps sent from `MailJet` to activate your new email"
        ></Message>
      ) : (
        ""
      )}
      <Form.Button floated="right">Update Email Configuration</Form.Button>
    </Form>
  );
};

export default EmailConfig;
