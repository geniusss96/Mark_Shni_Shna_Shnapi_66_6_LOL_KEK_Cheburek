import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Download, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleCheckIn } from "./actions";

export default async function EventGuestsPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      registrations: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!event) return notFound();

  // Simple CSV generation logic for client side download via data URI
  const csvHeaders = "Name,Email,Contact,Checked In,Registered At\n";
  const csvRows = event.registrations.map(r => 
    `"${r.name}","${r.email}","${r.contact}",${r.isCheckedIn},"${r.createdAt.toISOString()}"`
  ).join("\n");
  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvHeaders + csvRows);

  return (
    <div className="space-y-8">
      <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold mb-1">Guests list</h1>
           <p className="text-muted-foreground">{event.title} — {event.registrations.length} registered</p>
        </div>
        <a href={csvContent} download={`${event.title.replace(/\s+/g, '_')}_guests.csv`}>
           <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 w-full md:w-auto">
             <Download className="w-4 h-4 mr-2" /> Export CSV
           </Button>
        </a>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-black/5 dark:bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Guest</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Registration Date</th>
                <th className="px-6 py-4 font-semibold text-right">Status / Actions</th>
              </tr>
            </thead>
            <tbody>
              {event.registrations.map((guest) => (
                <tr key={guest.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                     <p className="font-semibold text-base">{guest.name}</p>
                     <p className="text-muted-foreground">{guest.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{guest.contact}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(guest.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                     <form action={toggleCheckIn}>
                        <input type="hidden" name="registrationId" value={guest.id} />
                        <input type="hidden" name="eventId" value={event.id} />
                        <input type="hidden" name="currentStatus" value={guest.isCheckedIn ? "true" : "false"} />
                        <button type="submit" className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${guest.isCheckedIn ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}>
                           {guest.isCheckedIn ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                           {guest.isCheckedIn ? "Checked In" : "Check In"}
                        </button>
                     </form>
                  </td>
                </tr>
              ))}
              {event.registrations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                    No guests have registered yet.
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
