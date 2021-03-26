import { useState, Fragment, useEffect } from "react";
import { Form, Message } from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";
import Router, { useRouter } from "next/router";

const Signup = ({ createSitePermission }) => {
  const [values, setValues] = useState({
    name: "",
    phone: null,
    email: "",
    password: "",
    success: false,
    loading: false,
  });

  const { name, phone, email, password, success, loading } = values;

  const { doRequest, errors } = useRequest({
    url: `/api/users/signup/${useRouter().query.site}`, // MUST CHANGE
    method: "post",
    body: {
      email,
      password,
      name,
      phone,
      createSitePermission,
    },
  });

  const handleChange = (name) => (e) => {
    if (
      name === "phone" &&
      /^\d+$/.test(e.target.value) === false &&
      e.nativeEvent.inputType !== "deleteContentBackward"
    ) {
      return;
    }
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault(); // keep browser from reloading when btn click

    setValues({ ...values, loading: true });

    const response = await doRequest();

    setValues({ ...values, loading: false });

    if (response && response.token) {
      setValues({ ...values, success: true });
    }
  };

  return success ? (
    <Message success header={`Activation email sent to ${email}`} />
  ) : (
    <Form loading={loading}>
      <Fragment>
        <Form.Input
          onChange={handleChange("name")}
          value={name}
          fluid
          placeholder="Name"
          type="text"
        />
        <Form.Input
          onChange={handleChange("phone")}
          value={phone}
          fluid
          placeholder="Phone"
          type="text"
        />
        <Form.Input
          onChange={handleChange("email")}
          value={email}
          fluid
          placeholder="Email"
          type="email"
        />
        <Form.Input
          onChange={handleChange("password")}
          value={password}
          fluid
          placeholder="Password"
          type="Password"
        />
        {errors}
        <Form.Button fluid onClick={clickSubmit}>
          Sign Up
        </Form.Button>
        <Message>
          When you click "signup" you will be sent an email to confirm your
          account.
        </Message>
      </Fragment>
    </Form>
  );
};

export { Signup };
