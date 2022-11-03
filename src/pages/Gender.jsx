import React from "react";

const Gender = ({ name, img, selected, setSelected }) => {
  const handleSelected = (name) => {
    if (selected?.key === name) {
      setSelected(null);
    } else {
      setSelected({ key: name, value: name === "bro" ? "Male" : "Female" });
    }
  };

  return (
    <div
      onClick={() => handleSelected(name)}
      className={`flex flex-col items-center justify-center px-4 py-1 rounded-lg shadow-[4px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer ${
        selected?.key === name ? " border-2 border-orange " : "border-0"
      }`}
    >
      <img src={img} alt="" />
      <p>{name}</p>
    </div>
  );
};

export default Gender;
