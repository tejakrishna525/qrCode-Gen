import React, { useState, useEffect } from "react";

const ColorSelectionComponent = ({onColorChange, qrColors}) => {
  const [colorType, setColorType] = useState("single");
  const [singleColor, setSingleColor] = useState("#000000");
  const [gradientColor, setGradientColor] = useState("#FFFFFF"); // State for the second gradient color
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [backgroundTextColor, setBackgroundTextColor] = useState("#FFFFFF");
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(()=>{
    setSingleColor(qrColors.singleColor);
    setBackgroundColor(qrColors.backgroundColor)
    setGradientColor(qrColors.gradientColor)
    console.log("gradient", qrColors.backgroundColor)
  },[qrColors])

  const handleTextColorChange = (e) => {
    const colorValue = e.target.value;
    setSingleColor(colorValue);
  };

  const handleColorChange = (e) => {
    setSingleColor(e.target.value);
    onColorChange({ singleColor: e.target.value });
  };

  const handleGradientColorChange = (e) => {
    setGradientColor(e.target.value);
    onColorChange({ gradientColor: e.target.value });
  };

  const handleBackgroundTextColorChange = (e) => {
    const colorValue = e.target.value;
    setBackgroundTextColor(colorValue);
    if (/^#([0-9A-F]{3,4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(colorValue)) {
      setBackgroundColor(colorValue);
      onColorChange({ backgroundColor: colorValue });
      setShowColorPicker(true);
    } else {
      setShowColorPicker(false);
    }
  };
  useEffect(() => {
    setBackgroundTextColor(backgroundColor);
  }, [backgroundColor]);

  console.log(backgroundColor, 'backgroundColor')

  return (
    <div className="p-4 space-y-2">
      <div className="foreground">
        <div className="flex items-center space-x-2">
          {/* Radio Buttons */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="colorType"
              value="single"
              className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
              checked={colorType === "single"}
              onChange={() => setColorType("single")}
            />
            <span className="ml-2">Single Color</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="colorType"
              value="gradient"
              className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
              checked={colorType === "gradient"}
              onChange={() => setColorType("gradient")}
            />
            <span className="ml-2">Color Gradient</span>
          </label>
          {/* <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
              checked={showColorPicker}
              onChange={(e) => setShowColorPicker(e.target.checked)}
            />
            <span className="ml-2">Custom Eye Color</span>
          </label> */}
        </div>

        {/* Unified Color Picker and Textbox Row */}
        <div className="flex items-center space-x-2 mt-2">
          {/* Always visible: Color Picker and Textbox for the First Color */}
          <input
            type="color"
            value={singleColor}
            onChange={handleColorChange}
            className="w-10 h-8 border-gray-300"
          />
          <input
            type="text"
            value={singleColor}
            onChange={handleTextColorChange}
            className="border-gray-300 p-1"
            placeholder="#000000"
          />

          {/* Conditionally visible: Additional Elements for Gradient */}
          {colorType === "gradient" && (
            <>
              <input
                type="color"
                value={gradientColor}
                onChange={handleGradientColorChange}
                className="w-10 h-8 border-gray-300"
              />
              <input
                type="text"
                value={gradientColor}
                onChange={handleGradientColorChange}
                className="border-gray-300 p-1"
                placeholder="#FFFFFF"
              />
            </>
          )}
        </div>
      </div>
      

      {/* Background Color Selection */}
      <div className="background space-y-2 mt-2">
        <span>Background Color</span>
        <div className="flex items-center space-x-2">
            <input
              type="color"
              value={backgroundTextColor}
              onChange={ handleBackgroundTextColorChange}
              className="w-10 h-8 border-gray-300"
            />
          <input
            type="text"
            value={backgroundTextColor}
            onChange={handleBackgroundTextColorChange}
            className="border-gray-300 p-1"
            placeholder="#FFFFFF"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorSelectionComponent;
