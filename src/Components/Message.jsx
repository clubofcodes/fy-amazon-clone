import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} className="my-3 text-capitalize">
      {children}
    </Alert>
  );
};

export default Message;
