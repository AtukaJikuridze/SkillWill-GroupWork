import React, { useState } from "react";
import axios from "axios";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import SelectInput from "./SelectInput";
import {
  loadingNotification,
  onResponseReturned,
} from "@/utils/notifications";
import WorkingDaysInput from "./WorkingDaysInput";
import { ICourier } from "@/interfaces/courier.interface";

const CLOUDINARY_UPLOAD_URL = process.env
  .NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string;
const CLOUDINARY_UPLOAD_PRESET = process.env
  .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;

export interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "file" | "select";
  options?: string[];
  required?: boolean;
}

interface IBaseForm {
  fields: Field[];
  onSubmit: (formData: Record<string, string | number | File>) => void;
  defaultValues: Record<string, string | number | File>;
  className?: string;
  courier?: ICourier;
  handleWorkingDaysUpdate?: (updatedCourier: ICourier) => void;
  canSubmit?: boolean;
}

export default function BaseForm({
  fields,
  onSubmit,
  defaultValues,
  className,
  courier,
  handleWorkingDaysUpdate,
  canSubmit,
}: IBaseForm) {
  const [formData, setFormData] = useState<
    Record<string, string | number | File>
  >(defaultValues || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (canSubmit === true) return;
    const newErrors: Record<string, string> = {};

    fields.forEach(({ name, required }) => {
      if (required && !formData[name]) {
        newErrors[name] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const loadingToastId = loadingNotification();

    try {
      const finalData = { ...formData };

      if (formData.profileImage instanceof File) {
        const uploadData = new FormData();
        uploadData.append("file", formData.profileImage);
        uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        uploadData.append("api_key", CLOUDINARY_API_KEY);

        console.log("Cloudinary Upload URL:", CLOUDINARY_UPLOAD_URL);
        console.log("Upload Preset:", CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(CLOUDINARY_UPLOAD_URL, uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Cloudinary Response:", response.data);
        if (response.data.secure_url) {
          finalData.profileImage = response.data.secure_url;
        } else {
          throw new Error("Cloudinary did not return a valid image URL.");
        }
      }
      onSubmit(finalData);
      setFormData({});
      setErrors({});
      onResponseReturned(loadingToastId, () => {}, null);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`mx-auto p-2 ${className}`} onSubmit={handleSubmit}>
      <div className="flex mx-auto gap-4">
        <div className="w-[600px]">
          {fields.map(({ name, label, type, options }) => (
            <div className="mb-2" key={name}>
              {type === "select" ? (
                <SelectInput
                  label={label}
                  name={name}
                  formData={formData}
                  handleChange={handleChange}
                  options={options}
                />
              ) : type === "file" ? (
                <ImageInput handleFileChange={handleFileChange} />
              ) : type === "password" ? (
                <PasswordInput
                  label={label}
                  name={name}
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              ) : (
                <TextInput
                  label={label}
                  name={name}
                  type="text"
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              )}
            </div>
          ))}
        </div>

        {courier && handleWorkingDaysUpdate && (
          <WorkingDaysInput
            courier={courier}
            handleWorkingDaysUpdate={handleWorkingDaysUpdate}
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`cursor-pointer w-full px-4 py-2 rounded-md text-white font-semibold focus:outline-none transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
