import React from "react";

interface ISelectInput {
  label: string;
  name: string;
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: string[];
}

export default function SelectInput({
  label,
  name,
  formData,
  handleChange,
  options = [],
}: ISelectInput) {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name] ? String(formData[name]) : ""}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
