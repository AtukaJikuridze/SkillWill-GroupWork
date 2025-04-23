import React from "react";

const SubmitButton = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 py-2 rounded-md cursor-pointer 
                 flex justify-center items-center text-white transition-all 
                 duration-300 hover:bg-blue-400"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
