import React from "react";
interface IErrorList {
  errors: string[];
}
export default function ErrorsList({ errors }: IErrorList) {
  return (
    <ul>
      <p className="text-[#580000]">Password Must :</p>
      {errors.map((e) => (
        <li className="text-red-500 list-disc ml-10">{e}</li>
      ))}
    </ul>
  );
}
