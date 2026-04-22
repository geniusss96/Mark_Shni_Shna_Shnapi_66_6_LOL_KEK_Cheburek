"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  contact: z.string().min(3, "Please enter your phone or Telegram so we can contact you"),
});

type FormData = z.infer<typeof schema>;

export default function RegistrationForm({ eventId }: { eventId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventId }),
      });
      const result = await res.json();
      
      if (res.ok) {
        setIsSuccess(true);
        toast.success("Successfully registered!");
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-card p-8 text-center bg-primary/5">
        <h3 className="text-2xl font-bold text-gradient mb-2">You're in!</h3>
        <p className="text-muted-foreground">We've saved a spot for you. We will contact you soon with more details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 glass-card p-8">
      <h3 className="text-2xl font-semibold mb-4">Register for this Event</h3>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Full Name</label>
        <Input placeholder="John Doe" {...register("name")} className="bg-background/50 border-white/10" />
        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Email Address</label>
        <Input placeholder="john@example.com" type="email" {...register("email")} className="bg-background/50 border-white/10" />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Telegram or Phone</label>
        <Input placeholder="@johndoe or +998901234567" {...register("contact")} className="bg-background/50 border-white/10" />
        {errors.contact && <p className="text-destructive text-sm mt-1">{errors.contact.message}</p>}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-semibold shadow-lg shadow-primary/20">
        {isLoading ? "Registering..." : "Confirm Registration"}
      </Button>
    </form>
  );
}
