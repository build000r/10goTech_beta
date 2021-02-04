import { useState, Fragment, useEffect } from "react";
import { Form, Message } from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";
import { useRouter } from "next/router";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    phone: "",
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
      name,
      email,
      phone,
      password,
    },
  });

  const handleChange = (name) => (e) => {
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
      </Fragment>
    </Form>
  );
};

export { Signup };
