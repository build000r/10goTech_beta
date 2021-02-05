// import axios from "axios";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Button, Header, List, Message } from "semantic-ui-react";
import VertCenterGrid from "../components/grid/vert-center";

const useAuth = ({ user, currentUrlSite, renderIfAuth, siteOwnerId }) => {
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
        <Header.Subheader>
          <Button.Group>
            <Link href={`/user/${currentUrlSite}/auth/signup`}>
              <Button inverted color="linkedin">
                Sign Up
              </Button>
            </Link>
            <Link href={`/user/${currentUrlSite}/auth/signin`}>
              <Button>Sign In</Button>
            </Link>
          </Button.Group>
        </Header.Subheader>
      </Header>
    </VertCenterGrid>
  );

  if (user && user.id === siteOwnerId) {
    console.log(user);
    return renderIfAuth();
  }

  return user && user.userOfSite === currentUrlSite
    ? renderIfAuth()
    : goLogInOrSignUp();
};

export { useAuth };
