"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowRight, ShieldCheck, GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";

export default function OnboardingPage() {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Form State
  const [department, setDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("1");
  const [skills, setSkills] = useState("");
  const [designation, setDesignation] = useState("");
  const [securityPin, setSecurityPin] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.user_metadata?.is_onboarded) {
        router.push("/dashboard");
        return;
      }
      setUser(user);
      setRole(user.user_metadata?.role || "student");
      setIsLoading(false);
    };
    fetchUser();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      const profileData = {
        id: user.id,
        full_name: user.user_metadata?.full_name || "New User",
        role: role,
        department: department || null,
        year_of_study: role === "student" ? parseInt(yearOfStudy) : null,
        skills: role === "student" ? skills.split(",").map(s => s.trim()).filter(Boolean) : null,
        designation: role === "employee" ? designation : null,
        is_onboarded: true,
      };

      const { error: profileError } = await supabase.from("profiles").upsert(profileData);
      if (profileError) console.error("Profile insertion error:", profileError);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { is_onboarded: true }
      });
      if (updateError) throw updateError;

      toast.success("Profile completed successfully!");
      router.push(`/dashboard/${role}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to complete onboarding.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-[#273E57]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-slate-950 font-sora selection:bg-[#273E57] selection:text-white">
      
      {/* LEFT COLUMN - BRANDING (Dark Aesthetic) */}
      <div className="hidden md:flex flex-col justify-between w-1/3 max-w-md bg-[#273E57] text-white p-12 relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} 
        />
        {/* Soft Glow */}
        <div className="absolute top-[-10%] right-[-20%] w-[60%] h-[40%] rounded-full bg-blue-400/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-xl">
            <Image src="/logo.jpg" alt="Orbyt Logo" fill className="object-cover" />
          </div>
          <span className="text-2xl font-bold tracking-widest">ORBYT</span>
        </div>

        <div className="relative z-10 mt-20 flex-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight">
              Initialize Your <br/> Campus Profile.
            </h2>
            <p className="mt-6 text-[#94A3B8] leading-relaxed text-sm">
              You are setting up a <strong className="text-white capitalize">{role}</strong> account. ORBYT uses this information to personalize your campus experience, filter relevant opportunities, and connect you with the right departments.
            </p>
          </motion.div>

          <div className="mt-12 space-y-5">
            {[
              "Personalized academic insights",
              "Targeted club & opportunity matching",
              "Direct connection to campus safety"
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-3"
              >
                <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-300" />
                </div>
                <span className="text-sm text-slate-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-white/40 uppercase tracking-widest font-semibold">
          © 2026 ORBYT. The Intelligent Campus OS.
        </div>
      </div>

      {/* RIGHT COLUMN - FORM */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-20 relative bg-slate-50 dark:bg-slate-900">
        
        {/* Mobile Header */}
        <div className="md:hidden absolute top-6 left-6 flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-lg overflow-hidden shadow-md">
            <Image src="/logo.jpg" alt="Orbyt Logo" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#273E57] dark:text-white">ORBYT</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white dark:bg-slate-950 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 p-8 sm:p-10"
        >
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Complete Setup</h3>
            <p className="text-slate-500 text-sm mt-1">Please provide the details below to finish configuring your {role} profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {role === "student" && (
                <motion.div key="student" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-xs uppercase tracking-wider text-slate-500 font-bold">Department / Major</Label>
                    <Select value={department} onValueChange={(val) => setDepartment(val || "")} required>
                      <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200 focus:ring-[#273E57] rounded-xl transition-all">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-xs uppercase tracking-wider text-slate-500 font-bold">Year of Study</Label>
                    <Select value={yearOfStudy} onValueChange={(val) => setYearOfStudy(val || "")} required>
                      <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200 focus:ring-[#273E57] rounded-xl transition-all">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Year</SelectItem>
                        <SelectItem value="2">Second Year</SelectItem>
                        <SelectItem value="3">Third Year</SelectItem>
                        <SelectItem value="4">Fourth Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-xs uppercase tracking-wider text-slate-500 font-bold">Technical Skills</Label>
                    <Input 
                      id="skills" 
                      placeholder="e.g. Python, React, UI Design" 
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="h-12 bg-slate-50/50 border-slate-200 focus-visible:ring-[#273E57] rounded-xl transition-all"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Separate skills with commas to help ORBYT match you with opportunities.</p>
                  </div>
                </motion.div>
              )}

              {role === "employee" && (
                <motion.div key="employee" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-xs uppercase tracking-wider text-slate-500 font-bold">Department</Label>
                    <Select value={department} onValueChange={(val) => setDepartment(val || "")} required>
                      <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200 focus:ring-[#273E57] rounded-xl transition-all">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Administration">Administration</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation" className="text-xs uppercase tracking-wider text-slate-500 font-bold">Designation</Label>
                    <Input 
                      id="designation" 
                      placeholder="e.g. Associate Professor" 
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                      className="h-12 bg-slate-50/50 border-slate-200 focus-visible:ring-[#273E57] rounded-xl transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {role === "admin" && (
                <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="pin" className="text-xs uppercase tracking-wider text-slate-500 font-bold">Security PIN</Label>
                    <Input 
                      id="pin" 
                      type="password"
                      placeholder="Enter Admin Access PIN" 
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value)}
                      required
                      className="h-12 bg-slate-50/50 border-slate-200 focus-visible:ring-[#273E57] rounded-xl transition-all tracking-widest text-lg"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 bg-[#273E57] hover:bg-[#1a2939] text-white rounded-xl shadow-lg shadow-[#273E57]/20 font-bold tracking-wide transition-all group" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Continue to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
