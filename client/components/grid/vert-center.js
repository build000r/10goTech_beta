import { Container, Grid, Segment } from "semantic-ui-react";
import { useMediaQuery } from "../../hooks/use-media-query";

const VertCenterGrid = ({ children, addWidth = 0 }) => {
  return (
    <Container basic>
      <Grid columns={1} style={{ minHeight: "90vh" }}>
        <Grid.Row verticalAlign="middle" centered>
          <Grid.Column
            stretched
            style={{
              maxWidth: useMediaQuery(375 + addWidth)
                ? 250 + addWidth
                : 350 + addWidth,
              padding: "0",
            }}
          >
            <Segment basic style={{ marginTop: "-100px" }}>
              {children}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default VertCenterGrid;
