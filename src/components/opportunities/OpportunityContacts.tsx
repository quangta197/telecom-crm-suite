import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Phone, Mail, Trash2, ExternalLink } from "lucide-react";
import { useContactRolesStore } from "@/stores/contactRolesStore";

interface Contact {
  id: number;
  name: string;
  title: string;
  phone: string;
  email: string;
  role: string;
  isPrimary: boolean;
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Nguyen Ngoc Anh",
    title: "IT Director",
    phone: "0912 345 678",
    email: "anh.nguyen@datphat.vn",
    role: "Decision Maker",
    isPrimary: true,
  },
  {
    id: 2,
    name: "Tran Van Binh",
    title: "Technical Manager",
    phone: "0987 654 321",
    email: "binh.tran@datphat.vn",
    role: "Technical Lead",
    isPrimary: false,
  },
];

export function OpportunityContacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", title: "", phone: "", email: "", role: "" });
  const { roles } = useContactRolesStore();

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setContacts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name,
        title: form.title,
        phone: form.phone,
        email: form.email,
        role: form.role,
        isPrimary: prev.length === 0,
      },
    ]);
    setForm({ name: "", title: "", phone: "", email: "", role: "" });
    setDialogOpen(false);
  };

  const handleRemove = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSetPrimary = (id: number) => {
    setContacts((prev) =>
      prev.map((c) => ({ ...c, isPrimary: c.id === id }))
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Contacts ({contacts.length})</h3>
        <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
          <Plus className="h-3.5 w-3.5" /> Add Contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No contacts yet</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium text-sm">{contact.name}</span>
                      {contact.isPrimary && (
                        <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0">
                          Primary
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{contact.title}</TableCell>
                <TableCell>
                  <span className="text-sm text-primary flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {contact.phone}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-primary flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {contact.email}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">{contact.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!contact.isPrimary && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        title="Set as primary"
                        onClick={() => handleSetPrimary(contact.id)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => handleRemove(contact.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contact name" required />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Job title" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
