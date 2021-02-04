import { Signin } from "../../../components/auth/signin";
import VertCenterGrid from "../../../components/grid/vert-center";

const signin = () => {
  return (
    <VertCenterGrid>
      <Signin siteType="admin" />
    </VertCenterGrid>
  );
};

export default signin;
