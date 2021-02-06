import { useRouter } from "next/router";
import { useRequest } from "../../../../hooks/use-request";
import { Button } from "semantic-ui-react";
import VertCenterGrid from "../../../../components/grid/vert-center";
import Router from "next/router";

const activate = () => {
  const { activate, site } = useRouter().query;

  const { doRequest, errors } = useRequest({
    url: `/api/users/activate/${activate}`,
    method: "post",
    onSuccess: () => Router.push(`/user/${site}`),
  });

  const activateAccount = async () => {
    await doRequest();
  };

  return (
    <div>
      <VertCenterGrid>
        {errors}
        <Button size="massive" fluid onClick={activateAccount}>
          {" "}
          Activate Account{" "}
        </Button>
        <Message>
          By activating your account you consent to receive email notifications
          and instructions on how to use the website. We take your privacy
          seriously and will not share your information with 3rd parties.
        </Message>
      </VertCenterGrid>
    </div>
  );
};

export default activate;
