import React, { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import Spinner from "./Spinner";

// Function to determine the QR code dot shape
const getShapeType = (id) => {
  switch (id) {
    case 1:
      return "extra-rounded";
    case 2:
      return "square";
    case 3:
      return "dots";
    case 4:
      return "classy";
    case 5:
      return "dot";
    case 6:
      return "square";
    case 7:
      return "extra-rounded";
    default:
      return "square";
  }
};

// Function to get dot options
const getDotsOptions = (id, colors) => {
  const type = getShapeType(id);

  if (colors?.gradientColor && colors.gradientColor !== "#000000") {
    return {
      type: type,
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: colors.singleColor },
          { offset: 1, color: colors.gradientColor },
        ],
      },
    };
  } else {
    return {
      type: type,
      color: colors?.singleColor || "#000000", // Default to single color
    };
  }
};

const QRCodeManager = ({ value, selectedBodyType, selectedImageUrl, colors, selectedEyeType }) => {
  const [qrSize, setQrSize] = useState(300); // For download size
  const [isLoading, setIsLoading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("svg");
  const qrCodeRef = useRef(null);
  const fixedDisplaySize = 300; // Fixed size for UI display

  const qrCode = new QRCodeStyling({
    width: fixedDisplaySize, // Fixed size for UI
    height: fixedDisplaySize,
    type: "svg",
    data: "https://example.com",
    dotsOptions: {
      type: "square",
      color: "#000000",
    },
    backgroundOptions: { color: "#ffffff" },
  });

  useEffect(() => {
    // Append QR code on mount
    if (qrCodeRef.current.firstChild) {
      qrCodeRef.current.removeChild(qrCodeRef.current.firstChild);
    }
    qrCode.append(qrCodeRef.current);
  }, []); // Default QR code on initial load

  const handleCreateQRCode = () => {
    setIsLoading(true);

    const hasGradient = colors?.gradientColor && colors.gradientColor !== "#000000";
    const dotsOptions = {
      type: getShapeType(selectedBodyType?.id),
      color: colors.singleColor,
    };

    if (hasGradient) {
      dotsOptions.gradient = {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: colors.singleColor },
          { offset: 1, color: colors.gradientColor },
        ],
      };
    }

    const updatedQRCode = new QRCodeStyling({
      data: value,
      image: selectedImageUrl,
      dotsOptions: dotsOptions,
      backgroundOptions: { color: colors?.backgroundColor || "#ffffff" },
      cornersSquareOptions: {
        type: getShapeType(selectedEyeType?.id),
      },
      width: fixedDisplaySize, // Fixed display size
      height: fixedDisplaySize,
    });

    // Clear and append new QR code to the display area
    if (qrCodeRef.current.firstChild) {
      qrCodeRef.current.removeChild(qrCodeRef.current.firstChild);
    }

    updatedQRCode.append(qrCodeRef.current);
    setIsLoading(false);
  };

  const downloadQRCode = () => {
    setIsLoading(true);
    qrCode.update({
      width: qrSize, // Use the slider value for download
      height: qrSize,
    });
    qrCode.download({
      name: `QRCode_${qrSize}x${qrSize}`, // Use qrSize for download
      extension: downloadFormat,
    });
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        {isLoading && <Spinner />}
        <div ref={qrCodeRef} style={{ width: fixedDisplaySize, height: fixedDisplaySize }}></div> {/* Fixed display size */}
      </div>
      <div className="w-full px-4 py-4">
        <input
          type="range"
          min="200"
          max="2000"
          value={qrSize}
          onChange={(e) => setQrSize(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs fonst-sans font-light">
          <span>Low Quality</span>
          <span className="font-semibold">{qrSize}x{qrSize} Px</span>
          <span>High Quality</span>
        </div>
      </div>
      <div className="mb-4">
        <button
          onClick={handleCreateQRCode}
          disabled={isLoading}
          className="bg-green-200 hover:bg-green-300 text-black font-bold py-2 px-4 m-4"
        >
          Create QR Code
        </button>
        <div>
          <button
            onClick={downloadQRCode}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-4"
          >
            Download QR
          </button>
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="bg-white text-black font-bold py-2 px-4"
          >
            <option value="svg">SVG</option>
            <option value="pdf">PDF</option>
            <option value="eps">EPS</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default QRCodeManager;
