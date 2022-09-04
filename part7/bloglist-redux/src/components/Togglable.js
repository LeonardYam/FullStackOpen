import { Button } from "@mantine/core";
import { useState } from "react";
import { cloneElement } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {cloneElement(props.children, { toggle: toggleVisibility })}
        <Button onClick={toggleVisibility} variant="outline">cancel</Button>
      </div>
    </div>
  );
};

export default Togglable;
