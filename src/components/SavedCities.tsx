import React from "react";
import "./SavedCities.css";

interface SavedCitiesProps {
  cities: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
  onClearAll: () => void;
}

const SavedCities: React.FC<SavedCitiesProps> = ({ cities, onSelect, onRemove, onClearAll }) => {
  if (cities.length === 0) return null;

  return (
    <div className="saved-cities">
      <h3>Saved Cities</h3>
      <ul>
        {cities.map((c) => (
          <li key={c}>
            <span onClick={() => onSelect(c)}>{c}</span>
            <button onClick={() => onRemove(c)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={onClearAll}>Clear All</button>
    </div>
  );
};

export default SavedCities;
