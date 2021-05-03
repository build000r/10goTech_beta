import React, { Fragment, useEffect, useState } from "react";
import { Button, TextArea } from "semantic-ui-react";

import dynamic from "next/dynamic";

const { useQuill } = dynamic(() => import("react-quilljs"));
dynamic(() => import("quill/dist/quill.snow.css"));

const Editor = ({ onBodyChange, oldBody }) => {
  const [values, setValues] = useState({
    editorHtml: oldBody,
  });

  const { quill, quillRef } = useQuill();

  const { editorHtml } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e });
  };

  const onEditorChange = (e) => {
    setValues({ ...values, editorHtml: e });
  };

  useEffect(() => {
    if (quill && oldBody) {
      setValues({ ...values, editorHtml: oldBody });
      quill.clipboard.dangerouslyPasteHTML(editorHtml);
      quill.on("text-change", () => {
        onBodyChange(quillRef.current.innerHTML);
      });
    }
  }, [quill, oldBody]);

  return (
    <Fragment>
      {console.log(editorHtml)}
      <div
        ref={quillRef}
        style={{ minHeight: "375px" }}
        theme="snow"
        // onChange={handleChange("editorHtml")}
        // value={editorHtml}
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
      {/* ) : (
      <TextArea
        style={{ width: "100%", minHeight: "400px" }}
        onChange={handleChange("editorHtml")}
        value={editorHtml}
      />
      ) */}
      {/* <Button attached="bottom" onClick={() => onBodyChange(editorHtml)}>
        Save Email Body
      </Button> */}
    </Fragment>
  );
};

export default Editor;
