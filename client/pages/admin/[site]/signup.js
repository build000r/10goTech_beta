import { Signup } from "../../../components/auth/signup-basic";
import VertCenterGrid from "../../../components/grid/vert-center";

const signup = () => {
  return (
    <VertCenterGrid>
      <Signup createSitePermission="true" />
    </VertCenterGrid>
  );
};

export default signup;
