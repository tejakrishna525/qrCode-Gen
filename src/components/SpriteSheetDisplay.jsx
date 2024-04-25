import React, { useState } from "react";
import SpriteFrame from "./SpriteSheetComponent";

const spriteData = [
  { id: 1, backgroundPosition: { x: -585, y: -95 } }, //  { id: 2, backgroundPosition: { x: -585, y: -95 } },
  { id: 2, backgroundPosition: { x: -505, y: -455 } },
  { id: 3, backgroundPosition: { x: -105, y: -215 } },
  // { id: 4, backgroundPosition: { x: -5, y: -455 } },
];

const eyeFrameShape = [
    {id : 5 , type : "dot",backgroundPosition : {x : -525, y: -245}},
    {id : 6 ,type : "square",backgroundPosition : {x : -525, y: -125}},
    {id : 7, type : "extra-rounded",backgroundPosition : {x : -5, y: -305}},

]

const SpriteSheetDisplay = ({ onSelectBodyType,selectedId, setSelectedId , onSelectEyeType,setSelectedEyeId ,selectedEyeId }) => {

  const handleSelectBodyType = (id) => {
    setSelectedId(id);
    // Call the callback function with the selected body type
    onSelectBodyType(spriteData.find(sprite => sprite.id === id));
  };

  const handleSelectedEyeType = (id) =>{
    setSelectedEyeId(id);
    console.log("id",id)
    onSelectEyeType(eyeFrameShape.find(sprite => sprite.id === id))
    
  }

  return (
    <>
      <label
        className=" text-gray-600 font-bold text-sm leading-tight cursor-default mb-0 pb-2 pl-0 pr-0 pt-0 text-left visible"
        style={{
          boxSizing: "border-box",
          fontSize: "12.8px",
          height: "27.2px",
          width: "74.0875px",
          color: "rgb(111, 120, 127)",
        }}
      >
        Body Shape
      </label>

      <div
        className="bg-gray-200 grid grid-cols-4 gap-8"
        style={{ width: "240px" }}
      >
        {spriteData.map((sprite) => (
          <div
            key={sprite.id}
            className={`bg-white cursor-pointer rounded-lg flex justify-center items-center ${selectedId === sprite.id ? 'bg-gray-100 border-4 border-blue-500' : ''}`}
            style={{ width: "60px", height: "60px", overflow: "hidden" }}
            onClick={() => handleSelectBodyType(sprite.id)}
          >
            <div style={{ transform: "scale(0.5)", transformOrigin: "center" }}>
              <SpriteFrame backgroundPosition={sprite.backgroundPosition} width={90} height={80} />
            </div>
          </div>
        ))}
        
        
      </div>
      <label
        className=" text-gray-600 font-bold text-sm leading-tight cursor-default mb-0 pb-2 pl-0 pr-0 pt-0 text-left visible"
        style={{
          boxSizing: "border-box",
          fontSize: "12.8px",
          height: "27.2px",
          width: "74.0875px",
          color: "rgb(111, 120, 127)",
        }}
      >
        Eye Frame Shape
      </label>
      <div className="bg-gray-200 grid grid-cols-4 gap-8"

        style={{ width: "240px" }}>
            {eyeFrameShape.map((sprite) => (
          <div
            key={sprite.id}
            className={`bg-white cursor-pointer rounded-lg flex justify-center items-center  ${selectedEyeId === sprite.id ? 'bg-gray-100 border-4 border-blue-500' : ''}`}
            style={{ width: "60px", height: "60px", overflow: "hidden" }}
            onClick={() => handleSelectedEyeType(sprite.id)}
          >
            <div style={{ transform: "scale(0.7)", transformOrigin: "center" }}>
              <SpriteFrame backgroundPosition={sprite.backgroundPosition}  width={50} height={50}/>
            </div>
          </div>
        ))}

        </div>
    
       
    </>
  );
};

export default SpriteSheetDisplay;
