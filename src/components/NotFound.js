import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <article className="no-found container">
    <h1>404!</h1>
    <p>
      Content not found.
      <Link to="/"> Return to Posts</Link>
    </p>
  </article>
);
export default NotFound;
