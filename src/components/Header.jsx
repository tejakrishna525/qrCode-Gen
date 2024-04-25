
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <img src={logo} alt="QR Code Generator Logo" className="h-12 w-12" />
      <span className="text-white text-xl font-bold">QR Code Generator</span>
    </div>
  );
};

export default Header;
