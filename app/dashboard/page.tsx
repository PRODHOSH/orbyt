"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

export default function DashboardIndex() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const routeUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      if (!user.user_metadata?.is_onboarded) {
        router.push("/onboarding");
        return;
      }

      const role = user.user_metadata?.role || "student";
      router.push(`/dashboard/${role}`);
    };

    routeUser();
  }, [router, supabase]);

  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#273E57]" />
        <p className="text-sm text-slate-500 font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );
}
