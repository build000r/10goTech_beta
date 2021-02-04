import {
  Item,
  Button,
  Label,
  Icon,
  Popup,
  Card,
  Header,
  List,
} from "semantic-ui-react";
import { useRequest } from "../../hooks/use-request";
import Router from "next/router";

const CurrentSubscription = ({ subscription, site, userOfSite, pay }) => {
  const { doRequest, errors } = useRequest({
    url: `/api/site/${site}`,
    method: "delete",
    onSuccess: () => Router.push(`/admin/${userOfSite}/account/sites`),
  });

  const deleteSiteSubscription = async () => {
    await doRequest();
  };

  const showSubscription = () => {
    const { plan, id, status, trial_end, current_period_end } = subscription;
    const { last4, exp_year, exp_month, brand } = pay.card;

    const { amount, interval } = plan;

    const trialEnd = new Date(trial_end * 1000);
    const now = new Date();

    const getReadableDate = (date) =>
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    const trialEndDate = getReadableDate(trialEnd);

    const nextBill = new Date(current_period_end * 1000);
    const nextBillDate = getReadableDate(nextBill);

    return (
      <div>
        <Item.Group divided>
          <Item>
            <Item.Content>
              <Item.Header as="a">{site}</Item.Header>
              <Item.Meta>
                <span>SubscriptionId: {id} </span>
              </Item.Meta>
              <Item.Description>
                ${amount / 100} per {interval}
              </Item.Description>
              <Item.Extra>
                <Popup
                  trigger={
                    <Button
                      color="red"
                      icon="delete"
                      content="Cancel Subscription And Delete Site"
                    />
                  }
                  content={
                    <Card>
                      <Card.Content>
                        <Card.Header>
                          <Header>Are you sure?</Header>
                        </Card.Header>
                        <List bulleted>
                          <List.Item>This is an irreversible action.</List.Item>
                          <List.Item>
                            All data associated with the site will be deleted
                            immediately, and cannot be recovered.
                          </List.Item>
                          <List.Item>
                            You will not be charged again on your next billing
                            date.
                          </List.Item>
                        </List>
                      </Card.Content>
                      <Button
                        size="tiny"
                        attached="bottom"
                        negative
                        onClick={deleteSiteSubscription}
                      >
                        Yes - Cancel my subscription
                      </Button>
                    </Card>
                  }
                  on="click"
                  position="top right"
                />

                {trialEnd > now ? (
                  <Label>Free trial expires {trialEndDate}</Label>
                ) : null}
              </Item.Extra>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              <Item.Header>
                {brand.charAt(0).toUpperCase() + brand.slice(1)} On File
              </Item.Header>
              <Item.Meta>
                <Icon name="credit card outline" /> {last4} expires {exp_month}/
                {exp_year}
              </Item.Meta>

              <Item.Extra>
                <Label>Next Bill {nextBillDate}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        {errors ? errors : null}
      </div>
    );
  };

  return subscription ? showSubscription() : <div>no subscription found</div>;
};

export { CurrentSubscription };
