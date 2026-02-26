import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List } from "lucide-react";
import { AddOpportunityDialog } from "@/components/opportunities/AddOpportunityDialog";
import { OpportunityTableView } from "@/components/opportunities/OpportunityTableView";
import { OpportunityBoardView } from "@/components/opportunities/OpportunityBoardView";
import { toast } from "@/components/ui/use-toast";

const initialOpportunities = [
  {
    id: 1,
    code: "OP00001",
    title: "VNPT Network Infrastructure",
    company: "VNPT Hanoi",
    value: "$320K",
    stage: "Negotiation",
    probability: 75,
    closeDate: "01/15/2024",
    owner: "John Smith",
    leadId: 1,
    leadCode: "LD00001",
  },
  {
    id: 2,
    code: "OP00002",
    title: "Viettel Data Center",
    company: "Viettel Business",
    value: "$580K",
    stage: "Proposal",
    probability: 60,
    closeDate: "01/22/2024",
    owner: "Sarah Johnson",
    leadId: null,
    leadCode: null,
  },
  {
    id: 3,
    code: "OP00003",
    title: "FPT Cloud Migration",
    company: "FPT Telecom",
    value: "$210K",
    stage: "Qualification",
    probability: 45,
    closeDate: "01/30/2024",
    owner: "Mike Wilson",
    leadId: 2,
    leadCode: "LD00002",
  },
  {
    id: 4,
    code: "OP00004",
    title: "CMC 5G Enterprise",
    company: "CMC Telecom",
    value: "$450K",
    stage: "Negotiation",
    probability: 80,
    closeDate: "02/10/2024",
    owner: "John Smith",
    leadId: null,
    leadCode: null,
  },
  {
    id: 5,
    code: "OP00005",
    title: "MobiFone IoT Platform",
    company: "MobiFone",
    value: "$180K",
    stage: "Discovery",
    probability: 30,
    closeDate: "02/28/2024",
    owner: "Emily Davis",
    leadId: 3,
    leadCode: "LD00003",
  },
  {
    id: 6,
    code: "OP00006",
    title: "BIDV Security Solution",
    company: "BIDV Securities",
    value: "$250K",
    stage: "Closed Won",
    probability: 95,
    closeDate: "01/05/2024",
    owner: "Sarah Johnson",
    leadId: null,
    leadCode: null,
  },
];

const filterOptions = [
  { id: "code", label: "Opportunity Code" },
  { id: "title", label: "Opportunity Name" },
  { id: "company", label: "Customer" },
  { id: "value", label: "Value" },
  { id: "stage", label: "Stage" },
  { id: "owner", label: "Owner" },
];

const savedFilters = ["In Negotiation", "This Month's Opportunities"];

type ViewMode = "list" | "board";

const Opportunities = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [opportunitiesList, setOpportunitiesList] = useState(initialOpportunities);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const handleRowClick = (id: number) => {
    navigate(`/opportunities/${id}`);
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === opportunitiesList.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(opportunitiesList.map((o) => o.id));
    }
  };

  const handleAddOpportunity = (data: {
    title: string;
    company: string;
    value: string;
    stage: string;
    probability: number;
    closeDate: string;
    owner: string;
  }) => {
    const newId = Math.max(...opportunitiesList.map((o) => o.id)) + 1;
    const newCode = `OP${String(newId).padStart(5, "0")}`;
    const formattedDate = new Date(data.closeDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    const newOpportunity = {
      id: newId,
      code: newCode,
      title: data.title,
      company: data.company,
      value: data.value,
      stage: data.stage,
      probability: data.probability,
      closeDate: formattedDate,
      owner: data.owner,
      leadId: null as number | null,
      leadCode: null as string | null,
    };

    setOpportunitiesList((prev) => [...prev, newOpportunity]);
    toast({
      title: "Opportunity Created",
      description: `${data.title} has been added successfully.`,
    });
  };

  return (
    <MainLayout
      filterTitle="All Opportunities"
      filters={filterOptions}
      savedFilters={savedFilters}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">All Opportunities</h1>
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
            <Button className="gradient-primary" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {/* Add Opportunity Dialog */}
        <AddOpportunityDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleAddOpportunity}
        />

        {/* View Content */}
        {viewMode === "list" ? (
          <OpportunityTableView
            opportunities={opportunitiesList}
            selectedRows={selectedRows}
            onRowClick={handleRowClick}
            onToggleRow={toggleRow}
            onToggleAll={toggleAll}
          />
        ) : (
          <OpportunityBoardView
            opportunities={opportunitiesList}
            onOpportunityClick={handleRowClick}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Opportunities;
