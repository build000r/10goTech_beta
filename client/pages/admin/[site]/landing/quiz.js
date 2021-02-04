import { Button, Icon, Card, Message } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import VertCenterGrid from "../../../../components/grid/vert-center";

const quiz = () => {
  const [active, setActive] = useState("thisone");
  const { site } = useRouter().query;

  const [values, setValues] = useState({
    question: 0,
    employed: false,
    idea: false,
    msg: "",
  });

  const { question, employed, msg, idea } = values;

  const score = () => (
    //Great. Validation of your ability to perform a service + Validation of an employers willingness to pay for that service.
    //     - No: While I applaud your interest in entrepreneurship, we’re probably not a good fit yet. Go out there and validate your ability to perform a service + validate an employers willingness to pay for that service first.
    <Card>
      <Card.Header as="h3">So far, you've...</Card.Header>
      {employed ? (
        <Fragment>
          <Card.Content extra>
            <Icon name="check" /> validated ability to provide a service
          </Card.Content>
          <Card.Content extra>
            <Icon name="check" /> validated service is something someone will
            pay for
          </Card.Content>
        </Fragment>
      ) : (
        ""
      )}
      {idea ? (
        <Fragment>
          <Card.Content extra>
            <Icon name="check" /> Aren't trying to start a business you can't
            add value to!
          </Card.Content>
        </Fragment>
      ) : (
        ""
      )}
    </Card>
  );

  const notForYou = () => (msg ? <Message>{msg}</Message> : "");

  const handleChange = (name, value, msg) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value || value,
      msg: msg ? msg : "",
      question: question + 1,
    });
  };

  const buttons = (name, rightAnswer, wrongMessage) => {
    // if a question, show yes/no otherwise show next question
    return (
      <div>
        <Button floated="right" onClick={handleChange(name, rightAnswer)}>
          {rightAnswer ? "True" : "False"}
        </Button>
        <Button
          floated="left"
          onClick={handleChange(name, rightAnswer ? false : true, wrongMessage)}
        >
          {rightAnswer ? "False" : "True"}
        </Button>
      </div>
    );
  };

  const askQuestion = (header, name, rightAnswer, wrongMessage) => (
    <Card fluid>
      <Card.Header as="h4" textAlign="center">
        {header}{" "}
      </Card.Header>
      {buttons(name, rightAnswer, wrongMessage)}
    </Card>
  );

  const showQuestion = (i) => {
    if (i % 2) {
      return (
        <Fragment>
          {score()}
          <Button
            fluid
            onClick={() => {
              setValues({ ...values, question: question + 1 });
            }}
          >
            {" "}
            Next question
          </Button>
        </Fragment>
      );
    }

    switch (i) {
      case 0:
        return askQuestion(
          "I am, or was, employed",
          "employed",
          true,
          "go do something"
        );
      case 2:
        return askQuestion(
          "I want to start a business related to services I've validated",
          "idea",
          true,
          "People need to stop starting businesses they have no business being in"
        );

      default:
        return <div></div>;
    }
  };

  return (
    <Fragment>
      <VertCenterGrid>
        {employed ? "" : notForYou()}
        {showQuestion(question)}
      </VertCenterGrid>
    </Fragment>
  );
};

export default quiz;
//  POST TO REDDIT -> is my landing page too aggressive? - Take a look
// through the no’s…
// Idea to business
// Is this for me?

// Prerequisites:
// 1. Validated skill set

// The path of least resistance for skilled individuals to start an investable business.

// - I am (or have been) employed
//     - Yes:
// - I have an idea for a business
//     - Yes: is it related to the services you’ve validated?
//         - Yes: okay great. The world does not need someone starting a business with zero experience.
//         - No: Listen, you can do whatever you want, but you are making things incredibly difficult for yourself by removing the validation acquired in your previous employment.
//             - Dear everyone, stop starting businesses you have no business starting.
//     -  No: That’s okay. The validation you’ve acquired through your previous employment is a better starting place than “ideas” anyways. Take a minute to write down the validated services you’ve performed in the last question.
// - I am dead set on doing arts and crafts
//         - Arts and crafts: making a logo, picking brand colors, drag and dropping on website builders, investing (e.g. in software, a sales team, etc.) for scale without knowing if it WILL scale
//     - Yes: This isn’t for you. None of that stuff matters right now.
//     - No: Fantastic. I hear there are no more plots available in the Wordpress graveyard
// - I am
