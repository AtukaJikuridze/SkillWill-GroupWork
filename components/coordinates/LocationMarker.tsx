"use client";
import React from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import useAuth from "@/store/useAuth";
import { Coordinates } from "@/interfaces/coordinates.interface";

interface LocationMarkerProps {
  position: Coordinates | null;
  setPosition: (coords: Coordinates) => void;
  setCoordinates: (coords: Coordinates) => void;
}

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker: React.FC<LocationMarkerProps> = ({
  position,
  setPosition,
  setCoordinates,
}) => {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const target = e.originalEvent.target as HTMLElement;
      if (target.closest("button")) return;
      const newPosition: Coordinates = {
        lat: e.latlng.lat.toString(),
        lng: e.latlng.lng.toString(),
      };

      setCoordinates(newPosition);
      setPosition(newPosition);
    },
  });

  return position ? (
    <Marker
      position={[Number(position.lat), Number(position.lng)]}
      icon={markerIcon}
    />
  ) : null;
};

export default LocationMarker;
