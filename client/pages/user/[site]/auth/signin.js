import { Grid, Segment } from "semantic-ui-react";
import { Signin } from "../../../../components/auth/signin";
import VertCenterGrid from "../../../../components/grid/vert-center";

const signin = () => {
  return (
    <VertCenterGrid>
      <Signin siteType="user" />
    </VertCenterGrid>
  );
};

export default signin;
