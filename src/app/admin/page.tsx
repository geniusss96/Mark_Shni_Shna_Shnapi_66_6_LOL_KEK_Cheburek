import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { registrations: true } } }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <p className="text-muted-foreground mt-1">Create and manage your upcoming events.</p>
        </div>
        <Link href="/admin/events/new" prefetch={false}>
          <Button className="bg-primary hover:bg-primary/90 rounded-xl px-6 font-medium shadow-md">
            <Plus className="w-5 h-5 mr-2" /> New Event
          </Button>
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-black/5 dark:bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Event Name</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Registrations</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{event.title}</td>
                  <td className="px-6 py-4">{format(new Date(event.date), "MMM d, yyyy")}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${event.isPublic ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {event.isPublic ? "Public" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 bg-primary/5 font-semibold text-primary">
                    <div className="flex items-center gap-2">
                       <Users className="w-4 h-4" /> {event._count.registrations}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/events/${event.id}/guests`} className="text-sm text-primary hover:underline font-medium">
                        Guests
                      </Link>
                      <Link href={`/admin/events/${event.id}/edit`} className="text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No events found. Click "New Event" to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
