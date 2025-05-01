import BaseForm from "@/components/form/BaseForm";
import { getUser } from "@/services/users";
import { cookies } from "next/headers";
import AdminForm from "./_components/Form";

export default async function EditPage() {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid")?.value;
  const admin = await getUser(uuid as string);

  return (
    <div className="max-w-[1200px] mx-auto p-2">
      <div className="flex mx-auto justify-center">
        <div className="w-[1000px] flex flex-col items-center justify-center">
          <h6>Edit Admin Information</h6>
          <AdminForm admin={admin} />
        </div>
      </div>
    </div>
  );
}
