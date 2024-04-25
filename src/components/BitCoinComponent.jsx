import React, { useState ,useEffect} from "react";
import Accordion from "./Accordian";
import ColorSelectionComponent from "./ColorSelectionComponent";
import iconsConfig from "./IconsConfig";
import LogoUploadComponent from "./LogoUploadComponent";
import { FaBitcoinSign } from "react-icons/fa6"
import SpriteSheetDisplay from "./SpriteSheetDisplay";
import QRCodeManager from "./QrcodeManager";

const BitCoinComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("Bitcoin");
  const [address, setAddress] = useState("1FwFqqh71mUTENcRe9q4s9AWFgoc8BA9ZU");
  const [amount, setAmount] = useState("");

  
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
  useEffect(() => {
    const scheme = selectedCrypto.toLocaleLowerCase()
    const baseUrl = `${scheme}:${address}`; // Base URL for Bitcoin payment
    const queryParams = amount ? `?amount=${amount}` : ""; // Optional query parameter for the amount
    const fullUrl = `${baseUrl}${queryParams}`;

    setQrValue(fullUrl); // Set the QR code value with the constructed Bitcoin URL
  }, [address, amount]); // Dependencies
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
    console.log(newColors, "newColors");
    setQrColors((prevColors) => ({ ...prevColors, ...newColors }));
  };


  return (
    <div className="bg-blue-100 flex flex-col md:flex-row h-auto min-h-[640px] mx-auto rounded-lg shadow">
      <div className="w-full md:w-3/4 bg-gray-200 p-4 md:p-8 space-y-2 rounded-lg">
        {iconsConfig.map(({ icon: Icon, title }, index) => (
          <Accordion
            key={index}
            icon={index === 0 ? <FaBitcoinSign /> : <Icon />}
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
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  {[
                    "Bitcoin",
                    "Bitcoin Cash",
                    "Ethereum",
                    "Litecoin",
                    "Dash",
                  ].map((crypto, idx) => (
                    <label key={idx} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="crypto"
                        value={crypto}
                        checked={selectedCrypto === crypto}
                        onChange={() => setSelectedCrypto(crypto)}
                        className="form-radio"
                      />
                      <span className="ml-2">{crypto}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-start items-center space-x-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    placeholder="1FwFqqh71mUTENcRe9q4s9AWFgoc8BA9ZU"
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 px-3 py-1 border-b border-transparent focus:border-blue-500 outline-none w-1/2"
                  />
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 px-3 py-1 border-b border-transparent focus:border-blue-500 outline-none"
                  />
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

export default BitCoinComponent;
