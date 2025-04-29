"use client";
import { useState } from "react";

type GeoLocationInputProps = {
  onGeoLocationChange: (location: string) => void;
};

const GeoLocationInput = ({ onGeoLocationChange }: GeoLocationInputProps) => {
  const [coordinates, setCoordinates] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCoordinates = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const geoLocationString = `${latitude}, ${longitude}`;

          setCoordinates(geoLocationString);
          onGeoLocationChange(geoLocationString);
          try {
            const response = await fetch(
              `  https://api.maptiler.com/geocoding/reverse.json?lat=${latitude}&lon=${longitude}&key=l9gXBSMsOfVFUnvd7Hh6`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.features?.length > 0) {
              setCoordinates(`Coordinates: ${geoLocationString}`);
            } else {
              setCoordinates(`Coordinates: ${geoLocationString}`);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setError("Error fetching address. Try again later.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Error getting location. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Coordinates"
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          disabled={loading}
        />
      </div>

      <button
        onClick={handleGetCoordinates}
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Get Coordinates"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
export default GeoLocationInput;
