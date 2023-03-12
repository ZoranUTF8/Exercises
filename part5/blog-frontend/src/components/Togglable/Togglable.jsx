import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

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

//? We would like to enforce that when the Togglable component is used, the button label text prop must be given a value.
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

//? The react-devtools also reveals that the component does not have a name we can fix it by this
Togglable.displayName = "Togglable";

export default Togglable;
