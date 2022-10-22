import React from "react";

const Button = ({ content, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-3 mt-4 rounded-full focus:outline-none text-white bg-orange w-full text-lg hover:border-2 hover:border-orange hover:text-orange hover:bg-transparent"
    >
      {content}
    </button>
  );
};

export default Button;
