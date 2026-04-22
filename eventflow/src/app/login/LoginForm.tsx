"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarRange } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-10">
        <div className="flex flex-col items-center mb-8">
           <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-xl">
                 <CalendarRange className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-foreground/90">
                 Event<span className="text-gradient">Flow</span>
              </span>
           </Link>
           <h1 className="text-3xl font-bold text-center">Admin Access</h1>
           <p className="text-muted-foreground mt-2 text-center">Enter your credentials to manage events</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="bg-background/50 border-white/10"
              placeholder="admin@eventflow.uz"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="bg-background/50 border-white/10"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 rounded-xl py-6 font-semibold shadow-lg shadow-primary/20">
            {isLoading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
