import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Building2 } from "lucide-react";

interface Project {
  id: number;
  code: string;
  title: string;
  customer: string;
  value: string;
  status: string;
  createdAt: string;
  validUntil: string;
}

interface ProjectBoardViewProps {
  projects: Project[];
  onProjectClick: (id: number) => void;
}

const columns = [
  { id: "Draft", title: "Draft", color: "bg-secondary/30 border-secondary/50" },
  { id: "Pending Approval", title: "Pending Approval", color: "bg-warning/10 border-warning/30" },
  { id: "Approved", title: "Approved", color: "bg-success/10 border-success/30" },
  { id: "Sent", title: "Sent", color: "bg-primary/10 border-primary/30" },
  { id: "Rejected", title: "Rejected", color: "bg-destructive/10 border-destructive/30" },
];

const statusColors: Record<string, string> = {
  Draft: "bg-secondary text-secondary-foreground",
  "Pending Approval": "bg-warning/10 text-warning",
  Approved: "bg-success/10 text-success",
  Sent: "bg-primary/10 text-primary",
  Rejected: "bg-destructive/10 text-destructive",
};

export function ProjectBoardView({
  projects,
  onProjectClick,
}: ProjectBoardViewProps) {
  const getProjectsByStatus = (status: string) =>
    projects.filter((project) => project.status === status);

  const getTotalValue = (items: Project[]) => {
    const total = items.reduce((sum, p) => {
      const value = parseFloat(p.value.replace(/[$K]/g, "")) * 1000;
      return sum + value;
    }, 0);
    return `$${(total / 1000).toFixed(0)}K`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {columns.map((column) => {
        const columnProjects = getProjectsByStatus(column.id);
        return (
          <div
            key={column.id}
            className={`rounded-lg border-2 ${column.color} p-4 min-h-[500px]`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">{column.title}</h3>
              <Badge variant="secondary" className="rounded-full text-xs">
                {columnProjects.length}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Total: {getTotalValue(columnProjects)}
            </p>

            <div className="space-y-3">
              {columnProjects.map((project) => (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onProjectClick(project.id)}
                >
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <p className="font-medium text-primary hover:underline text-sm line-clamp-2">
                        {project.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Building2 className="h-3 w-3" />
                      <span>{project.customer}</span>
                    </div>

                    <div className="text-lg font-bold text-primary mb-3">
                      {project.value}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>Valid until: {project.validUntil}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground font-mono">
                        {project.code}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${statusColors[project.status]}`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {columnProjects.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No projects
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
