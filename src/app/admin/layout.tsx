import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CalendarRange, Power, Users, Calendar } from "lucide-react";
import { Toaster } from "sonner";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative">
      <Toaster theme="dark" position="bottom-right" />
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-effect border-r-0 md:h-screen md:sticky top-0 z-40 p-6 flex flex-col">
        <Link href="/" className="flex items-center gap-2 mb-12 group w-fit">
           <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-xl">
             <CalendarRange className="text-white w-5 h-5" />
           </div>
           <span className="font-bold text-xl tracking-tight">Event<span className="text-gradient">Flow</span></span>
        </Link>
        
        <nav className="flex-1 space-y-2">
           <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
              <Calendar className="w-5 h-5" /> Events
           </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10">
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground truncate">{session.user?.email}</span>
              <LogoutButton />
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 relative z-10 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
