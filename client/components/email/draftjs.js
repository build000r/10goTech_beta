import React, { Fragment, useEffect, useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const EmailDraftJs = ({ onBodyChange, oldBody }) => {
  const [values, setValues] = useState({
    editorHtml: oldBody,
  });

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const { editorHtml } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e });
  };

  const onEditorChange = (e) => {
    setValues({ ...values, editorHtml: e });
  };

  useEffect(async () => {
    if (oldBody) {
      setValues({
        ...values,
        editorHtml: oldBody,
      });
    }
  }, [oldBody]);

  return (
    <Fragment>
      {console.log(editorHtml)}
      {console.log(editorState)}
      <Editor editorState={editorState} onChange={setEditorState} />;
    </Fragment>
  );
};

export default EmailDraftJs;
