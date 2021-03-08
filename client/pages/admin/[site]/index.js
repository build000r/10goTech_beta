import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Card,
  Divider,
  Header,
  Item,
  Segment,
} from "semantic-ui-react";
import Layout from "../../../components/layouts";
import { Fragment } from "react";

const index = () => {
  const [active, setActive] = useState("who");
  const [jargon, setJargon] = useState("Off");

  const { site } = useRouter().query;

  const showItem = ({ header, subheader, paragraph1, paragraph2 }) => (
    <Item>
      <Item.Content>
        <Item.Header>{header}</Item.Header>
        <Item.Meta>{subheader}</Item.Meta>
        <Item.Description>
          <p>{paragraph1}</p>
        </Item.Description>
        <Item.Description>
          <p>{paragraph2}</p>
        </Item.Description>
      </Item.Content>
    </Item>
  );

  const ActiveContentTemplate = ({ jargonButton, items }) => (
    <Fragment>
      {jargonButton ? (
        <Button
          basic
          fluid
          color="blue"
          onClick={() => {
            setJargon(jargon === "Off" ? "On" : "Off");
          }}
          style={{ marginBottom: "1rem", paddingBottom: "1em" }}
        >
          Turn Jargon {jargon}
        </Button>
      ) : null}
      <Item.Group divided>{items.map((item) => showItem(item))}</Item.Group>
    </Fragment>
  );

  // reduce the risk of change
  //

  const showActiveContent = (active) => {
    switch (active) {
      case "what":
        return (
          <ActiveContentTemplate
            jargonButton={true}
            items={[
              {
                header:
                  jargon === "Off"
                    ? "An Accelerator of Continuous Innovation"
                    : "Build, Learn, Repeat.",
                subheader: "Execute on the Lean Startup Methodology",
                // "You won't have to defend your first idea to the grave",
                paragraph1:
                  "Plan for positive change. Avoid building mental barriers by investing to much time and money too early.",
                paragraph2:
                  "The only web application builder that assumes and plans for your learning, improvement, and updates. This core assumption has led to the eliminiation of several inefficiencies in your traditional web building process.",
              },
              {
                header:
                  jargon === "Off"
                    ? "Shorter Sales Cycles"
                    : "Sell More, Faster",
                subheader: "Professional Websites Shorten Sales Cycles",
                paragraph1:
                  "1) Get more specific qualifying infomation from prosepcts. 2) Automate the next steps follow up email. 3) Track your deals in a CRM. ",
                paragraph2: "Ease sales discovery ",
              },
              {
                header: "Leverage Customer & Order Data",
                subheader:
                  "Analyze in our dashboard, or export via CSV to use how you please.",
                paragraph1:
                  "Keep tabs on your prospects and customers in the administrator dashboard, or export to your other favorite apps.",
                paragraph2: "",
              },
            ]}
          />
        );
      case "why":
        return (
          <ActiveContentTemplate
            items={[
              {
                header: "Premature Investments in Technology & Marketing",
                subheader: "Poisons minds and drains wallets",
                paragraph1:
                  "Invest prematurely in technology or marketing and your wallet will feel the wrath of change orders. All business must be willing to listen to customers, and provide them with the services they want.... premature investments result in a counterproductive mindset. The more you invest, the more you bury your head in the sand.",
                paragraph2:
                  "Maintain a credible image while pushing brand and technology investments off until a) they are less likely to change, b) you are comfortable with the time and financial investment. ",
              },

              {
                header: "Artsy Fartsy Website Builders",
                subheader: "Manipulated us into tinkering their buttons",
                paragraph1:
                  "Somewhere along the way, wordpress, wix, weebly, godaddy, clickfunnels, and every other website builder out there decided that we are all very special starflowers, who want to tinker around for as long as it takes to make a pretty pretty website as unique as our mommy's told us we were.",
                paragraph2:
                  "The few of us with our heads out of our asses can now laser focus on money, efficiency, and learning from customers ... not artistic representations of ourselves and our businesses.",
              },
              {
                header: "Napkin Ideas Are Bad for the Environment",
                subheader: "Quickly move from idea to execution",
                paragraph1:
                  "Shift the perception of your business from 'oh s/he's not ready yet' to 'oh wow, this is a real business' and get more out of brainstorming sessions at the bar, networking events, and conversations with initial users. ",
                paragraph2:
                  "Build a 10goTech website in 10 minutes, and be taken seriously.",
              },
            ]}
          />
        );
      case "who":
        return (
          <ActiveContentTemplate
            items={[
              {
                header: "Consultants",
                // subheader: "Without sacrificing credibility",
                // poisons minds and wallets
                subheader: "Complex & evolving services websites made simple.",
                paragraph1: "demo ->",
                paragraph2: "",
              },
              {
                header: "Agencies",
                // subheader: "Without sacrificing credibility",
                // poisons minds and wallets
                subheader:
                  "Rapidly update your services to capatalize on the newest trends in your industry",
                paragraph1: "demo -> ",
                paragraph2: "",
              },

              {
                header: "Sweaty Startups",
                subheader:
                  "Communicate your services clearly and credibly, and spend less time selling",
                paragraph1: "demo ->",
                paragraph2: "",
              },
              {
                header: "Skilled Trades",
                subheader: "Give a clear picture of your capabilities",
                paragraph1: "demo -> ",
                // cut out the middlemen
                paragraph2: "",
              },
              {
                header: "Software as a Service Founders",
                subheader: "Validate your hypothesis earlier than ever",
                paragraph1: "demo -> ",
                // hairytask.com",
                paragraph2: "",
              },
              {
                // header: "Deal Makers",
                header: "Deal Makers",
                subheader:
                  "Clearly articulate your offers for more releavant and specific conversations",
                paragraph1: "demo ->",
                // "demo - ...com. Focus conversations surrounding deals and topics that matter",
                paragraph2: "",
                // "Lead generators, Real estate agents, vulture capital, economic developers (feature your local businesses)",
              },
              {
                header: "Angel Investors",
                subheader:
                  "Showcase your investment portfolio to help your founders win",
                paragraph1: "demo ->",
                // "De-risk your service before investing in the software. This is also good to tell your new investments",
                // paragraph2: "whos an angel investor group without a website",
              },
            ]}
          />
        );
    }
  };

  const showButtons = () => (
    <Fragment>
      <Button.Group basic fluid attached="top">
        <Button
          active={active === "why"}
          onClick={() => {
            setActive("why");
          }}
        >
          Why
        </Button>
        <Button
          active={active === "who"}
          onClick={() => {
            setActive("who");
          }}
        >
          Who
        </Button>
        <Button
          active={active === "what"}
          onClick={() => {
            setActive("what");
          }}
        >
          What
        </Button>
      </Button.Group>
      <Segment style={{ marginBottom: "2rem" }} attached="bottom" fluid>
        {showActiveContent(active)}
      </Segment>
    </Fragment>
  );

  const card = (header, subheader, next) => (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header,
        subHeader: subheader,
        btnText: "Start Free Trial",
        btnPath: `/admin/${site}/signup`,
        dividerText: "Learn",
      }}
    >
      {showButtons()}
    </Layout>
  );

  const who = (next) =>
    card(
      "Opportunists",
      "Stay lean with the perfect blend of credibility & flexibility.",
      next
    );

  const what = (next) =>
    card(
      "Build a web app in less than 10 minutes",
      "Show the world you mean business.",
      next
    );

  // tech for clients 0-10

  // const why = (next) =>
  //   card(
  //     "Marketing & Technical Debt",
  //     "Avoid significant investments in growth, until you've proven your service is a success",
  //     next
  //   );

  // const why = (next) =>
  //   card(
  //     "The Website Catch 22",
  //     "In the early stages, it is hard to close sales without credibility, Hard to invest in website without sales"
  //   );
  const why = (next) =>
    card(
      "Do the least. Sell the most. Look the best.",
      "Establish credibility earlier than ever."
    );

  switch (active) {
    case "who":
      return who("what");
    case "what":
      return what("why");
    case "why":
      return why("why");
    case "why":
      return why("who");
    default:
      return <div>whofdkhsafdhsjka</div>;
  }
};

export default index;
