import { useRouter } from "next/router";
import { useRequest } from "../../../../hooks/use-request";
import { Button } from "semantic-ui-react";
import Router from "next/router";

const activate = () => {
  const { activate, site } = useRouter().query;
  const { doRequest, errors } = useRequest({
    url: `/api/users/activate/${activate}`,
    method: "post",
    onSuccess: () => Router.push(`/${site}`),
  });

  const activateAccount = async () => {
    await doRequest();
  };

  return (
    <div>
      {errors}
      activate token: {activate}
      <Button onClick={activateAccount}> Activate Account </Button>
    </div>
  );
};

export default activate;
