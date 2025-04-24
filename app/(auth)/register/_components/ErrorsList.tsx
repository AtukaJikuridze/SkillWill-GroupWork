import React from "react";
import { v4 as uuidv4 } from "uuid";

interface IErrorList {
  errors: string[];
}

export default function ErrorsList({ errors }: IErrorList) {
  return (
    <ul>
      <p className="text-[#580000]">Password Must:</p>
      {errors.map((error) => (
        <li className="text-red-500 list-disc ml-10" key={uuidv4()}>
          {error}
        </li>
      ))}
    </ul>
  );
}
