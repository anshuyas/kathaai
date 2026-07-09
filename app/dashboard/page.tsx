"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "teacher") {
      router.replace("/teacher/dashboard");
    } else {
      router.replace("/parent/dashboard");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Loading dashboard...
    </div>
  );
}