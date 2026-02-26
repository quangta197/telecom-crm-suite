import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Upload, Trash2, FileText, Image, File, Download } from "lucide-react";

interface Attachment {
  id: number;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  date: string;
}

const initialAttachments: Attachment[] = [
  {
    id: 1,
    name: "Product_Brochure_2024.pdf",
    size: "2.4 MB",
    type: "pdf",
    uploadedBy: "John Smith",
    date: "01/15/2024",
  },
  {
    id: 2,
    name: "Meeting_Notes.docx",
    size: "156 KB",
    type: "doc",
    uploadedBy: "John Smith",
    date: "01/13/2024",
  },
  {
    id: 3,
    name: "Network_Diagram.png",
    size: "1.1 MB",
    type: "image",
    uploadedBy: "John Smith",
    date: "01/12/2024",
  },
];

const fileIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  doc: FileText,
  image: Image,
};

const fileColors: Record<string, string> = {
  pdf: "bg-destructive/10 text-destructive",
  doc: "bg-primary/10 text-primary",
  image: "bg-emerald-500/10 text-emerald-600",
};

export const LeadAttachments = () => {
  const [attachments, setAttachments] = useState<Attachment[]>(initialAttachments);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileType = (fileName: string): string => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    if (["pdf"].includes(ext)) return "pdf";
    if (["doc", "docx", "txt", "xlsx", "csv"].includes(ext)) return "doc";
    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "image";
    return "doc";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileType(file.name),
      uploadedBy: "John Smith",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }),
    }));

    setAttachments([...newAttachments, ...attachments]);
    e.target.value = "";
  };

  const handleDelete = (id: number) => {
    setAttachments(attachments.filter(a => a.id !== id));
  };

  return (
    <Card className="p-6">
      {/* Upload Area */}
      <div
        className="border-2 border-dashed rounded-lg p-6 text-center mb-6 hover:border-primary/50 hover:bg-muted/30 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-8 w-8 mx-auto text-muted-foreground/60 mb-2" />
        <p className="text-sm font-medium">Click to upload or drag and drop</p>
        <p className="text-xs text-muted-foreground mt-1">PDF, DOC, Images up to 20MB</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Attachments List */}
      {attachments.length === 0 ? (
        <div className="text-center py-8">
          <Paperclip className="h-10 w-10 mx-auto text-muted-foreground/40 mb-2" />
          <p className="text-muted-foreground">No attachments yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {attachments.map(attachment => {
            const IconComp = fileIcons[attachment.type] || File;
            const colorClass = fileColors[attachment.type] || "bg-muted text-muted-foreground";

            return (
              <div
                key={attachment.id}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors group"
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <IconComp className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{attachment.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{attachment.size}</span>
                    <span>•</span>
                    <span>{attachment.uploadedBy}</span>
                    <span>•</span>
                    <span>{attachment.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDelete(attachment.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
