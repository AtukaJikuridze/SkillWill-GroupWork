import { redirect } from "next/navigation";

const page = () => {
  redirect("/login/user");
};

export default page;
