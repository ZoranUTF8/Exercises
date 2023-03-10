import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="text-center">
      <div style={hideWhenVisible}>
        <Button variant="primary" type="button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="primary" type="button" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;
