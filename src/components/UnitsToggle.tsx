import { Units } from "../services/weatherApi";

interface Props {
  units: Units;
  onChange: (u: Units) => void;
}

export default function UnitsToggle({ units, onChange }: Props) {
  return (
    <button
      className="btn ghost"
      onClick={() => onChange(units === "metric" ? "imperial" : "metric")}
    >
      {units === "metric" ? "°C" : "°F"}
    </button>
  );
}
