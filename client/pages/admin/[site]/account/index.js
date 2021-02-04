import { Button, Header } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import VertCenterGrid from "../../../../components/grid/vert-center";
import Link from "next/link";
import { useAuth } from "../../../../hooks/use-auth";
import { useRouter } from "next/router";

const index = ({ user }) => {
  const renderIfAuth = () => {
    const { id, email, userOfSite } = user;

    return (
      <VertCenterGrid>
        {" "}
        <Header textAlign="center">You're signed in as {email} </Header>
        <Link href={`/admin/${userOfSite}/account/signout`}>
          <Button fluid size="huge">
            Sign Out
          </Button>
        </Link>
      </VertCenterGrid>
    );
  };

  return useAuth({
    user,
    currentUrlSite: useRouter().query.site,
    renderIfAuth,
  });
};

index.getInitialProps = async (context) => {
  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const user = currentUser.currentUser;

  return { user };
};

export default index;
