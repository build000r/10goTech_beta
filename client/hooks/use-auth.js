// import axios from "axios";
import axios from "axios";
import { useState } from "react";
import { Header, List, Message } from "semantic-ui-react";
import VertCenterGrid from "../components/grid/vert-center";

const useAuth = ({ user, currentUrlSite, renderIfAuth }) => {
  const goLogInOrSignUp = () => (
    <VertCenterGrid>
      <Header textAlign="center">
        {" "}
        You must be logged into {currentUrlSite} access this page.
        {user && user.userOfSite ? (
          <Header.Subheader>
            You're currently logged into {user.userOfSite}. Did you mean to go
            there?
          </Header.Subheader>
        ) : null}
      </Header>
      go log in or sign up
    </VertCenterGrid>
  );

  return user && user.userOfSite === currentUrlSite
    ? renderIfAuth()
    : goLogInOrSignUp();
};

export { useAuth };
