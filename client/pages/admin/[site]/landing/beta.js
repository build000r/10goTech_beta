import { useMediaQuery } from "../../../../hooks/use-media-query";
import { Segment, Header, Card, List, Icon } from "semantic-ui-react";
import NoSite from "../../../../components/error/site-does-not-exist";
import { buildClient } from "../../../../api/build-client";

const beta = ({ siteExists }) => {
  const problems = (perRow) => (
    <Segment basic>
      <Card.Group itemsPerRow={perRow}>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Minimal Input</Card.Header>
            <Card.Meta textAlign="center">
              To impress clients for less
            </Card.Meta>
            <Card.Description>
              <List>
                <List.Item>
                  <Icon name="checkmark" styles={{ paddingRight: "10px" }} />
                  Less time investment than DIY website builders
                </List.Item>
                <List.Item>
                  <Icon name="checkmark" />
                  Less capital investment than custom development
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Rapid Iteration</Card.Header>
            <Card.Meta textAlign="center">
              Built for continuous improvement
            </Card.Meta>
            <Card.Description>
              <List>
                <List.Item>
                  <Icon name="checkmark" />
                  Update services as quickly as you can describe them.
                </List.Item>
                <List.Item>
                  <Icon name="checkmark" />
                  Major pivots are no big deal while you figure things out
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Essential Automation</Card.Header>
            <Card.Meta textAlign="center">
              To maintain the momentum of interested clients
            </Card.Meta>
            <Card.Description>
              <List>
                <List.Item>
                  <Icon name="checkmark" />
                  Welcome emails are sent to potential clients when they sign up
                  for your website
                </List.Item>
                <List.Item>
                  <Icon name="checkmark" />
                  Next-step emails are uploaded by you per service, and sent to
                  each client that orders a service
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </Segment>
  );

  const examples = (perRow) => (
    <Segment basic>
      <Header textAlign="center">Examples</Header>
      <Card.Group itemsPerRow={perRow}>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Accounting</Card.Header>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Strategy</Card.Header>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Cybersecurity</Card.Header>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header textAlign="center">Product</Card.Header>
          </Card.Content>
        </Card>
      </Card.Group>
    </Segment>
  );

  return (
    <div>
      <Segment>
        <Header as="h1" textAlign="center">
          Minimalist WebApp Builder for Independant Consultants
          <Header.Subheader>
            Accelerate the "Build, Measure, Learn" loop by reducing technical
            marketing debt
          </Header.Subheader>
        </Header>
      </Segment>
      <Segment basic>
        {useMediaQuery(1001) ? problems(1) : problems(3)}

        {useMediaQuery(1001) ? examples(1) : examples(3)}
      </Segment>
    </div>
  );
};

export default beta;
