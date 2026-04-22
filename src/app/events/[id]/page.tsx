import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import RegistrationForm from "./RegistrationForm";
import { format } from "date-fns";
import { MapPin, Calendar, Users, Share2 } from "lucide-react";

export const revalidate = 60;

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
  });

  if (!event) return notFound();

  return (
    <div className="container mx-auto px-4 pt-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl overflow-hidden glass-effect aspect-video relative flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
               {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
               ) : (
                  <Calendar className="w-20 h-20 text-muted-foreground/30" />
               )}
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{event.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-secondary/80 px-4 py-2 rounded-full text-secondary-foreground font-medium text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  {format(new Date(event.date), "EEEE, MMMM d, yyyy - h:mm a")}
                </div>
                <div className="flex items-center gap-2 bg-secondary/80 px-4 py-2 rounded-full text-secondary-foreground font-medium text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  {event.location}
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-lg">
                {event.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RegistrationForm eventId={event.id} />
              
              <div className="mt-6 flex justify-center">
                 <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium">
                    <Share2 className="w-4 h-4" /> Share Event
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
