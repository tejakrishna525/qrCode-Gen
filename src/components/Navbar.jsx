import React, { useState } from "react";

const Navbar = ({ setCurrentPage, activeComponent }) => {
  const handleItemClick = (page) => {
    console.log(page, "page");
    // setActiveItem(page);
    setCurrentPage(page);
  };

  return (
    <div
      className="bg-[#247f4f] p-4"
      style={{
        fontFamily: '"Open Sans", sans-serif',
        fontSize: "50px",
        fontWeight: 400,
        lineHeight: "24px",
      }}
    >
      <ul className="flex justify-between w-full">
        {[
          "url",
          "text",
          "email",
          "phone",
          "sms",
          "vcard",
          "mecard",
          "location",
          "facebook",
          "twitter",
          "youtube",
          "wifi",
          "event",
          "bitcoin",
         // "more",
        ].map((item) => (
          <li
            key={item}
            className="mx-2 flex"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item);
            }}
          >
            <button
              className={`block text-center border-b-2 pb-2 text-sm  text-white cursor-pointer transition-all duration-300 ease-in-out ${
                activeComponent === item
                  ? "border-white font-bold"
                  : "border-transparent"
              }`}
              style={{
                fontFamily: '"Open Sans", sans-serif',
                textDecoration: "none",
                textTransform: "uppercase",
              }}
              title={`Create QR Code for a ${
                item.charAt(0).toUpperCase() + item.slice(1)
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
