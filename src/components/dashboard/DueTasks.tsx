import { CheckCircle2, Settings, RefreshCw, Maximize2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  status: "not_started" | "in_progress" | "completed";
  dueDate: string;
  assignee: {
    name: string;
    avatar?: string;
  };
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Product evaluation",
    priority: "high",
    status: "not_started",
    dueDate: "Today, 02:53",
    assignee: { name: "John Smith" },
  },
  {
    id: "2",
    title: "Customer product consultation",
    priority: "high",
    status: "not_started",
    dueDate: "Tomorrow, 02:53",
    assignee: { name: "Sarah Johnson" },
  },
  {
    id: "3",
    title: "Organize workshop",
    priority: "high",
    status: "not_started",
    dueDate: "14/07/2022 21:52",
    assignee: { name: "Mike Wilson" },
  },
  {
    id: "4",
    title: "Meet customer",
    priority: "high",
    status: "not_started",
    dueDate: "11/08/2022 19:23",
    assignee: { name: "Emily Davis" },
  },
];

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

export function DueTasks() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Due Tasks</h3>
          <Badge variant="secondary" className="rounded-full">5</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <button className="text-sm text-primary hover:underline ml-2">
            View all
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{task.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`h-2 w-2 rounded-full ${priorityColors[task.priority]}`} />
                <span className="text-xs text-muted-foreground">High</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-muted-foreground">Not started</p>
              <p className="text-xs text-muted-foreground">{task.dueDate}</p>
            </div>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback className="text-xs">
                {task.assignee.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
}
