import React from "react";

const Button = ({ title = "Click Me", styles = "" }) => {
  return (
    <button
      className={`bg-transparent py-3 px-4 text-white border border-opacity-75 rounded-lg hover:bg-[#1c1c1c] hover:transition-transform
    hover:border-y-white hover:shadow-md ${styles}`}
    >
      {title}
    </button>
  );
};

export default Button;
