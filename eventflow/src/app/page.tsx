import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const events = await prisma.event.findMany({
    where: { isPublic: true },
    orderBy: { date: "asc" },
  });

  return (
    <div className="container mx-auto px-4">
      <section className="text-center py-20 lg:py-32 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Experience Events <br className="hidden md:block" />
          <span className="text-gradient">Like Never Before</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
          Discover hand-picked curated events, join exclusive sessions, and manage your attendance seamlessly with EventFlow.
        </p>
        <Link 
          href="#events" 
          className="bg-primary/90 hover:bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 flex items-center gap-2"
        >
          Explore Events <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <section id="events" className="py-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 glass-card">
            <p className="text-muted-foreground text-lg">No public events are scheduled right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id} className="group outline-none">
                <article className="glass-card h-full flex flex-col relative overflow-hidden group-focus-visible:ring-4 ring-primary rounded-3xl">
                  {/* Image Placeholder or Actual Image */}
                  <div className="w-full h-56 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    {event.imageUrl ? (
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 glass-effect px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      {format(new Date(event.date), "MMM d, yyyy")}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-2 flex-1">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 mt-auto bg-black/5 dark:bg-white/5 w-fit px-3 py-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-primary" />
                      {event.location}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
