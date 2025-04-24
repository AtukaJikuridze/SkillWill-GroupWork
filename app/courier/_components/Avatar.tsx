import React from "react";

interface IAvatar {
  name: string;
  imageUrl?: string;
  size?: number;
}

export default function Avatar({ name, imageUrl, size = 40 }: IAvatar) {
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    return names
      .map((n) => n[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size / 2.5}px`,
  };

  return (
    <div
      className="flex items-center justify-center rounded-full bg-blue-600 text-white font-bold overflow-hidden uppercase"
      style={style}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
