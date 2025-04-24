import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import LocationMarker from "./LocationMarker";
import type { Coordinates } from "@/interfaces/coordinates.interface";
import LocateButton from "./LocateButton";
import useApp from "@/store/useApp";

const ResizeMap = ({ active }: { active: boolean }) => {
  const map = useMap();

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        map.invalidateSize();
      }, 300); // wait for CSS transition to finish
    }
  }, [active]);

  return null;
};

const Coordinates: React.FC = () => {
  const { modal } = useApp();
  const [position, setPosition] = useState<Coordinates | null>(null);
  const center: LatLngExpression = [41.7151, 44.8271];
  const isActive = modal === "map";

  return (
    <div
      className={`absolute w-full h-full bg-var-black-transparent inset-0 flex justify-center items-center
      transition-opacity duration-300 ease-in-out
      ${
        isActive
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <MapContainer
        center={center}
        zoom={13}
        className="w-[80%] h-[70%] rounded-md shadow-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={position} setPosition={setPosition} />
        <LocateButton onLocate={setPosition} />
        <ResizeMap active={isActive} />
      </MapContainer>
    </div>
  );
};

export default Coordinates;
