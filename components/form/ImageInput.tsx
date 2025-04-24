import React from "react";

interface IImageInput {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageInput({ handleFileChange }: IImageInput) {
  return (
    <label className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm transition-colors duration-200">
      Upload Image
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}
