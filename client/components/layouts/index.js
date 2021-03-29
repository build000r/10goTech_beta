import { Fragment } from "react";
import {
  Container,
  Segment,
  Header,
  Grid,
  Button,
  Divider,
} from "semantic-ui-react";
import Router from "next/router";

const Layout = ({
  children,
  fullPageLeaderboard,
  smallLeaderboard,
  leaderboardData,
  heightOverride,
}) => {
  // fullpageleaderboard
  // smallleaderboard

  // calculate out the difference in the full and small

  // mobile menu button is 36px

  const showLeaderboard = ({
    header,
    subHeader,
    btnText,
    btnPath,
    dividerText,
  }) => (
    <Segment
      basic
      style={
        fullPageLeaderboard
          ? {
              minHeight: "calc(100vh - 2rem)",
            }
          : {
              minHeight: "33vh",
            }
      }
    >
      <Grid
        columns={1}
        centered
        style={
          fullPageLeaderboard
            ? {
                minHeight: "calc(100vh - 2rem)",
              }
            : {
                minHeight: "33vh",
              }
        }
      >
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header as="h2" textAlign="center">
              {header}

              <Header.Subheader>{subHeader}</Header.Subheader>

              {btnPath && btnText && (
                <Button
                  color="linkedin"
                  style={{ marginTop: "1rem" }}
                  onClick={() => Router.push(btnPath)}
                >
                  {btnText}
                </Button>
              )}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {!smallLeaderboard ? "" : <Divider horizontal>{dividerText}</Divider>}
    </Segment>
  );

  return (
    <Fragment>
      {showLeaderboard(leaderboardData)}
      <Container
        style={
          smallLeaderboard
            ? {
                minHeight: heightOverride || "67vh",
              }
            : { minHeight: heightOverride || null }
        }
      >
        {children}
      </Container>
    </Fragment>
  );
};

export default Layout;
