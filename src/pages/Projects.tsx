import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List } from "lucide-react";
import { ProjectTableView } from "@/components/projects/ProjectTableView";
import { ProjectBoardView } from "@/components/projects/ProjectBoardView";

const initialProjects = [
  {
    id: 1,
    code: "PJ-2024-001",
    title: "VNPT Network Infrastructure Solution",
    customer: "VNPT Hanoi",
    value: "$320K",
    status: "Sent",
    createdAt: "01/12/2024",
    validUntil: "02/12/2024",
  },
  {
    id: 2,
    code: "PJ-2024-002",
    title: "Viettel Data Center Solution",
    customer: "Viettel Business",
    value: "$580K",
    status: "Pending Approval",
    createdAt: "01/10/2024",
    validUntil: "02/10/2024",
  },
  {
    id: 3,
    code: "PJ-2024-003",
    title: "Cloud Migration Package",
    customer: "FPT Telecom",
    value: "$210K",
    status: "Approved",
    createdAt: "01/08/2024",
    validUntil: "02/08/2024",
  },
  {
    id: 4,
    code: "PJ-2024-004",
    title: "5G Enterprise Solution",
    customer: "CMC Telecom",
    value: "$450K",
    status: "Sent",
    createdAt: "01/05/2024",
    validUntil: "02/05/2024",
  },
  {
    id: 5,
    code: "PJ-2024-005",
    title: "IoT Platform Integration",
    customer: "MobiFone",
    value: "$180K",
    status: "Draft",
    createdAt: "01/03/2024",
    validUntil: "02/03/2024",
  },
];

const filterOptions = [
  { id: "code", label: "Project Code" },
  { id: "title", label: "Title" },
  { id: "customer", label: "Customer" },
  { id: "value", label: "Value" },
  { id: "status", label: "Status" },
];

const savedFilters = ["Sent Projects", "This Month's Projects"];

type ViewMode = "list" | "board";

const Projects = () => {
  const navigate = useNavigate();
  const [projects] = useState(initialProjects);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const handleRowClick = (id: number) => {
    navigate(`/projects/${id}`);
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === projects.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(projects.map((p) => p.id));
    }
  };

  return (
    <MainLayout
      filterTitle="All Projects"
      filters={filterOptions}
      savedFilters={savedFilters}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">All Projects</h1>
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
            <Button className="gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {/* View Content */}
        {viewMode === "list" ? (
          <ProjectTableView
            projects={projects}
            selectedRows={selectedRows}
            onRowClick={handleRowClick}
            onToggleRow={toggleRow}
            onToggleAll={toggleAll}
          />
        ) : (
          <ProjectBoardView
            projects={projects}
            onProjectClick={handleRowClick}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Projects;
