"use client";

import { signOut } from "next-auth/react";
import { Power } from "lucide-react";

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className="p-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-lg transition-colors" title="Logout">
      <Power className="w-5 h-5" />
    </button>
  );
}
