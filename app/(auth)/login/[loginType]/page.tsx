import React from "react";
import LoginForm from "../_components/LoginForm";

export type ILoginType = {
  params: Promise<{ loginType: string }>;
};
const page = async ({ params }: ILoginType) => {
  const loginType = (await params).loginType;
 

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
