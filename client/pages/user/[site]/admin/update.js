import Router, { useRouter } from "next/router";
import { useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Divider,
  Header,
  Icon,
} from "semantic-ui-react";
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

  const { doRequest, errors, errMsgArr } = useRequest({
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
        dividerText: "Configure",
      }}
      heightOverride={"1200px"}
    >
      <Form onSubmit={clickSubmit} loading={values.loading}>
        <br />
        {errors}
        <Form.Field
          error={
            errMsgArr &&
            errMsgArr.includes("This title has been reserved by another user.")
          }
        >
          <label>Site Title </label>
          <Input
            style={{ maxWidth: "300px" }}
            label=".10gotech.com"
            labelPosition="right"
            value={values.title}
            placeholder={values.title || "Enter the new title of your site"}
            onChange={handleChange("title")}
          />
          <p style={{ marginTop: "20px", marginBottom: "10px" }}>
            To configure custom email & domain name, respond to the email sent
            from rob@10gotech.com
          </p>
        </Form.Field>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="home" />
            Home
          </Header>
        </Divider>{" "}
        <Form.Field>
          <label>Header</label>

          <Input
            value={values.homeTitle}
            placeholder={
              values.homeTitle || "Enter the new header on your homepage "
            }
            onChange={handleChange("homeTitle")}
          />
        </Form.Field>
        <Form.Field>
          <label>Sub header</label>
          <Input
            value={values.tagline}
            placeholder={values.tagline || "Enter new tagline..."}
            onChange={handleChange("tagline")}
          />
        </Form.Field>
        <Form.Field>
          <label>Section Header</label>

          <Input
            value={values.aboutUsTitle}
            placeholder={values.aboutUsTitle || "Enter new about us title..."}
            onChange={handleChange("aboutUsTitle")}
          />
        </Form.Field>
        <Form.Field>
          <label>Section Paragraph</label>
          <TextArea
            value={values.aboutUsBlurb}
            placeholder={values.aboutUsBlurb || "Enter new aboutus blurb..."}
            onChange={handleChange("aboutUsBlurb")}
          />
        </Form.Field>
        {/* <Form.Field>
          <label>
            Send from custom email address? Enter in your sendgrid "from" email
          </label>
          <TextArea
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
            value={values.sendgridApiKey}
            placeholder={
              values.sendgridApiKey || "Enter new sendgrid api key blurb..."
            }
            onChange={handleChange("sendgridApiKey")}
          />
        </Form.Field> */}
        <Divider horizontal>
          <Header as="h4">
            <Icon name="money" />
            Services
          </Header>
        </Divider>{" "}
        <Form.Field>
          <label>Enter new services page headline</label>
          <Input
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
          <Input
            value={values.servicesPageSubheadline}
            placeholder={
              values.servicesPageSubheadline ||
              "Enter new services page subheadline..."
            }
            onChange={handleChange("servicesPageSubheadline")}
          />
        </Form.Field>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="law" />
            Legal
          </Header>
        </Divider>{" "}
        <Form.Field>
          <label>Custom privacy policy for your website</label>
          <TextArea
            value={values.privacyPolicy}
            placeholder={values.privacyPolicy || "Enter new privacy policy..."}
            onChange={handleChange("privacyPolicy")}
          />
        </Form.Field>
        <Form.Field>
          <label>Custom terms of service for your website</label>
          <TextArea
            value={values.termsOfService}
            placeholder={
              values.termsOfService || "Enter new terms of service..."
            }
            onChange={handleChange("termsOfService")}
          />
        </Form.Field>
        <Form.Button floated="right">Update</Form.Button>
      </Form>
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
