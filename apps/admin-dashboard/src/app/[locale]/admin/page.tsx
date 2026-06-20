"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/products");
  }, [router]);

  return null;
}
