"use client"
import { Coordinates } from "@/interfaces/coordinates.interface";
import useApp from "@/store/useApp";
import React, { MouseEventHandler } from "react";
import { useMap } from "react-leaflet";
interface LocateButtonProps {
  onLocate: (coords: Coordinates) => void;
}
const LocateButton: React.FC<LocateButtonProps> = ({ onLocate }) => {
  const { setModal } = useApp();

  const saveChanges: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setModal(null);
  };
  const map = useMap();

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: Coordinates = {
          lat: String(pos.coords.latitude),
          lng: String(pos.coords.longitude),
        };

        onLocate(coords);
        map.setView([pos.coords.latitude, pos.coords.longitude], 13);
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  };

  return (
    <div
      className="absolute top-4 right-4 z-[1000] flex gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleClick}
        className="bg-white text-black px-4 py-2 rounded shadow cursor-pointer"
      >
        Show My Location
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow cursor-pointer"
        onClick={saveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};

export default LocateButton;
