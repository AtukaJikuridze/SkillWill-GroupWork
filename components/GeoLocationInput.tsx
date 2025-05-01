"use client";
import useApp from "@/store/useApp";
import useAuth from "@/store/useAuth";
import { useEffect, useState } from "react";

type GeoLocationInputProps = {
  onGeoLocationChange: (location: string) => void;
};

const GeoLocationInput = ({ onGeoLocationChange }: GeoLocationInputProps) => {
  // const [coordinates, setCoordinates] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setModal = useApp((state) => state.setModal);
  const coordinates = useAuth((state) => state.coordinates);
  const coordinatesValue =
    coordinates.lat && coordinates.lng
      ? `${coordinates.lat}, ${coordinates.lng} `
      : "";

  const handleGetCoordinates = () => {
    setModal("map");
  };

  useEffect(() => {
    if (coordinatesValue !== "") onGeoLocationChange(coordinatesValue);
  }, [coordinatesValue]);

  return (
    <div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Coordinates"
          value={coordinatesValue}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          disabled={loading}
        />
      </div>

      <button
        onClick={handleGetCoordinates}
        disabled={loading}
        className="cursor-pointer w-full py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Get Coordinates"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default GeoLocationInput;
