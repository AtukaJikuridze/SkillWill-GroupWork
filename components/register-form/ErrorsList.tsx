import React from "react";
import { v4 as uuidv4 } from "uuid";

interface IErrorList {
  errors: string[];
  name: string;
}
export default function ErrorsList({ name, errors }: IErrorList) {
  return (
    <ul>
      <p className="text-[#580000] capitalize">{name} Must :</p>
      {errors.map((e) => (
        <li className="text-red-500 list-disc ml-10" key={uuidv4()}>
          {e}
        </li>
      ))}
    </ul>
  );
}
