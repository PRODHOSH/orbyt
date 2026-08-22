import { createClient } from "@/utils/supabase/server";
import { SidebarClient } from "./sidebar-client";

export async function Sidebar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = {
    full_name: "Unknown User",
    role: "student",
    avatar_url: "",
    position: "",
    is_elevated: false,
  };

  if (user) {
    const { data: dbProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (dbProfile) {
      profile = {
        full_name: dbProfile.full_name || user.user_metadata?.full_name || "Unknown User",
        role: (dbProfile.role || user.user_metadata?.role || "student").toLowerCase(),
        avatar_url: dbProfile.avatar_url || "",
        position: dbProfile.department ? `${dbProfile.department} - Year ${dbProfile.year_of_study}` : "",
        is_elevated: dbProfile.role === "admin",
      };
    } else {
      profile.role = (user.user_metadata?.role || "student").toLowerCase();
      profile.full_name = user.user_metadata?.full_name || "Unknown User";
    }
  }

  const initials = profile.full_name ? profile.full_name.substring(0, 1).toUpperCase() : "U";

  return <SidebarClient profile={profile} email={user?.email} initials={initials} />;
}
