import axios from "axios";
import { useState } from "react";
import { List, Message } from "semantic-ui-react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const [errMsgArr, setErrMsgArr] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(" did you import Router from next/router?", err);
      setErrors(
        <Message negative>
          <Message.Header>
            There is a problem with the form submission.
          </Message.Header>
          <List as="ul">
            {err.response.data.errors.map((e) => (
              <List.Item as="li" key={e.message}>
                {e.message}
              </List.Item>
            ))}
          </List>
        </Message>
      );

      setErrMsgArr(err.response.data.errors.map((e) => e.message));
    }
  };

  return { doRequest, errors, errMsgArr };
};

export { useRequest };
