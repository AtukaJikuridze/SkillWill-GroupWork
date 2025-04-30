import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUser } from "@/services/admin";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid")?.value;

  if (!uuid) {
    redirect("/login");
  }

  const user = await getUser(uuid);

  switch (user.role) {
    case "admin":
      redirect("/admin");
    case "courier":
      redirect("/courier");
    case "user":
      redirect("/user");
    default:
      redirect("/login");
  }
}
