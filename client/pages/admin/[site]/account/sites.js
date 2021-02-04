import { Card, Button } from "semantic-ui-react";
import { buildClient } from "../../../../api/build-client";
import VertCenterGrid from "../../../../components/grid/vert-center";
import Link from "next/link";
import { Fragment } from "react";
import { useAuth } from "../../../../hooks/use-auth";
import { useRouter } from "next/router";

const sites = ({ user, sites }) => {
  const isTempTitle = (sitetitle) => sitetitle.includes("Change_This_Title");

  const renderIfAuth = () => {
    return (
      <div>
        <VertCenterGrid>
          <div>
            <Button>
              <Link href={`/admin/${user.userOfSite}/onboard/select-package`}>
                add subscription
              </Link>
            </Button>
          </div>
          {sites.length > 0
            ? sites.map((s) => (
                <Fragment>
                  <Card fluid centered key={s.title}>
                    <Card.Header as="h3" textAlign="center">
                      {isTempTitle(s.title) ? "Your New Site!" : s.title}
                    </Card.Header>

                    <Link href={`/admin/${user.userOfSite}/account/${s.title}`}>
                      <Button attached="bottom">
                        view subscription details
                      </Button>
                    </Link>
                    <Link href={`/user/${s.title}/admin`}>
                      <Button attached="bottom">Edit site</Button>
                    </Link>
                  </Card>
                </Fragment>
              ))
            : "no sites created yet"}
        </VertCenterGrid>
      </div>
    );
  };

  return useAuth({
    user,
    currentUrlSite: useRouter().query.site,
    renderIfAuth,
  });
};

sites.getInitialProps = async (context) => {
  const { data: currentUser } = await buildClient(context).get(
    "/api/users/currentuser"
  );

  const user = currentUser.currentUser;

  if (user) {
    const { data: userSites } = await buildClient(context).get(`/api/site`);

    const sites = userSites.userSites;

    return { user, sites };
  } else {
    return { user };
  }
};

export default sites;
