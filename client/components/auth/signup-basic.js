import { useState, Fragment, useEffect } from "react";
import { Form, Message } from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";
import { useRouter } from "next/router";
import Link from "next/link";

const Signup = ({ createSitePermission }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    success: false,
    loading: false,
    agreeTos: false,
  });

  const { email, password, success, loading, agreeTos } = values;

  const { doRequest, errors } = useRequest({
    url: `/api/users/signup/${useRouter().query.site}`, // MUST CHANGE
    method: "post",
    body: {
      email,
      password,
      createSitePermission,
    },
  });

  const handleChange = (name) => (e) => {
    console.log(name, e.target.value);
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault(); // keep browser from reloading when btn click

    console.log(values);

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
        <Form.Checkbox
          label={`I agree to the Terms and Conditions`}
          onChange={() => setValues({ ...values, agreeTos: !agreeTos })}
        >
          {" "}
        </Form.Checkbox>

        {errors}
        <Form.Button disabled={!agreeTos} fluid onClick={clickSubmit}>
          Sign Up
        </Form.Button>
        <Message>
          We will not share your information with 3rd parties. Upon signup, you
          will receive an email to activate your account. For additional
          information, please review our{" "}
          <Link href="/admin/rfp/tos">Terms and Conditions</Link>.
        </Message>
      </Fragment>
    </Form>
  );
};

export { Signup };
