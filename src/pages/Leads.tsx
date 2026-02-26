import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { AddLeadDialog, LeadFormData } from "@/components/leads/AddLeadDialog";
import { LeadTableView } from "@/components/leads/LeadTableView";
import { LeadBoardView } from "@/components/leads/LeadBoardView";

const initialLeads = [
  {
    id: 1,
    code: "LD00001",
    name: "Michael Johnson",
    company: "NetNam Corporation",
    phone: "0912 345 678",
    email: "michael.johnson@netnam.vn",
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
    email: "sarah.w@vietnamworks.com",
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
    email: "david.chen@bidv.com.vn",
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
    email: "robert.lee@techcombank.com.vn",
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
    email: "emily.davis@vingroup.net",
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
    email: "james.wilson@samsung.com",
    source: "Website",
    score: 78,
    status: "Warm",
    createdAt: "01/02/2024",
  },
];

const filterOptions = [
  { id: "code", label: "Lead Code" },
  { id: "name", label: "Lead Name" },
  { id: "company", label: "Company" },
  { id: "phone", label: "Phone" },
  { id: "source", label: "Source" },
  { id: "status", label: "Status" },
];

const savedFilters = ["Hot Leads", "This Week's Leads"];

type ViewMode = "list" | "board";

const Leads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(initialLeads);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

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

  const handleAddLead = (formData: LeadFormData) => {
    const newLead = {
      id: leads.length + 1,
      code: `LD${String(leads.length + 1).padStart(5, "0")}`,
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      email: formData.email || "",
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
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center border rounded-lg p-1 bg-muted/30">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === "board" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setViewMode("board")}
              >
                <LayoutGrid className="h-4 w-4 mr-1" />
                Board
              </Button>
            </div>
            <AddLeadDialog onAddLead={handleAddLead} />
          </div>
        </div>

        {/* View Content */}
        {viewMode === "list" ? (
          <LeadTableView
            leads={leads}
            selectedRows={selectedRows}
            onRowClick={handleRowClick}
            onToggleRow={toggleRow}
            onToggleAll={toggleAll}
          />
        ) : (
          <LeadBoardView leads={leads} onLeadClick={handleRowClick} />
        )}
      </div>
    </MainLayout>
  );
};

export default Leads;
