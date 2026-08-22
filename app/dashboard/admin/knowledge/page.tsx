"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, Database, CheckCircle2, RefreshCw, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function KnowledgeBasePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState([
    { id: 1, name: "Academic_Regulations_2026.pdf", type: "PDF", size: "2.4 MB", status: "indexed", date: "2 hours ago" },
    { id: 2, name: "Hostel_Rules_Guidelines.pdf", type: "PDF", size: "1.1 MB", status: "indexed", date: "Yesterday" },
    { id: 3, name: "Club_Recruitment_Policies.docx", type: "Word", size: "450 KB", status: "indexed", date: "Last week" },
  ]);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const file = e.target.files[0];
      
      setTimeout(() => {
        setDocuments(prev => [{
          id: Date.now(),
          name: file.name,
          type: file.type.includes('pdf') ? 'PDF' : 'Document',
          size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
          status: 'indexing',
          date: 'Just now'
        }, ...prev]);
        setIsUploading(false);
        
        // Simulate indexing completion
        setTimeout(() => {
          setDocuments(prev => prev.map(d => d.name === file.name ? { ...d, status: 'indexed' } : d));
        }, 3000);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-sora text-slate-900 dark:text-white tracking-tight">AI Knowledge Base</h1>
        <p className="text-muted-foreground mt-1">Manage the documents and data that power ORBYT's intelligence layer.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Zone */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Source</CardTitle>
              <CardDescription>Upload PDFs, CSVs, or link internal DBs.</CardDescription>
            </CardHeader>
            <CardContent>
              <label 
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isUploading ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isUploading ? (
                    <RefreshCw className="w-10 h-10 text-blue-500 animate-spin mb-3" />
                  ) : (
                    <UploadCloud className="w-10 h-10 text-slate-400 mb-3" />
                  )}
                  <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">{isUploading ? 'Uploading & Vectorizing...' : 'Click to upload'}</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-400">PDF, DOCX, CSV (MAX. 10MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.docx,.csv" 
                  onChange={handleSimulatedUpload}
                  disabled={isUploading}
                />
              </label>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Auto-Sync Sync</span>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                ORBYT automatically syncs with ERP tables daily.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Indexed Documents */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Indexed Documents</span>
                <Badge className="bg-[#273E57]">1.2 GB Total</Badge>
              </CardTitle>
              <CardDescription>These documents are currently available for RAG (Retrieval-Augmented Generation).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc, i) => (
                  <motion.div 
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl border bg-white dark:bg-slate-950 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{doc.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span>{doc.size}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {doc.status === 'indexed' ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                          <CheckCircle2 className="h-4 w-4" /> Indexed
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600 text-xs font-medium">
                          <RefreshCw className="h-4 w-4 animate-spin" /> Indexing...
                        </div>
                      )}
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
