import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div
      className="flex my-10 h-[420px] gap-4
     container flex-col items-center justify-center mx-auto  mt-20"
    >
      Docs Goes here.
      <p>Currently Working...</p>
      <Link to="/">
        <Button title="Go to main Page" />
      </Link>
    </div>
  );
};

export default Docs;
