import { Card, Button, Icon } from "semantic-ui-react";
import { useMediaQuery } from "../../hooks/use-media-query";

import Link from "next/link";

const TinyCard = ({ header, description, linkTo }) => (
  <Card>
    <Card.Content>
      <Card.Header as="h3" textAlign="center">
        {header}
      </Card.Header>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
    <Link href={linkTo}>
      <Button fluid color="linkedin">
        <Icon className="arrow alternate circle right icon"></Icon>
      </Button>
    </Link>
  </Card>
);

export default TinyCard;
