"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, Pin, Clock, Plus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getAnnouncements, createAnnouncement } from "@/lib/supabase-queries";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("student");
  const [userId, setUserId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetRole, setTargetRole] = useState("all");

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const r = user.user_metadata?.role || "student";
      setRole(r);
      setUserId(user.id);
      const { data } = await getAnnouncements(r);
      setAnnouncements(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    const { error } = await createAnnouncement({ title, content, author_id: userId, target_role: targetRole });
    if (error) { toast.error("Failed to create announcement"); return; }
    toast.success("Announcement published");
    setOpen(false);
    setTitle(""); setContent("");
    const { data } = await getAnnouncements(role);
    setAnnouncements(data);
  };

  const priorityColor: Record<string, string> = {
    urgent: "bg-red-100 text-red-700 border-red-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    normal: "bg-blue-100 text-blue-700 border-blue-200",
    low: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sora tracking-tight">Announcements</h1>
          <p className="text-muted-foreground text-sm mt-1">Campus-wide updates and notices.</p>
        </div>
        {(role === "employee" || role === "admin") && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="bg-[#273E57] hover:bg-[#1a2939]" />}>
              <Plus className="h-4 w-4 mr-2" />New Announcement
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Announcement</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea placeholder="Content..." value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
                <Select value={targetRole} onValueChange={(val) => setTargetRole(val || "all")}>
                  <SelectTrigger><SelectValue placeholder="Audience" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Everyone</SelectItem>
                    <SelectItem value="student">Students Only</SelectItem>
                    <SelectItem value="employee">Employees Only</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleCreate} className="w-full bg-[#273E57]">Publish</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading announcements...</div>
      ) : announcements.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-muted-foreground">No announcements yet.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {a.is_pinned && <Pin className="h-3.5 w-3.5 text-amber-500" />}
                        <h3 className="font-semibold text-sm">{a.title}</h3>
                        <Badge variant="outline" className={`text-[10px] ${priorityColor[a.priority] || priorityColor.normal}`}>{a.priority}</Badge>
                      </div>
                      {a.content && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.content}</p>}
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                        <span>{a.author?.full_name || "Admin"}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{timeAgo(a.created_at)}</span>
                        {a.target_role !== "all" && <Badge variant="outline" className="text-[10px]">{a.target_role}</Badge>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
