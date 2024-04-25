import React, { useState, useEffect } from "react";
import Accordion from "./Accordian";
import ColorSelectionComponent from "./ColorSelectionComponent";
import iconsConfig from "./IconsConfig";
import LogoUploadComponent from "./LogoUploadComponent";
import { FaTwitter } from "react-icons/fa";
import SpriteSheetDisplay from "./SpriteSheetDisplay";
import QRCodeManager from "./QrcodeManager";

const TwitterComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Twitter URL");
  const [url, setUrl] = useState("");

  //QR code state Variables
  const [inputValue, setInputValue] = useState("https://example.com"); // State to hold input field value
  const [qrValue, setQrValue] = useState(inputValue); // State to hold QR code value
  const [qrSize, setQrSize] = useState(280); // Default quality for download
  const [isCreated, setIsCreated] = useState(false); // state to track the qrcode is created
  const [qrColors, setQrColors] = useState({
    singleColor: "#000000",
    gradientColor: "#000000",
    backgroundColor: "#FFFFFF",
  });
  const [selectedBodyType, setSelectedBodyType] = useState(null); // State to store selected body type
  const [selectedImageUrl, setSelectedImageUrl] = useState(null); // State to store the selected image URL
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEyeType, setSelectedEyeType] = useState(null);
  const [selectedEyeId, setSelectedEyeId] = useState(null); // State to Store selected eye frame

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
    let updatedQRValue;

    if (selectedOption === "Twitter URL") {
      updatedQRValue = url; // QR code for Twitter profile or page
    } else if (selectedOption === "Tweet") {
      updatedQRValue = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        url
      )}`; // QR code for tweeting with the provided text
    }

    setQrValue(updatedQRValue); // Update QR code value
  }, [selectedOption, url]); // Re-run when the selected option or URL changes

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
    console.log(newColors, "newColors");
    setQrColors((prevColors) => ({ ...prevColors, ...newColors }));
  };

  return (
    <div className="bg-blue-100 flex flex-col md:flex-row h-auto min-h-[640px] mx-auto rounded-lg shadow">
      <div className="w-full md:w-3/4 bg-gray-200 p-4 md:p-8 space-y-2 rounded-lg">
        {iconsConfig.map(({ icon: Icon, title }, index) => (
          <Accordion
            key={index}
            icon={index === 0 ? <FaTwitter /> : <Icon />}
            title={title}
            isOpen={openAccordion === title}
            setIsOpen={toggleAccordion}
          >
            {title === "SET COLOR" && (
              <ColorSelectionComponent
                qrColors={qrColors}
                onColorChange={handleColorSettingsChange}
              />
            )}
            {title === "ENTER CONTENT" && (
              <div>
                <div className="flex space-x-2 items-center mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="urlOption"
                      value="Twitter URL"
                      checked={selectedOption === "Twitter URL"}
                      onChange={() => setSelectedOption("Twitter URL")}
                    />
                    <span className="ml-2">Twitter URL</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="urlOption"
                      value="Tweet"
                      checked={selectedOption === "Tweet"}
                      onChange={() => setSelectedOption("Tweet")}
                    />
                    <span className="ml-2">Tweet</span>
                  </label>
                </div>
                <label className="block font-bold text-sm mb-2 cursor-default text-gray-500">
                  {selectedOption === "Twitter URL"
                    ? "Your Twitter URL"
                    : "Share your URL on Twitter"}
                </label>
                {selectedOption === "Tweet" ? (
                  <textarea
                    className="w-full p-2 border-b border-transparent focus:border-blue-500 outline-none h-24" // Adjusted height for textarea
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    rows="5"
                    placeholder="Compose your tweet..."
                  />
                ) : (
                  <input
                    className="w-full p-2 border-b border-transparent focus:border-blue-500 outline-none h-8"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to share"
                  />
                )}
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
                onSelectEyeType={setSelectedEyeType}
                selectedEyeId={selectedEyeId}
                setSelectedEyeId={setSelectedEyeId}
              />
            )}
          </Accordion>
        ))}
      </div>

      {/* qr code Dispay */}
      <div className="w-full md:w-[400px] bg-white rounded-lg mt-4 md:mt-0 p-4 flex flex-col items-center justify-start space-y-6">
        <QRCodeManager
          value={qrValue}
          level="H"
          selectedBodyType={selectedBodyType}
          selectedImageUrl={selectedImageUrl}
          colors={qrColors}
          selectedEyeType={selectedEyeType}
        />
      </div>
    </div>
  );
};

export default TwitterComponent;
