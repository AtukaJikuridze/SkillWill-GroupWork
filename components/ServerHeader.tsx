import { cookies } from "next/headers";
import { getUser } from "@/services/admin";
import Header from "@/components/Header";
import { IRandomUser } from "@/interfaces/user.interface";

export default async function ServerHeader() {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid")?.value;
  const user = uuid ? await getUser(uuid) : ({} as IRandomUser);

  return <Header user={user} />;
}
