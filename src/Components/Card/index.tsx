import React, { useEffect, useState } from "react";

import { getDynamicColor } from "Utils";

type CardsProps = {
  url: string;
  name: string;
  number: number;
  onClick: () => void;
};

const Card: React.FC<CardsProps> = ({ url, name, number, onClick }) => {
  const [colorHexValue, setColorHex] = useState("");

  useEffect(() => {
    const getColor = async () => {
      const colorHex = await getDynamicColor(url);

      setColorHex(colorHex);
    };

    getColor();
  }, []);

  return (
    <div
      style={{ "--bg-color": colorHexValue } as React.CSSProperties}
      className={`h-[200px] bg-[var(--bg-color)] col-span-1 hover:cursor-pointer rounded-lg`}
      onClick={onClick}
    >
      <div className="flex justify-center items-center">
        <img
          width={150}
          src={url}
          alt={name}
        />
      </div>
      <div className="p-4">
        <p className="text-center font-bold capitalize">{`#${number} ${name}`}</p>
      </div>
    </div>
  );
};

export const Cards = React.memo(Card);
