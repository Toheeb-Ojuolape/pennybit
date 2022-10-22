import React from "react";

const Icon = ({ width, height, id }) => {
  return (
    <svg width={width} height={height}>
      <use xlinkHref={`${process.env.PUBLIC_URL}/svgs/icon-sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
