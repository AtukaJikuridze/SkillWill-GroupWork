import ClientSelector from "./_components/ClientSelector";
import { getUser, getUsers } from "@/services/users";
import { getCouriers } from "@/services/courier";
import { cookies } from "next/headers";

const AdminPage = async () => {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid")?.value;
  const users = await getUsers();
  const couriers = await getCouriers();
  const admin = await getUser(uuid as string);

  return <ClientSelector users={users} couriers={couriers} admin={admin} />;
};

export default AdminPage;
