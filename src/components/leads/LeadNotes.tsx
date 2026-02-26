import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Trash2 } from "lucide-react";

interface Note {
  id: number;
  content: string;
  author: string;
  date: string;
}

const initialNotes: Note[] = [
  {
    id: 1,
    content: "Very interested in cloud migration. Decision maker with budget authority.",
    author: "John Smith",
    date: "01/15/2024 10:30",
  },
  {
    id: 2,
    content: "Follow up scheduled for next week to discuss pricing details.",
    author: "John Smith",
    date: "01/13/2024 14:15",
  },
];

export const LeadNotes = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now(),
      content: newNote.trim(),
      author: "John Smith",
      date: new Date().toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };
    setNotes([note, ...notes]);
    setNewNote("");
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
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
          {notes.map(note => (
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
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(note.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{note.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
