import React from "react";

import Pokedex from "Assets/Pokedex.png";

export const Header = () => {
  return (
    <div className="flex justify-center mb-10">
      <img
        src={Pokedex}
        alt=""
      />
    </div>
  );
};
