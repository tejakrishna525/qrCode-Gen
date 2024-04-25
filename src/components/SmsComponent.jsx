import React, { useState ,useEffect} from "react";
import Accordion from "./Accordian";
import ColorSelectionComponent from "./ColorSelectionComponent";
import iconsConfig from "./IconsConfig";
import LogoUploadComponent from "./LogoUploadComponent";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import QRCodeManager from "./QrcodeManager";
import SpriteSheetDisplay from "./SpriteSheetDisplay";


const SmsComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // New state variables
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  //Qr code display state variables
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
  
  
  //const vCard = `BEGIN:VCARD\nVERSION:3.0\nTEL:${phone}\nnote:${message}\nEND:VCARD`;
  // const vCard = vCard();
  // vCard.note =  `${message}`;
  
  // Generate the vCard as a formatted string

  useEffect(() => {
    // Set the QR code value to trigger an SMS application with phone and message
    setQrValue(`SMSTO:${phone}:${message}`);
  }, [phone, message]); // Update when phone or message changes
  




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
      <div className="w-full md:w-3/4 bg-gray-200 p-4 md:p-8 space-y-2 rounded-lg ">
        {iconsConfig.map(({ icon: Icon, title }, index) => (
          <Accordion
            key={index}
            icon={index === 0 ? <IoChatbubbleEllipsesSharp /> : <Icon />}
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
                <label
                  className="block font-bold text-sm mb-2 pb-2 cursor-default text-gray-500"
                  style={{
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: "12.8px",
                    height: "27.2px",
                    lineHeight: "19.2px",
                    width: "auto",
                  }}
                >
                  Your Phone Number
                </label>
                <input
                  className="w-full p-2 border-b border-transparent focus:border-blue-500 outline-none mb-4" // Increased spacing to mb-4
                  placeholder="+91 9999999999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label
                  className="block font-bold text-sm mb-2 pb-2 cursor-default text-gray-500"
                  style={{
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: "12.8px",
                    height: "27.2px",
                    lineHeight: "19.2px",
                    width: "68.75px",
                  }}
                >
                  Message
                </label>
                <textarea
                  className="w-full p-2 border-b border-transparent focus:border-blue-500 outline-none mb-4" // Increased spacing to mb-4
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                />
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
      {/* qrCode display */}
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

export default SmsComponent;
