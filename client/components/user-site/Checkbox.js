import React, { useState, Fragment } from "react";
import { Form } from "semantic-ui-react";

const Checkbox = (clickOptions, handleSelected) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentClickOpt = checked.indexOf(c); //returns first index of which given element is found in array OR returns -1 if not found
    const newClickOpts = [...checked];

    // if currenly checked was not already in checked state then -> push, else pull/take off

    if (currentClickOpt === -1) {
      newClickOpts.push(c);
    } else {
      newClickOpts.splice(currentClickOpt, 1);
    }

    setChecked(newClickOpts);
    handleSelected(newClickOpts);
  };

  return clickOptions.map((c, i) => {
    return (
      <Fragment key={i}>
        <Form.Checkbox
          onChange={handleToggle(c)}
          value={checked.indexOf(c === -1)}
          label={c.name}
        />
      </Fragment>
    );
  });
};

export default Checkbox;
