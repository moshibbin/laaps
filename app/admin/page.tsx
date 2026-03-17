"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");

    if (isAuthenticated === "true") {
      // Redirect to dashboard if authenticated
      router.push("/admin/dashboard");
    } else {
      // Redirect to login if not authenticated
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a472a] to-[#2d5a3d] flex items-center justify-center">
      <div className="text-center text-white">
        <div className="inline-block w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Redirecting...</p>
      </div>
    </div>
  );
}
