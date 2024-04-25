import React, { useState ,useEffect} from "react";
import Accordion from "./Accordian";
import ColorSelectionComponent from "./ColorSelectionComponent";
import iconsConfig from "./IconsConfig";
import LogoUploadComponent from "./LogoUploadComponent";
import { IoWifi } from "react-icons/io5";
import SpriteSheetDisplay from "./SpriteSheetDisplay";
import QRCodeManager from "./QrcodeManager";


const WifiComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [encryption, setEncryption] = useState('nopass'); // Initializing the encryption state
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
  const [selectedEyeId, setSelectedEyeId] = useState(null); // State to Store 

  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');


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
    let wifiQrString = `WIFI:T:${encryption};S:${ssid};P:${password};;`; // Construct the QR code string
    setQrValue(wifiQrString); // Update the QR code value
  }, [encryption, ssid, password]); // Re-run useEffect when these dependencies change


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
  // Define handleEncryptionChange to update the encryption type
  const handleEncryptionChange = (e) => {
    setEncryption(e.target.value);
  };

  return (
    <div className="bg-blue-100 flex flex-col md:flex-row h-auto min-h-[640px] mx-auto rounded-lg shadow">
      <div className="w-full md:w-3/4 bg-gray-200 p-4 md:p-8 space-y-2 rounded-lg">
        {iconsConfig.map(({ icon: Icon, title }, index) => (
          <Accordion
            key={index}
            icon={index === 0 ? <IoWifi /> : <Icon />}
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
              <div className="flex flex-wrap space-x-4 grid grid-cols-3 w-full">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Wireless SSID
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full h-10 px-3 border-b border-transparent focus:border-blue-500 outline-none"
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    className="mt-2 block w-full h-10 px-3 border-b border-transparent focus:border-blue-500 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Encryption
                  </label>
                  <select
                    value={encryption}
                    onChange={handleEncryptionChange}
                    className="mt-2 block w-full h-10 px-3 border-b border-transparent focus:border-blue-500 outline-none appearance-none"
                  >
                    <option value="nopass">No Encryption</option>
                    <option value="WEP">WEP</option>
                    <option value="WPA/WPA2">WPA/WPA2</option>
                  </select>
                </div>
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

export default WifiComponent;
