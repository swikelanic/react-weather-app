import { useState } from "react";

interface Props {
  onSearch: (q: string) => void;
  defaultValue?: string;
}

export default function SearchBar({ onSearch, defaultValue = "" }: Props) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Search city..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}
