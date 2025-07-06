import React, { useState, useRef } from 'react';

const PropertyCard = ({ property }) => {
  const [zoomed, setZoomed] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setZoomed(true);
    }, 5000); // 5 секунд
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setZoomed(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-rich-black bg-opacity-40 p-4 rounded-xl transition duration-300 ${
        zoomed ? 'animate-expand-full z-50' : 'z-10'
      }`}
    >
      <img
        src={property.image}
        alt={property.summary}
        className="rounded-lg w-full h-auto"
      />
      <div className="text-emerald-400 font-semibold mt-2">{property.price}</div>
      <div className="text-gold-muted">{property.location}</div>
      <div className="text-white mt-1">{property.summary}</div>
      <ul className="text-sm text-white list-disc list-inside mt-2">
        {property.features.map((feat, i) => (
          <li key={i}>{feat}</li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyCard;
