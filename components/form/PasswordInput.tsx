import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface IPasswordInput {
  label: string;
  name: string;
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

export default function PasswordInput({
  label,
  name,
  formData,
  handleChange,
  errors,
}: IPasswordInput) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={formData[name] || ""}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={handleClickShowPassword}
          className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );
}
