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
  const [active, setActive] = useState("what");
  const [jargon, setJargon] = useState("Off");

  const { site } = useRouter().query;

  const showItem = ({ header, subheader, paragraph1, demo1, paragraph2 }) => (
    <Item key={header}>
      <Item.Content>
        <Item.Header>{header}</Item.Header>
        <Item.Meta>{subheader}</Item.Meta>
        <Item.Description>
          <a href={`https://${demo1}`} target="_blank">
            {demo1}
          </a>
          {paragraph1}
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
                subheader: "Service forms, email automation, and a CRM",
                paragraph1:
                  "Articulate the service you provide, and receive detailed inquiries from prospective customers. Customize and automate the next steps of the conversation, so you can respond quickly without having to constantly check your email. Keep tabs on your sales funnel in the customer relationship management section of the administrator dashboard. ",
                // paragraph2: "Ease sales discovery ",
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
          // <ActiveContentTemplate
          //   items={[
          //     {
          //       header: "Premature Investments in Technology & Marketing",
          //       subheader: "Poisons minds and drains wallets",
          //       paragraph1:
          //         "We must be very careful in the methods we use to build a credible online presence. Symptoms of premature investments may include 1) an unwillingness to listen to customer feedback 2) change order invoices 3) more hours tinkering on website builders.",
          //       // "Invest prematurely in technology or marketing and your wallet will feel the wrath of change orders. All business must be willing to listen to customers, and provide them with the services they want.... premature investments result in a counterproductive mindset. The more you invest, the more you bury your head in the sand.",
          //       paragraph2:
          //         "The name of the game is maintaining a credible image while pushing larger investments off until there is a lower risk of change.",
          //     },

          //     {
          //       header: "Artsy Fartsy Website Builders",
          //       subheader: "Manipulated us into tinkering their buttons",
          //       paragraph1:
          //         "Somewhere along the way, wordpress, wix, weebly, godaddy, clickfunnels, and every other website builder out there decided that we are all very special starflowers, who want to tinker around for as long as it takes to make a pretty pretty website as unique as our mommy's told us we were.",
          //       paragraph2:
          //         "The few of us with our heads out of our asses can now laser focus on money, efficiency, and learning from customers ... not artistic representations of ourselves and our businesses.",
          //     },
          //     {
          //       header: "Napkin Ideas Are Bad for the Environment",
          //       subheader: "Quickly move from idea to execution",
          //       paragraph1:
          //         "Shift the perception of your business from 'oh s/he's not ready yet' to 'oh wow, this is a real business' and get more out of brainstorming sessions at the bar, networking events, and conversations with initial users. ",
          //       paragraph2:
          //         "Build a 10goTech website in 10 minutes, and be taken seriously.",
          //     },
          //   ]}
          // />
          <ActiveContentTemplate
            items={[
              {
                header: "Change",
                subheader:
                  "A website building process that anticipates your desire to quickly reflect the learnings and growth of your business.",
                paragraph1:
                  "Marketing debt accumulates as the obligatory arts and crafts stage is performed by you, or a website designer. Logo. Colors. Theme. Brand. Hours * Money later, you’re ready for business. Then, customer X comes along and makes you aware of a huge opportunity. Back to arts and crafts. Wait a second! Could customer X been sold without accumulating all of that marketing debt? Probably.",
                paragraph2: "",
              },
              {
                header: "Clarity",
                subheader:
                  "For business minded website creators, and their visitors.",
                paragraph1:
                  "Website visitors should know how, and be confident in their decision, to hire a service provider.",
                paragraph2:
                  "Business people should stay focused on their goal of honing conversations in on specific services that they provide.",
              },
              {
                header: "Simplicity",
                subheader:
                  "Building a website shouldn't require so many decisions.",
                paragraph1:
                  "Business people should be able to build a website, on their own domains, as easy as creating a linkedin profile.",
                paragraph2: "",
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
                subheader: "Simplify a complex & evolving set of services",
                demo1: "RobBaratta.com",
                paragraph1: ` defines Product Management & Full Stack Engineering services to potential clients.`,
                paragraph2: "",
              },
              {
                header: "Agencies & Influencers",
                subheader: "Capatalize on the newest trends in your industry",
                demo1: "Wivud.com",
                paragraph1:
                  " showcases brand collaboration opportunities available across this influencers social media platforms.",
                paragraph2: "",
              },
              {
                header: "Skilled Trades & Sweaty Startups",
                subheader:
                  "Spend more time doing and less time explaining what you can do",
                demo1: "Plummah.com",
                paragraph1:
                  " is the easiest website this plumber never wanted to make, but knew he should.",
                paragraph2: "",
              },
              {
                // header: "Deal Makers",
                header: "Deal Makers",
                subheader:
                  "Focus your audiences attention on specific opportunities",
                // Clearly articulate your offers for more releavant and specific conversations
                demo1: "WorkFromBathroom.com",
                paragraph1:
                  // "demo ->",
                  " helps this recruiter fill roles faster.",
                paragraph2: "",
                // "Lead generators, Real estate agents, vulture capital, economic developers (feature your local businesses)",
              },
              {
                header: "Angel Investors",
                subheader: "Help your founders win",
                // Showcase your investment portfolio to help your founders win
                demo1: "ilitic.com",

                paragraph1:
                  // "demo ->",
                  " crowdsources what their portfolio companies need help with.",

                // "De-risk your service before investing in the software. This is also good to tell your new investments",
                // paragraph2: "whos an angel investor group without a website",
              },
              {
                header: "Founders",
                subheader: "Validate your hypothesis earlier than ever",
                demo1: "LunchMeintheFace.com",
                paragraph1:
                  " enabled these startup bros to test out their `Uber for x App` idea, while investing the minimum amount of time and money.",
                // isn't sure whether or not their idea is worth investing more resources into. They are using us to gauge demand before deciding whether or not they want to spend more money on marketing and custom technology for their `uber for lunch` app idea.",
                paragraph2: "",
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
      <Segment style={{ marginBottom: "2rem" }} attached="bottom">
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
    card("Lean Businesses", "Build. Measure. Learn. Repeat.", next);

  const what = (next) =>
    card(
      "Launch your website in less than 10 minutes",
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
    card("Website Building is Broken", "Be credible, without arts and crafts.");

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
