"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTokens } from "@/app/lib/api/auth";

export function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const { access } = getTokens();
    if (!access) {
      router.push("/login");
      return;
    }
    setToken(access);
  }, [router]);

  return token;
}
