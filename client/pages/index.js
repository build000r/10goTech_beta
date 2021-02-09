import { Segment } from "semantic-ui-react";

const index = () => {
  useEffect(() => {
    Router.push("/admin/rfp");
  }, []);

  return (
    <Segment>
      <h1>redirect </h1>
    </Segment>
  );
};

export default index;
