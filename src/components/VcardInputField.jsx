const InputField = ({ label, value, onChange, placeholder }) => (
  <div className="w-full px-2">
    <label className="block font-bold text-sm mb-2 pb-2 cursor-default text-gray-500">
      {label}
    </label>
    <input
      className="w-full p-2 mb-4 border-b border-transparent focus:border-blue-500 outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);
export default InputField