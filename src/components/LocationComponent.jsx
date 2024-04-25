import React, { useState,useEffect } from "react";
import Accordion from "./Accordian";
import ColorSelectionComponent from "./ColorSelectionComponent";
import iconsConfig from "./IconsConfig";
import LogoUploadComponent from "./LogoUploadComponent";
import MapComponent from "./MapComponent"; // Ensure you import the MapComponent
import { ImLocation2 } from "react-icons/im";
import SpriteSheetDisplay from "./SpriteSheetDisplay";
import QRCodeManager from "./QrcodeManager";

const LocationComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [location, setLocation] = useState({ lat: "", lng: "" });

  //QR code state Variables
  const [inputValue, setInputValue] = useState("https://example.com"); // State to hold input field value
  const [qrValue, setQrValue] = useState(inputValue); // State to hold QR code value
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

// Set Qrcode value when location changes
useEffect(() => {
  if (location.lat && location.lng) {
    const googleMapsUrl = `https://maps.google.com/?q=${location.lat},${location.lng}`;
    setQrValue(googleMapsUrl); // Update QR code with the Google Maps URL
  } else {
    setQrValue("https://example.com"); // Default value when location is not set
  }
}, [location]);
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
            icon={index === 0 ? <ImLocation2 /> : <Icon />}
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
                <div className="flex flex-wrap justify-between">
                  <div className="flex-1 mr-2 min-w-[calc(50%-0.5rem)]">
                    {" "}
                    {/* Adjust spacing here */}
                    <label
                      className="block font-bold text-sm mb-1 cursor-default text-gray-500"
                      style={{
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: "12.8px",
                      }}
                    >
                      Latitude
                    </label>
                    <input
                      className="w-full mb-4 border-b border-transparent focus:border-blue-500 outline-none"
                      type="text"
                      value={location?.lat || ""}
                      onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                      placeholder="Latitude"
                    />
                  </div>
                  <div className="flex-1 min-w-[calc(50%-0.5rem)]">
                    {" "}
                    {/* Adjust spacing here */}
                    <label
                      className="block font-bold text-sm mb-1 cursor-default text-gray-500"
                      style={{
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: "12.8px",
                      }}
                    >
                      Longitude
                    </label>
                    <input
                      className="w-full mb-4 border-b border-transparent focus:border-blue-500 outline-none"
                      type="text"
                      value={location?.lng || ""}
                      onChange={(e) => setLocation({ ...location, lng: e.target.value })}
                      placeholder="Longitude"
                    />
                  </div>
                </div>
                <MapComponent location={location} setLocation={setLocation} />
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

export default LocationComponent;
