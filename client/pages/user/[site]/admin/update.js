import Router, { useRouter } from "next/router";
import { useState } from "react";
import { Form, Input, Container, Segment, TextArea } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import { useRequest } from "../../../../hooks/use-request";

import Layout from "../../../../components/layouts";

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
    servicesPageHeadline: site.servicesPageHeadline,
    servicesPageSubheadline: site.servicesPageSubheadline,
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
      servicesPageHeadline: values.servicesPageHeadline,
      servicesPageSubheadline: values.servicesPageSubheadline,
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
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: "Website Details",
        subHeader: "Update the content and configuration of your website",
        dividerText: "Form",
      }}
      heightOverride={"1200px"}
    >
      <Form onSubmit={clickSubmit} loading={values.loading}>
        <br />
        <Form.Field>
          <label>Site Title (this will change your URL)</label>
          <Input
            fluid
            value={values.title}
            placeholder={values.title || "Enter the new title of your site"}
            onChange={handleChange("title")}
          />
        </Form.Field>
        <Form.Field>
          <label>Header text on the home page</label>

          <Input
            fluid
            value={values.homeTitle}
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
            value={values.tagline}
            placeholder={values.tagline || "Enter new tagline..."}
            onChange={handleChange("tagline")}
          />
        </Form.Field>
        <Form.Field>
          <label>Title of the section with the boxes on the home page</label>

          <Input
            fluid
            value={values.aboutUsTitle}
            placeholder={values.aboutUsTitle || "Enter new about us title..."}
            onChange={handleChange("aboutUsTitle")}
          />
        </Form.Field>
        <Form.Field>
          <label>Paragraph section on the home page</label>
          <TextArea
            fluid
            value={values.aboutUsBlurb}
            placeholder={values.aboutUsBlurb || "Enter new aboutus blurb..."}
            onChange={handleChange("aboutUsBlurb")}
          />
        </Form.Field>
        <Form.Field>
          <label>
            Send from custom email address? Enter in your sendgrid "from" email
          </label>
          <TextArea
            fluid
            value={values.sendFromEmail}
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
            value={values.sendgridApiKey}
            placeholder={
              values.sendgridApiKey || "Enter new sendgrid api key blurb..."
            }
            onChange={handleChange("sendgridApiKey")}
          />
        </Form.Field>
        <Form.Field>
          <label>Enter new services page headline</label>
          <TextArea
            fluid
            value={values.servicesPageHeadline}
            placeholder={
              values.servicesPageHeadline ||
              "Enter new services page headline..."
            }
            onChange={handleChange("servicesPageHeadline")}
          />
        </Form.Field>
        <Form.Field>
          <label>Enter new services page subheadline</label>
          <TextArea
            fluid
            value={values.servicesPageSubheadline}
            placeholder={
              values.servicesPageSubheadline ||
              "Enter new services page subheadline..."
            }
            onChange={handleChange("servicesPageSubheadline")}
          />
        </Form.Field>
        <Form.Field>
          <label>Custom privacy policy for your website</label>
          <TextArea
            fluid
            value={values.privacyPolicy}
            placeholder={values.privacyPolicy || "Enter new privacy policy..."}
            onChange={handleChange("privacyPolicy")}
          />
        </Form.Field>
        <Form.Field>
          <label>Custom terms of service for your website</label>
          <TextArea
            fluid
            value={values.termsOfService}
            placeholder={
              values.termsOfService || "Enter new terms of service..."
            }
            onChange={handleChange("termsOfService")}
          />
        </Form.Field>

        <Form.Button floated="right">Update</Form.Button>
      </Form>
      {errors}
    </Layout>
  );
};

update.getInitialProps = async (context) => {
  const { data: site } = await buildClient(context).get(
    `/api/site/${context.query.site}`
  );

  return { site };
};

export default update;
