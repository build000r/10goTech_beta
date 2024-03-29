import { useState, Fragment, useEffect } from "react";
import {
  Segment,
  Container,
  Grid,
  Divider,
  List,
  Header,
} from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";
import { useRouter } from "next/router";
import Router from "next/router";

const Footer = ({ siteType }) => {
  const { site } = useRouter().query;

  if (site === "undefined") {
    site = "rfp";
  }

  let isTempTitle = (sitetitle) =>
    sitetitle ? sitetitle.includes("Change_This_Title") : "";

  return (
    <Segment inverted vertical>
      <Container fluid textAlign="center">
        <Grid columns={1} divided stackable inverted>
          <Grid.Row>
            <Grid.Column>
              <Header
                inverted
                as="h4"
                content={`${isTempTitle(site) ? "Change your title!" : site}`}
              />
              <br />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider inverted section />
        <List horizontal inverted divided link size="small">
          {/* <List.Item as="a" href="#">
              Site Map // todo
            </List.Item> */}
          <List.Item as="a" href={`/${siteType}/${site}/tos`}>
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href={`/${siteType}/${site}/privacy-policy`}>
            Privacy Policy
          </List.Item>
          <List.Item as="a" href="https://www.10gotech.com">
            Built with www.10gotech.com
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};

export { Footer };
