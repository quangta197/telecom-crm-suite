import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Phone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { AddLeadDialog, LeadFormData } from "@/components/leads/AddLeadDialog";

const initialLeads = [
  {
    id: 1,
    code: "LD00001",
    name: "Michael Johnson",
    company: "NetNam Corporation",
    phone: "0912 345 678",
    source: "Website",
    score: 85,
    status: "Hot",
    createdAt: "01/12/2024",
  },
  {
    id: 2,
    code: "LD00002",
    name: "Sarah Williams",
    company: "VietnamWorks",
    phone: "0987 654 321",
    source: "Event",
    score: 72,
    status: "Warm",
    createdAt: "01/10/2024",
  },
  {
    id: 3,
    code: "LD00003",
    name: "David Chen",
    company: "BIDV Securities",
    phone: "0909 123 456",
    source: "Referral",
    score: 90,
    status: "Hot",
    createdAt: "01/08/2024",
  },
  {
    id: 4,
    code: "LD00004",
    name: "Robert Lee",
    company: "Techcombank",
    phone: "0918 765 432",
    source: "Cold call",
    score: 45,
    status: "Cold",
    createdAt: "01/05/2024",
  },
  {
    id: 5,
    code: "LD00005",
    name: "Emily Davis",
    company: "Vingroup",
    phone: "0923 456 789",
    source: "LinkedIn",
    score: 68,
    status: "Warm",
    createdAt: "01/03/2024",
  },
  {
    id: 6,
    code: "LD00006",
    name: "James Wilson",
    company: "Samsung Vietnam",
    phone: "0934 567 890",
    source: "Website",
    score: 78,
    status: "Warm",
    createdAt: "01/02/2024",
  },
];

const statusColors = {
  "Hot": "bg-destructive/10 text-destructive",
  "Warm": "bg-warning/10 text-warning",
  "Cold": "bg-info/10 text-info",
};

const filterOptions = [
  { id: "code", label: "Lead Code" },
  { id: "name", label: "Lead Name" },
  { id: "company", label: "Company" },
  { id: "phone", label: "Phone" },
  { id: "source", label: "Source" },
  { id: "status", label: "Status" },
];

const savedFilters = ["Hot Leads", "This Week's Leads"];

const Leads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(initialLeads);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleRowClick = (id: number) => {
    navigate(`/leads/${id}`);
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === leads.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(leads.map((l) => l.id));
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const handleAddLead = (formData: LeadFormData) => {
    const newLead = {
      id: leads.length + 1,
      code: `LD${String(leads.length + 1).padStart(5, "0")}`,
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      source: formData.source || "Website",
      score: formData.status === "Hot" ? 85 : formData.status === "Warm" ? 65 : 40,
      status: formData.status,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };
    setLeads([newLead, ...leads]);
  };

  return (
    <MainLayout
      filterTitle="All Leads"
      filters={filterOptions}
      savedFilters={savedFilters}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">All Leads</h1>
          <AddLeadDialog onAddLead={handleAddLead} />
        </div>

        {/* Table */}
        <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === leads.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Lead ID</TableHead>
                <TableHead>Lead Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className={`hover:bg-muted/50 cursor-pointer ${
                    selectedRows.includes(lead.id) ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleRowClick(lead.id)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedRows.includes(lead.id)}
                      onCheckedChange={() => toggleRow(lead.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{lead.code}</TableCell>
                  <TableCell className="font-medium text-primary hover:underline">
                    {lead.name}
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-success" />
                      <span>{lead.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[lead.status as keyof typeof statusColors]}
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Total: {leads.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">1 to {leads.length}</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leads;
