import "react-quill/dist/quill.snow.css"; // ES6
import ReactQuill from "react-quill";
import React, { Fragment, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";

const Editor = ({ onBodyChange, oldBody }) => {
  const [values, setValues] = useState({
    editorHtml: oldBody || "",
  });

  const { editorHtml } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e });
  };

  useEffect(() => {
    setValues({ ...values, editorHtml: oldBody });
  }, [oldBody]);

  return (
    <Fragment>
      <ReactQuill
        style={{ minHeight: "375px" }}
        theme="snow"
        onChange={handleChange("editorHtml")}
        value={editorHtml}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            [
              "link",
              //    "image", "video"
            ],
            ["clean"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          // "image",
          // "video",
        ]}
        bounds={".app"}
        placeholder={"Enter an email here"}
      />
      <Button attached="bottom" onClick={() => onBodyChange(editorHtml)}>
        Save Email Body
      </Button>
    </Fragment>
  );
};

export default Editor;