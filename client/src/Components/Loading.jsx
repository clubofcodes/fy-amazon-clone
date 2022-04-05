import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({ size = 50 }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className="mx-auto my-5 d-block"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
    // <div class="dots-bars-3 text-center"></div>
  );
};

export default Loading;
