import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Trash2, Pencil, Check, X } from "lucide-react";

interface Note {
  id: number;
  content: string;
  author: string;
  date: string;
  source?: "lead" | "opportunity";
}

const leadNotes: Note[] = [
  {
    id: 101,
    content: "Very interested in cloud migration. Decision maker with budget authority.",
    author: "John Smith",
    date: "01/15/2024 10:30",
    source: "lead",
  },
  {
    id: 102,
    content: "Follow up scheduled for next week to discuss pricing details.",
    author: "John Smith",
    date: "01/13/2024 14:15",
    source: "lead",
  },
];

const opportunityNotes: Note[] = [
  {
    id: 201,
    content: "Customer confirmed budget allocation for Q2. Proceeding with proposal preparation.",
    author: "Nguyen Bao Ngoc",
    date: "06/01/2024 09:00",
    source: "opportunity",
  },
  {
    id: 202,
    content: "Demo session completed successfully. Client requested revised pricing for 3-year contract.",
    author: "Nguyen Bao Ngoc",
    date: "05/28/2024 16:45",
    source: "opportunity",
  },
];

const sourceLabels: Record<string, { label: string; className: string }> = {
  lead: { label: "From Lead", className: "bg-amber-500/10 text-amber-600 border-amber-200" },
  opportunity: { label: "Opportunity", className: "bg-primary/10 text-primary border-primary/20" },
};

export const OpportunityNotes = () => {
  const [notes, setNotes] = useState<Note[]>([...opportunityNotes, ...leadNotes]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now(),
      content: newNote.trim(),
      author: "Nguyen Bao Ngoc",
      date: new Date().toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      source: "opportunity",
    };
    setNotes([note, ...notes]);
    setNewNote("");
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (!editContent.trim() || editingId === null) return;
    setNotes(notes.map(n => n.id === editingId ? { ...n, content: editContent.trim() } : n));
    setEditingId(null);
    setEditContent("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  return (
    <Card className="p-6">
      {/* Add Note */}
      <div className="mb-6">
        <Textarea
          placeholder="Write a note..."
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          className="mb-3"
          rows={3}
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
            Add Note
          </Button>
        </div>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/40 mb-2" />
          <p className="text-muted-foreground">No notes yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map(note => {
            const sourceInfo = note.source ? sourceLabels[note.source] : null;
            return (
              <div key={note.id} className="flex gap-3 group">
                <Avatar className="h-8 w-8 mt-0.5">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {note.author.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                      {sourceInfo && (
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${sourceInfo.className}`}>
                          {sourceInfo.label}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleStartEdit(note)}
                    >
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(note.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                  {editingId === note.id ? (
                    <div className="mt-1">
                      <Textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={2}
                        className="text-sm mb-2"
                        autoFocus
                      />
                      <div className="flex gap-1.5">
                        <Button size="sm" variant="default" className="h-7 text-xs gap-1" onClick={handleSaveEdit} disabled={!editContent.trim()}>
                          <Check className="h-3 w-3" /> Save
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={handleCancelEdit}>
                          <X className="h-3 w-3" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{note.content}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
