import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Divider, Header } from "semantic-ui-react";
import Layout from "../../../components/layouts";
import { Fragment } from "react";

const index = () => {
  const [active, setActive] = useState("solution");

  const { site } = useRouter().query;

  const card = (header, subheader, next) => (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header,
        subHeader: subheader,
      }}
    >
      <Fragment>
        <Button.Group fluid attached="top">
          <Button
            onClick={() => {
              setActive("problem");
            }}
          >
            Problem Solved
          </Button>
          <Button
            onClick={() => {
              setActive("who");
            }}
          >
            Our Users
          </Button>
          <Button
            onClick={() => {
              setActive("solution");
            }}
          >
            The Solution
          </Button>
        </Button.Group>
        <Link href={`/admin/${site}/signup`}>
          <Button
            style={{ marginTop: "10px" }}
            attached="bottom"
            fluid
            color="linkedin"
          >
            Start Free Trial
          </Button>
        </Link>
      </Fragment>
    </Layout>
  );

  const who = (next) =>
    card(
      "Value time and money",
      "Startup Founders, Consultants, Side Hustlers, and more!",
      next
    );

  const solution = (next) =>
    card(
      "A tinker-free DIY website builder",
      "Accelerate iteration & boost credibility",
      next
    );

  // tech for clients 0-10

  const why = (next) =>
    card(
      "Marketing & Technical Debt",
      "Avoid significant investments in growth, until you've proven your service is a success",
      next
    );

  const problem = (next) =>
    card(
      "Early Stage Tech Tradeoff",
      "Significant time & finances are prematurely invested in high risk technology and marketing. Or, it is ignored and the credibility of the company suffers."
    );

  switch (active) {
    case "who":
      return who("solution");
    case "solution":
      return solution("why");
    case "why":
      return why("problem");
    case "problem":
      return problem("who");
    default:
      return <div>whofdkhsafdhsjka</div>;
  }
};

export default index;
