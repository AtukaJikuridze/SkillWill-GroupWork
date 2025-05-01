import { ICourier, IRandomUser, IUser } from "@/interfaces/user.interface";
import { getRandomUsers, getUser } from "@/services/admin";
import { cookies } from "next/headers";
import PageSelector from "./_components/PageSelector";
import { getCouriers } from "@/services/courier";

const UserPage = async () => {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid")?.value;

  const couriers = await getCouriers();
  const user = await getUser(uuid as string);

  return <PageSelector couriers={couriers} user={user as IUser} />;
};

export default UserPage;
