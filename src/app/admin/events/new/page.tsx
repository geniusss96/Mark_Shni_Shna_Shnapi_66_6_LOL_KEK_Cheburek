import { createEvent } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewEventPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
      
      <form action={createEvent} className="space-y-6 glass-card p-8">
        <div>
          <label className="text-sm font-medium mb-1 block">Event Title</label>
          <Input name="title" required className="bg-background/50 border-white/10" placeholder="e.g. Next.js Conf 2026" />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <textarea 
            name="description" 
            required 
            rows={4}
            className="w-full rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
            placeholder="Event details..." 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="text-sm font-medium mb-1 block">Date & Time</label>
             <Input name="date" type="datetime-local" required className="bg-background/50 border-white/10" />
           </div>
           <div>
             <label className="text-sm font-medium mb-1 block">Location</label>
             <Input name="location" required className="bg-background/50 border-white/10" placeholder="Tashkent, UzExpo" />
           </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Cover Image URL (Optional)</label>
          <Input name="imageUrl" type="url" className="bg-background/50 border-white/10" placeholder="https://example.com/image.jpg" />
        </div>
        
        <div className="flex items-center gap-2 py-2">
          <input type="checkbox" name="isPublic" id="isPublic" defaultChecked className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
          <label htmlFor="isPublic" className="text-sm font-medium cursor-pointer">Publish immediately</label>
        </div>
        
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold shadow-lg shadow-primary/20">
          Create Event
        </Button>
      </form>
    </div>
  );
}
