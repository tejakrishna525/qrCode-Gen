import React, { useState } from "react";

const MenuBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-[#247f4f] p-4">
      <ul className="flex justify-between items-center space-x-4">
        <li><a href="/#about" className="text-white py-2" onClick={toggleMobileMenu}>ABOUT</a></li>
        <li><a href="https://chrome.google.com/webstore/detail/gidoepdbdhacpopcmepkflghaalfapmk" target="_blank" rel="noopener noreferrer" className="text-white py-2">CHROME APP</a></li>
        <li><a href="https://www.qrcode-monkey.com/qr-code-api-with-logo/" className="text-white py-2">QR CODE API</a></li>
        <li className="relative">
          <button onClick={toggleDropdown} className="text-white py-2 flex items-center">
            ENGLISH <i className="fas fa-angle-down ml-2"></i>
          </button>
          {dropdownOpen && (
            <ul className="absolute left-0 w-40 mt-1 bg-blue-500 rounded shadow-lg z-10">
              <li><a href="https://www.qrcode-monkey.com/de/" className="text-white py-2 block px-4 hover:bg-blue-600">Deutsch</a></li>
              <li><a href="https://www.qrcode-monkey.com/es/" className="text-white py-2 block px-4 hover:bg-blue-600">Español</a></li>
              <li><a href="https://www.qrcode-monkey.com/fr/" className="text-white py-2 block px-4 hover:bg-blue-600">Français</a></li>
              <li><a href="https://www.qrcode-monkey.com/it/" className="text-white py-2 block px-4 hover:bg-blue-600">Italiano</a></li>
              <li><a href="https://www.qrcode-monkey.com/pt/" className="text-white py-2 block px-4 hover:bg-blue-600">Português</a></li>
              <li><a href="https://www.qrcode-monkey.com/id/" className="text-white py-2 block px-4 hover:bg-blue-600">Indonesian</a></li>
              <li><a href="https://www.qrcode-monkey.com/ru/" className="text-white py-2 block px-4 hover:bg-blue-600">Русский</a></li>
              <li><a href="https://www.qrcode-monkey.com/th/" className="text-white py-2 block px-4 hover:bg-blue-600">ไทย</a></li>
              <li><a href="https://www.qrcode-monkey.com/ar/" className="text-white py-2 block px-4 hover:bg-blue-600">عربى</a></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
