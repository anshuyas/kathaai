"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../utils/auth";

interface Props {
  children: React.ReactNode;
  roles: string[];
}

export default function AuthGuard({ children, roles }: Props) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.replace("/signin");
      return;
    }

    if (!roles.includes(user.role)) {
      router.replace("/");
      return;
    }

    setAllowed(true);
  }, [router, roles]);

  if (!allowed) return null;

  return <>{children}</>;
}