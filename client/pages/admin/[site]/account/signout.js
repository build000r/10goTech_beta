import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { buildClient } from "../../../../api/build-client";
import VertCenterGrid from "../../../../components/grid/vert-center";
import { useRequest } from "../../../../hooks/use-request";
import { Button, Header } from "semantic-ui-react";
import Link from "next/link";

const signout = ({ user }) => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push(`/admin/${user.userOfSite}`),
  });

  if (user) {
    useEffect(() => {
      doRequest();
    }, []);

    return <VertCenterGrid>signing out of {user.userOfSite}</VertCenterGrid>;
  } else {
    return (
      <VertCenterGrid>
        <Header textAlign="center">You've signed out</Header>
        <Link href={`/admin/${useRouter().query.site}`}>
          <Button fluid>Go home</Button>
        </Link>
      </VertCenterGrid>
    );
  }
};

signout.getInitialProps = async (context) => {
  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const user = currentUser.currentUser;
  return { user };
};

export default signout;
