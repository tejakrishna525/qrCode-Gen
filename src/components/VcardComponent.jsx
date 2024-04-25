import React, { useState, useEffect } from "react";
import ColorSelectionComponent from "./ColorSelectionComponent";
import iconsConfig from "./IconsConfig";
import LogoUploadComponent from "./LogoUploadComponent";
import Accordion from "./Accordian";
import InputField from "./VcardInputField"; // Import the new InputField component
import { FaAddressCard } from "react-icons/fa";
import QRCodeManager from "./QrcodeManager";
import SpriteSheetDisplay from "./SpriteSheetDisplay";
import VCard from "vcard-creator";

const VcardComponent = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    position: "",
    phoneWork: "",
    phonePrivate: "",
    phoneMobile: "",
    faxWork: "",
    faxPrivate: "",
    email: "",
    street: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
  });

  //QR code state Variables
  const [inputValue, setInputValue] = useState("https://example.com"); // State to hold input field value
  const [qrValue, setQrValue] = useState(inputValue); // State to hold QR code value
  const [qrSize, setQrSize] = useState(280); // Default quality for download
  const [isCreated, setIsCreated] = useState(false); // state to track the qrcode is created

  const toggleAccordion = (title) =>
    setOpenAccordion(openAccordion === title ? null : title);

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

  useEffect(() => {
    // Fill the vCard with data from formData
    const myVcard = new VCard(); //
    myVcard.addName(formData.firstName, formData.lastName);
    myVcard.addCompany(formData.organization);
    myVcard.addRole(formData.position);
    myVcard.addPhoneNumber(formData.phoneWork, "WORK");
    myVcard.addPhoneNumber(formData.phonePrivate, "HOME");
    myVcard.addPhoneNumber(formData.phoneMobile, "MOBILE");
    myVcard.addEmail(formData.email);
    myVcard.addAddress(
      "",
      formData.street,
      "",
      formData.city,
      formData.state,
      formData.zipcode,
      formData.country
    );

    // Update the QR code value with the formatted vCard content
    setQrValue(myVcard.toString());
  }, [formData]); // Re-run useEffect when formData changes

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

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value, // Update the specific field
    }));
  };

  return (
    <div className="bg-red-100 flex flex-col md:flex-row h-auto min-h-[640px] mx-auto rounded-lg shadow">
      <div className="w-full md:w-3/4 bg-gray-200 p-4 md:p-8 space-y-2 rounded-lg">
        {iconsConfig.map(({ icon: Icon, title }, index) => (
          <Accordion
            key={index}
            icon={index === 0 ? <FaAddressCard /> : <Icon />}
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
              <div className="grid grid-cols-3  w-full [&_input]:h-8">
                <InputField
                  label="Firstname"
                  value={formData.firstName}
                  //  onChange={(e) => setFirstName(e.target.value)}

                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
                <InputField
                  label="Lastname"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
                <InputField
                  label="Organization"
                  value={formData.organization}
                  onChange={(e) =>
                    handleInputChange("organization", e.target.value)
                  }
                />
                <InputField
                  label="Position (Work)"
                  value={formData.position}
                  onChange={(e) =>
                    handleInputChange("position", e.target.value)
                  }
                />
                <InputField
                  label="Phone (Work)"
                  value={formData.phoneWork}
                  onChange={(e) =>
                    handleInputChange("phoneWork", e.target.value)
                  }
                />
                <InputField
                  label="Phone (Private)"
                  value={formData.phonePrivate}
                  onChange={(e) =>
                    handleInputChange("phonePrivate", e.target.value)
                  }
                />
                <InputField
                  label="Phone (Mobile)"
                  value={formData.phoneMobile}
                  onChange={(e) =>
                    handleInputChange("phoneMobile", e.target.value)
                  }
                />
                <InputField
                  label="Fax (Work)"
                  value={formData.faxWork}
                  onChange={(e) => handleInputChange("faxWork", e.target.value)}
                />
                <InputField
                  label="Fax (Private)"
                  value={formData.faxPrivate}
                  onChange={(e) =>
                    handleInputChange("faxPrivate", e.target.value)
                  }
                />
                <InputField
                  label="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <InputField
                  label="Street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                />
                <InputField
                  label="Zipcode"
                  value={formData.zipcode}
                  onChange={(e) => handleInputChange("zipcode", e.target.value)}
                />
                <InputField
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
                <InputField
                  label="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
                <InputField
                  label="Country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
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

export default VcardComponent;
