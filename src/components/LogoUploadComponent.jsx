import React, { useState } from "react";
import facebookLogo from "../logos/facebook.png";
import fbLogo from "../logos/fblogo.png";
import twitter from "../logos/twitter-icon-circle.svg";
import youtube from "../logos/youtube-icon.svg";
import youtubeicon from "../logos/youtube.svg";
import googleplus from "../logos/google-plus-logo.svg";
import linkedin from "../logos/linkedin-icon.svg";
import vimeo from "../logos/vimeo.png";
import appstore from "../logos/appstore-seeklogo.svg";
import googleplay from "../logos/google-play-store.svg";
import gmail from "../logos/gmail.svg"
import zigment from "../logos/zigment.png"
import instagram from "../logos/Instagram.png"
import whatspp from "../logos/WhatsApp.png"

// Import other logos as needed

const socialMediaLogos = [
  { id: "facebook", logo: facebookLogo },
  { id: "fbLogo", logo: fbLogo },
  { id: "zigment", logo: zigment },
  { id: "twitter", logo: twitter },
  { id: "youtube", logo: youtube },
  { id: "youtube-icon", logo: youtubeicon },
  { id: "google-plus", logo: googleplus },
  {
    id: "instagram",
    logo: instagram,
  },
  { id: "linkedin", logo: linkedin },
  { id: "vimeo", logo: vimeo },
  { id: "whatspp", logo: whatspp },
  { id: "appstore", logo: appstore },
  { id: "googleplay", logo: googleplay },
  {id : "gmail",logo : gmail}

  // Add more logos as needed
];

const LogoUploadComponent = ({
  imagePreviewUrl, // Use directly from props
  handleImageChange,
  handleRemoveImage,
  triggerFileInput,
  setSelectedImageUrl // selected logo 
}) => {

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center">
        <div
          className="bg-white w-40 h-40 p-2 border-2 border-gray-300 flex items-center justify-center cursor-pointer"
          onClick={triggerFileInput}
        >
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt="Uploaded Logo"
              className="w-full h-full object-contain"
              
            />
          ) : (
            <span>NO LOGO</span>
          )}
        </div>
        <div className="flex flex-col ml-4">
          <button
            onClick={triggerFileInput}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200 mt-2"
          >
            Upload Image
          </button>
          {imagePreviewUrl && (
            <button
              onClick={() => handleRemoveImage()}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-200 mt-2"
            >
              Remove Image
            </button>
          )}
        </div>
        <input
          type="file"
          id="logo-image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="mt-4 flex-wrap flex">
        {socialMediaLogos.map(({ id, logo }) => (
          <div
            key={id}
            className="bg-white p-2 border border-gray-300 m-1 shadow-sm"
          >
            <img
              src={logo}
              alt={`${id} logo`}
              className="w-10 h-10 cursor-pointer"
              onClick={() => setSelectedImageUrl(logo)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoUploadComponent;


