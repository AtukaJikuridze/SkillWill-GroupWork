// components/UserRegisterForm.tsx
import ErrorsList from "@/components/register-form/ErrorsList";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";
import React from "react";

interface UserRegisterFormProps {
  inputFields: InputFieldsProps[];
  action: any;
}

const UserRegisterForm: React.FC<UserRegisterFormProps> = ({
  inputFields,
  action,
}) => {
  return (
    <form action={action} className="space-y-4">
      {inputFields.map(
        (
          {
            name,
            enterTitle,
            type,
            autoComplete,
            defaultValue,
            errors,
            file,
            filePicture,
            isReadOnly,
            min,
            onChange,
            onClick,
            placeholder,
            value,
          },
          index
        ) => {
          const className = `border px-3 py-2 rounded-md outline-none ${
            errors && "border-red-500"
          }
              ${
                onClick
                  ? "cursor-pointer transition-all hover:bg-blue-100 "
                  : ""
              }`;

          return (
            <div className="flex flex-col gap-2 mb-2" key={name + index}>
              <label htmlFor="repeat-password" className="text-lg">
                {enterTitle}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                name={name}
                className={className}
                min={min}
                onClick={onClick}
                onChange={onChange}
                value={value}
                autoComplete={autoComplete}
                readOnly={isReadOnly}
              />
              {file && filePicture && (
                <div className="flex h-20 gap-5">
                  <p>{file.name}</p>
                  <img
                    src={filePicture}
                    alt={file.name}
                    className="w-[100px] object-cover h-[80px]"
                  />
                </div>
              )}

              {errors && <ErrorsList name={name} errors={errors} />}
            </div>
          );
        }
      )}

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer"
        >
          {"Submit"}
        </button>
      </div>
    </form>
  );
};

export default UserRegisterForm;
