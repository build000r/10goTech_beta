import Router, { useRouter } from "next/router";
import { useState } from "react";
import { Form, Input, Container, Segment, TextArea } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import { useRequest } from "../../../../hooks/use-request";

const update = ({ site }) => {
  const [values, setValues] = useState({
    title: site.title,
    homeTitle: site.homeTitle,
    tagline: site.tagline,
    aboutUsTitle: site.aboutUsTitle,
    aboutUsBlurb: site.aboutUsBlurb,
    loading: false,
    privacyPolicy: site.privacyPolicy,
    termsOfService: site.termsOfService,
    sendgridApiKey: site.sendgridApiKey,
    sendFromEmail: site.sendFromEmail,
  });

  console.log(useRouter().query.site);

  const { doRequest, errors } = useRequest({
    url: `/api/site/${useRouter().query.site}`, // MUST CHANGE
    method: "put",
    body: {
      title: values.title,
      homeTitle: values.homeTitle,
      tagline: values.tagline,
      aboutUsBlurb: values.aboutUsBlurb,
      aboutUsTitle: values.aboutUsTitle,
      privacyPolicy: values.privacyPolicy,
      termsOfService: values.termsOfService,
      sendgridApiKey: values.sendgridApiKey,
      sendFromEmail: values.sendFromEmail,
    },
    onSuccess: () => Router.push(`/user/${values.title}`),
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault(); // keep browser from reloading when btn click

    setValues({ ...values, loading: true });

    await doRequest();

    setValues({ ...values, loading: false });
  };

  return (
    <Container>
      <Segment basic style={{ minHeight: "90vh" }}>
        <Form onSubmit={clickSubmit} loading={values.loading}>
          <br />
          <Form.Field>
            <label>Site Title (this will change your URL)</label>
            <Input
              fluid
              placeholder={values.title || "Enter the new title of your site"}
              onChange={handleChange("title")}
            />
          </Form.Field>
          <Form.Field>
            <label>Header text on the home page</label>

            <Input
              fluid
              placeholder={
                values.homeTitle || "Enter the new header on your homepage "
              }
              onChange={handleChange("homeTitle")}
            />
          </Form.Field>
          <Form.Field>
            <label>Sub header text on the home page</label>
            <Input
              fluid
              placeholder={values.tagline || "Enter new tagline..."}
              onChange={handleChange("tagline")}
            />
          </Form.Field>
          <Form.Field>
            <label>Title of the section with the boxes on the home page</label>

            <Input
              fluid
              placeholder={values.aboutUsTitle || "Enter new about us title..."}
              onChange={handleChange("aboutUsTitle")}
            />
          </Form.Field>
          <Form.Field>
            <label>Paragraph section on the home page</label>
            <TextArea
              fluid
              placeholder={values.aboutUsBlurb || "Enter new aboutus blurb..."}
              onChange={handleChange("aboutUsBlurb")}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Send from custom email address? Enter in your sendgrid "from"
              email
            </label>
            <TextArea
              fluid
              placeholder={
                values.sendFromEmail || "Enter new sendgrid email blurb..."
              }
              onChange={handleChange("sendFromEmail")}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Send from custom email address? Enter in your sendgrid api key.
            </label>
            <TextArea
              fluid
              placeholder={
                values.sendgridApiKey || "Enter new sendgrid api key blurb..."
              }
              onChange={handleChange("sendgridApiKey")}
            />
          </Form.Field>
          <Form.Field>
            <label>Custom privacy policy for your website</label>
            <TextArea
              fluid
              placeholder={
                values.privacyPolicy || "Enter new privacy policy..."
              }
              onChange={handleChange("privacyPolicy")}
            />
          </Form.Field>
          <Form.Field>
            <label>Custom terms of service for your website</label>
            <TextArea
              fluid
              placeholder={
                values.termsOfService || "Enter new terms of service..."
              }
              onChange={handleChange("termsOfService")}
            />
          </Form.Field>

          <Form.Button floated="right">Update</Form.Button>
        </Form>
        {errors}
      </Segment>
    </Container>
  );
};

update.getInitialProps = async (context) => {
  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  return { site };
};

export default update;
