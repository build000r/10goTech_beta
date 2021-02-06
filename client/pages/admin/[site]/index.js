import { buildClient } from "../../../api/build-client";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react";
import VertCenterGrid from "../../../components/grid/vert-center";
import { Fragment } from "react";
import TinyCard from "../../../components/card/tiny-card";
import NoSite from "../../../components/error/site-does-not-exist";
import { useSiteType } from "../../../hooks/use-site-type";

const index = () => {
  const [active, setActive] = useState("solution");

  const { site } = useRouter().query;

  const card = (header, subheader, next) => (
    <Fragment>
      <VertCenterGrid addWidth={200}>
        <Header as="h1" textAlign="center">
          {header}
          <Header.Subheader>{subheader}</Header.Subheader>
        </Header>

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
      </VertCenterGrid>
    </Fragment>
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
