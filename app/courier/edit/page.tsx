import CourierForm from "./_components/Form";
import { getCourier } from "@/services/courier";
import { cookies } from "next/headers";

export default async function EditPage() {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid")?.value;
  const courier = await getCourier(uuid as string);

  return (
    <div className="max-w-[1200px] mx-auto p-2">
      <div className="flex mx-auto justify-center">
        <div className="w-[1000px]">
          <h6>Edit Courier Information</h6>
          <CourierForm courier={courier} />
        </div>
      </div>
    </div>
  );
}
