import React, { useState } from 'react';

const ShapeSelector = () => {
  const [selectedShape, setSelectedShape] = useState('square'); // Default shape

  // Array of shape options
  const shapes = [
    { id: 'square', name: 'Square', icon: 'path/to/square-icon.svg' },
    { id: 'circle', name: 'Circle', icon: 'path/to/circle-icon.svg' },
    { id: 'dot', name: 'Dot', icon: 'path/to/dot-icon.svg' },
    // Add more shapes as needed
  ];

  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
    // Additional actions based on shape selection can be handled here
  };

  return (
    <div className="flex justify-center items-center space-x-4 p-4">
      {shapes.map((shape) => (
        <button key={shape.id} onClick={() => handleShapeSelect(shape.id)}
                className={`p-2 rounded-full ${selectedShape === shape.id ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-700`}>
          <img src={shape.icon} alt={shape.name} className="h-8 w-8" />
        </button>
      ))}
    </div>
  );
};

export default ShapeSelector;
