function  Accordion({ icon, title, children, isOpen, setIsOpen }) {
  // Use the passed `isOpen` state to control the open/close state of the accordion
  return (
    <div>
      <div
        className="w-full bg-slate-50 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(title)} // Update to toggle based on title
        tabIndex="0"
      >
        <div className="flex items-center ">
          <span className={`w-8 h-8 ${isOpen ? 'bg-blue-400 text-white' : 'bg-[#f2f8fc]'}  flex items-center justify-center`}>
            {icon}
          </span>
          <div className="px-2 mx-8 rounded-sm">{title}</div>
        </div>
        <button
          className="w-6 h-6 bg-white flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click from bubbling to the header div
            setIsOpen(title);
          }}
        >
          {isOpen ? "–" : "+"} {/* Change icon based on open state */}
        </button>
      </div>
      {isOpen && <div className="bg-white-100 py-4 space-y-2">{children}</div>}
    </div>
  );
}
export default Accordion
