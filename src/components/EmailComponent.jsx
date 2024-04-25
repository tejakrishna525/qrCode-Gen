import React, { useState, useEffect } from "react";
import Accordion from "./Accordian";
import ColorSelectionComponent from "./ColorSelectionComponent";
import iconsConfig from "./IconsConfig";
import LogoUploadComponent from "./LogoUploadComponent";
import { MdEmail } from "react-icons/md";
import QRCodeManager from "./QrcodeManager";
import SpriteSheetDisplay from "./SpriteSheetDisplay";

const EmailComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // New state variables
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // qrcode displat state variables
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

  useEffect(() => {
    // Update `qrValue` when email, subject, or message changes
    const qrLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    setQrValue(qrLink); // Use setter to update the state variable
  }, [email, subject, message]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setSelectedImageUrl(reader.result); // Maintain the selected image URL in state
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
            icon={index === 0 ? <MdEmail /> : <Icon />}
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
                    width: "68.75px",
                  }}
                >
                  Your Email
                </label>
                <input
                  className="w-full p-2 border-b border-transparent focus:border-blue-500  outline-none mb-4" // Increased spacing to mb-4
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  Subject
                </label>
                <input
                  className="w-full p-2 border-b border-transparent outline-none focus:border-blue-500 mb-4" // Increased spacing to mb-4
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
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
                  className="w-full p-2 border-b border-transparent focus:outline-none  focus:border-blue-500 mb-4" // Increased spacing to mb-4
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

export default EmailComponent;
