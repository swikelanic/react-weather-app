import React from "react";
import "./SavedLocation.css";

interface SavedLocationProps {
  savedLocations: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
  onClearAll: () => void;
}

const SavedLocation: React.FC<SavedLocationProps> = ({ savedLocations, onSelect, onRemove, onClearAll }) => {
  return (
    <div className="saved-location p-2 mt-4 bg-white rounded shadow w-64 text-center">
      <h3 className="font-bold mb-2">Saved Locations</h3>
      {savedLocations.length === 0 ? (
        <p>No saved locations</p>
      ) : (
        <ul>
          {savedLocations.map((loc, index) => (
            <li key={index} className="flex justify-between items-center mb-1">
              <button onClick={() => onSelect(loc)} className="text-blue-600 hover:underline">{loc}</button>
              <button onClick={() => onRemove(loc)} className="text-red-500 ml-2">X</button>
            </li>
          ))}
        </ul>
      )}
      {savedLocations.length > 0 && (
        <button onClick={onClearAll} className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          Clear All
        </button>
      )}
    </div>
  );
};

export default SavedLocation;
