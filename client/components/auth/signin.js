import { useState, Fragment, useEffect } from "react";
import { Form, Message } from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";
import { useRouter } from "next/router";
import Router from "next/router";

const Signin = ({ siteType }) => {
  const { site } = useRouter().query;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const { doRequest, errors } = useRequest({
    url: `/api/users/signin/${useRouter().query.site}`, // MUST CHANGE
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () =>
      Router.push(
        `/${siteType}/${site}/${siteType === "user" ? "user" : "account/sites"}`
      ),
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault(); // keep browser from reloading when btn click

    await doRequest();
  };

  return (
    <Form>
      <Fragment>
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
          Sign In
        </Form.Button>
      </Fragment>
    </Form>
  );
};

export { Signin };
