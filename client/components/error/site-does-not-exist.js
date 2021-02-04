import { useRouter } from "next/router";
import { Message } from "semantic-ui-react";
import VertCenterGrid from "../grid/vert-center";

const NoSite = ({ siteAuth }) => (
  <VertCenterGrid>
    <Message negative>
      <Message.Header>
        {useRouter().query.site
          ? `The site " ${useRouter().query.site}"
        does not exist.`
          : "404 page not found"}
      </Message.Header>

      {siteAuth && siteAuth !== useRouter().query.site ? (
        <div>
          I noticed you are logged into <strong>{siteAuth}</strong>, did you
          mean to go there?
        </div>
      ) : null}
    </Message>
  </VertCenterGrid>
);

export default NoSite;
