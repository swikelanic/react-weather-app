import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">React Weather App</h1>
      <span className="text-sm">Your forecast at a glance</span>
    </header>
  );
};

export default Header;
