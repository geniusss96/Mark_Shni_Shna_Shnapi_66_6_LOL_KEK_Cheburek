import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createEvent(formData: FormData) {
  "use server";
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const isPublic = formData.get("isPublic") === "on";

  await prisma.event.create({
    data: {
      title,
      description,
      date: new Date(date),
      location,
      imageUrl: imageUrl || null,
      isPublic,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
