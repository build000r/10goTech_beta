// import axios from "axios";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Button, Header, List, Message } from "semantic-ui-react";
import Layout from "../components/layouts";

const useAuth = ({ user, currentUrlSite, renderIfAuth, siteOwnerId }) => {
  const goLogInOrSignUp = () => (
    <Layout
      smallLeaderboard
      leaderboardData={{
        header: `Create a free account to access this page`,
        subHeader: "",
        dividerText: "Do you have an account with us?",
        // btnText,
        // btnPath,
        // dividerText,
      }}
    >
      {user && user.userOfSite ? (
        <Header.Subheader>
          You're currently logged into {user.userOfSite}. Did you mean to go
          there?
        </Header.Subheader>
      ) : (
        <Button.Group fluid>
          <Link href={`/user/${currentUrlSite}/auth/signup`}>
            <Button inverted color="linkedin">
              Sign Up
            </Button>
          </Link>
          <Link href={`/user/${currentUrlSite}/auth/signin`}>
            <Button>Sign In</Button>
          </Link>
        </Button.Group>
      )}
    </Layout>
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
