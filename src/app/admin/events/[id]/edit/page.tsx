import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) return notFound();

  async function updateEvent(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const isPublic = formData.get("isPublic") === "on";

    await prisma.event.update({
      where: { id: params.id },
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

  // Format date for datetime-local input
  // Convert JS Date to YYYY-MM-DDTHH:mm
  const dateISO = event.date.toISOString();
  const dateValue = dateISO.substring(0, 16);

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Edit Event</h1>
      
      <form action={updateEvent} className="space-y-6 glass-card p-8">
        <div>
          <label className="text-sm font-medium mb-1 block">Event Title</label>
          <Input name="title" required defaultValue={event.title} className="bg-background/50 border-white/10" />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <textarea 
            name="description" 
            required 
            rows={4}
            defaultValue={event.description}
            className="w-full rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="text-sm font-medium mb-1 block">Date & Time</label>
             <Input name="date" type="datetime-local" defaultValue={dateValue} required className="bg-background/50 border-white/10" />
           </div>
           <div>
             <label className="text-sm font-medium mb-1 block">Location</label>
             <Input name="location" required defaultValue={event.location} className="bg-background/50 border-white/10" />
           </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Cover Image URL</label>
          <Input name="imageUrl" type="url" defaultValue={event.imageUrl || ""} className="bg-background/50 border-white/10" />
        </div>
        
        <div className="flex items-center gap-2 py-2">
          <input type="checkbox" name="isPublic" id="isPublic" defaultChecked={event.isPublic} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
          <label htmlFor="isPublic" className="text-sm font-medium cursor-pointer">Publish</label>
        </div>
        
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold shadow-lg shadow-primary/20">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
