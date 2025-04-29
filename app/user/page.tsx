import { ICourier, IRandomUser, IUser } from "@/interfaces/user.interface";
import { getRandomUsers, getUser } from "@/services/admin";
import { cookies } from "next/headers";
import PageSelector from "./_components/PageSelector";

const UserPage = async () => {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid")?.value;

  const userList = await getRandomUsers();
  const user = await getUser(uuid as string);

  const couriers = userList.filter(
    (allUsers: IRandomUser) => allUsers.role === "courier"
  ) as ICourier[];

  return <PageSelector couriers={couriers} user={user as IUser} />;
};

export default UserPage;
