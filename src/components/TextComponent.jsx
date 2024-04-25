import React, { useState, useRef ,useEffect} from "react";

import Accordion from "./Accordian";
import ColorSelectionComponent from "./ColorSelectionComponent";
import iconsConfig from "./IconsConfig";
import LogoUploadComponent from "./LogoUploadComponent";
import { FiFileText } from "react-icons/fi";
import QRCodeManager from "./QrcodeManager";
import SpriteSheetDisplay from "./SpriteSheetDisplay";
 // state to track the qrcode is created

const TextComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isCreated, setIsCreated] = useState(false);

  //Qr code manager state variables
  const [inputValue, setInputValue] = useState("https://example.com"); // State to hold input field value
  const [qrValue, setQrValue] = useState(inputValue); // State to hold QR code value
  const [qrColors, setQrColors] = useState({
    singleColor: "#000000",
    gradientColor: "#000000",
    backgroundColor: "#FFFFFF",
  });
  const [qrSize, setQrSize] = useState(280); // Default quality for download
  const [selectedBodyType, setSelectedBodyType] = useState(null); // State to store selected body type
  const [selectedImageUrl, setSelectedImageUrl] = useState(null); // State to store the selected image URL
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEyeType, setSelectedEyeType] = useState(null);
  const [selectedEyeId, setSelectedEyeId] = useState(null);// State to Store selected eye frame

  const toggleAccordion = (title) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setSelectedImageUrl(reader.result); // Maintain the selected image URL in state
        console.log("Image loaded and set:", reader.result); // Debugging line
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setQrValue(inputValue);
  }, [inputValue]);

  const handleRemoveImage = () => {
    setImagePreviewUrl(null);
    setSelectedImageUrl(null); // Reset the selected image URL in state
  };

  const triggerFileInput = () => {
    document.getElementById("logo-image-upload").click();
  };

  // Ensure this function updates both states as needed
  const handleLogoSelect = (logo) => {
    setImagePreviewUrl(logo);
    setSelectedImageUrl(logo);
  };

  const handleColorSettingsChange = (newColors) => {
    setQrColors((prevColors) => ({ ...prevColors, ...newColors }));
  };

  return (
    <div className="bg-red-100 flex flex-col md:flex-row h-auto min-h-[640px] mx-auto rounded-lg shadow">
      <div className="w-full md:w-3/4 bg-gray-200 p-4 md:p-8 space-y-2 rounded-lg">
        {iconsConfig.map(({ icon: Icon, title }, index) => (
          <Accordion
            key={index}
            icon={index === 0 ? <FiFileText /> : <Icon />}
            title={title}
            isOpen={openAccordion === title}
            setIsOpen={toggleAccordion}
          >
            {/* Accordians */}
            {title === "SET COLOR" && (
              <ColorSelectionComponent
                qrColors={qrColors}
                onColorChange={handleColorSettingsChange}
              />
            )}
            {title === "ENTER CONTENT" && (
              <div>
                <label htmlFor="text-content">Your Text</label>
                <textarea
                  id="text-content"
                  className="w-full m-px border-b border-transparent focus:border-blue-500 outline-none"
                  placeholder="Enter your text here"
                  rows="5"
                  onChange={(e) => setInputValue(e.target.value)}
                ></textarea>
              </div>
            )}
           {title === "ADD LOGO IMAGE" && (
              <LogoUploadComponent
                imagePreviewUrl={imagePreviewUrl}
                handleImageChange={handleImageChange}
                handleRemoveImage={handleRemoveImage}
                triggerFileInput={triggerFileInput}
                setSelectedImageUrl={handleLogoSelect}
              />
            )}
             {title === "CUSTOMIZE DESIGN" && (
              <SpriteSheetDisplay
                onSelectBodyType={setSelectedBodyType} // Pass the callback function
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                onSelectEyeType = {setSelectedEyeType}
                selectedEyeId = {selectedEyeId}
                setSelectedEyeId = {setSelectedEyeId}
                
              />
            )}
          </Accordion>
        ))}
      </div>

      {/* qrCode display */}
      <div className="w-full md:w-[400px] bg-white rounded-lg mt-4 md:mt-0 p-4 flex flex-col items-center justify-start space-y-6">
      <QRCodeManager
          value={qrValue}
          level="H"
          selectedBodyType={selectedBodyType}
          selectedImageUrl={selectedImageUrl}
          colors={qrColors}
          selectedEyeType = {selectedEyeType}
        />  
      </div>
    </div>
  );
};

export default TextComponent;
