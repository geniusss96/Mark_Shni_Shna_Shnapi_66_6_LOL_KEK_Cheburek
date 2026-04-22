import Link from 'next/link';
import { CalendarRange } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b-0 hidden md:block">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-xl group-hover:scale-105 transition-transform">
            <CalendarRange className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground/90">
            Event<span className="text-gradient">Flow</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" className="rounded-full px-6 hover:bg-black/5 dark:hover:bg-white/10 transition-all font-medium">
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
