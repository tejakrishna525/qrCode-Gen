import React from "react";

const SpriteFrame = ({
  backgroundPosition = { x: 0, y: 0 },
  width,
  height,
}) => {
  // Destructure with defaults in case backgroundPosition is undefined
  const { x, y } = backgroundPosition;

  const style = {
    backgroundImage:
      "url(https://www.qrcode-monkey.com/img/qr/spritesheet.png)", // Replace with the actual path
    backgroundPosition: `${x}px ${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundRepeat: "no-repeat",
    display: "block",
    // other styles...
  };

  return <div className="sprite" style={style} />;
};

export default SpriteFrame;
