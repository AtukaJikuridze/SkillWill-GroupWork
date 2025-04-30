import { getRandomUsers } from "@/services/admin";
import { ICourier, IUser } from "@/interfaces/user.interface";
import ClientSelector from "./_components/ClientSelector";

const AdminPage = async () => {
  const randomUsers = await getRandomUsers();

  const users = randomUsers.filter(
    (allUsers) => allUsers.role === "user"
  ) as IUser[];
  const couriers = randomUsers.filter(
    (allUsers) => allUsers.role === "courier"
  ) as ICourier[];

  return <ClientSelector users={users} couriers={couriers} />;
};

export default AdminPage;
