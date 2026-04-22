import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleCheckIn(formData: FormData) {
  "use server";
  
  const registrationId = formData.get("registrationId") as string;
  const eventId = formData.get("eventId") as string;
  const currentStatus = formData.get("currentStatus") === "true";

  await prisma.registration.update({
    where: { id: registrationId },
    data: { isCheckedIn: !currentStatus }
  });

  revalidatePath(`/admin/events/${eventId}/guests`);
}
