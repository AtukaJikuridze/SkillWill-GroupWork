import ClientSelector from "./_components/ClientSelector";
import { getUsers } from "@/services/users";
import { getCouriers } from "@/services/courier";

const AdminPage = async () => {
  const users = await getUsers();
  const couriers = await getCouriers();

  return <ClientSelector users={users} couriers={couriers} />;
};

export default AdminPage;
