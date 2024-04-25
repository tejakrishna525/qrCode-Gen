import React from "react";

function SectionGetStarted() {
  const handleGetStartedClick = () => {
    console.log("Navigate to QR Code creation page or trigger action");
    // Here you could navigate to the QR Code creation page or trigger a modal, etc.
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-4 mb-10 ">
      <h2 className="text-center text-lg font-normal text-gray-600 mb-2 text-lg	font-medium	">
        GET STARTED
      </h2>
      <h2 className="text-center text-xl leading-6 font-normal text-gray-600 mb-4">
        <span className="font-bold">Create</span> your{" "}
        <span className="font-bold">custom QR Code</span> with{" "}
        <span className="font-bold">Logo</span>
      </h2>
      {/* <button
        onClick={handleGetStartedClick}
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow"
      >
        Create QR Code  
      </button> */}
      <div className="bg-white p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 shadow rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Set QR Content</h3>
          <p className="font-sans text-sm">
            Select a content type at the top for your QR code (URL, Text,
            Email...). After selecting your type you will see all available
            options. Enter all fields that should appear when scanning your QR
            code. Make sure everything you enter is correct because you can’t
            change the content once your QR code is printed.
          </p>
        </div>
        {/* Step 2 */}
        <div className="p-4 shadow rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Customize Design</h3>
          <p className="font-sans text-sm">
            You want your QR code to look unique? Set a custom color and replace
            the standard shapes of your QR code. The corner elements and the
            body can be customized individually. Add a logo to your QR code.
            Select it from the gallery or upload your own logo image. You can
            also start with one of the templates from the template gallery.
          </p>
        </div>
        {/* Step 3 */}
        <div className="p-4 shadow rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Generate QR Code</h3>
          <p className="font-sans text-sm">
            Set the pixel resolution of your QR code with the slider. Click the
            "Create QR Code"-button to see your QR code preview. Please make
            sure your QR code is working correctly by scanning the preview with
            your QR Code scanner. Use a high resolution setting if you want to
            get a png code with print quality.
          </p>
        </div>
        {/* Step 4 */}
        <div className="p-4 shadow rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Download Image</h3>
          <p className="font-sans text-sm">
            Now you can download the image files for your QR code as .png or
            .svg, .pdf, .eps vector graphic. If you want a vector format with
            the complete design please choose .svg. SVG is working in software
            like Adobe Illustrator or Inkscape. The logo and design settings
            currently only work for .png and .svg files.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SectionGetStarted;
