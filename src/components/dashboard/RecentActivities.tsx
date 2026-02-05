import { Phone, Mail, FileText, Calendar, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "call",
    icon: Phone,
    title: "Called VNPT Hanoi",
    description: "Discussed enterprise package options",
    time: "10 minutes ago",
    user: "John Smith",
  },
  {
    id: 2,
    type: "email",
    icon: Mail,
    title: "Sent quote to Viettel Corp",
    description: "Network infrastructure solution package",
    time: "1 hour ago",
    user: "Sarah Johnson",
  },
  {
    id: 3,
    type: "proposal",
    icon: FileText,
    title: "Created new proposal",
    description: "FPT Data Center project",
    time: "2 hours ago",
    user: "Mike Wilson",
  },
  {
    id: 4,
    type: "meeting",
    icon: Calendar,
    title: "Scheduled meeting with MobiFone",
    description: "Product demo on Jan 15",
    time: "3 hours ago",
    user: "John Smith",
  },
  {
    id: 5,
    type: "deal",
    icon: CheckCircle,
    title: "Closed CMC Telecom deal",
    description: "Value: $250K",
    time: "5 hours ago",
    user: "Emily Davis",
  },
];

const typeStyles = {
  call: "bg-info/10 text-info",
  email: "bg-primary/10 text-primary",
  proposal: "bg-accent/10 text-accent",
  meeting: "bg-warning/10 text-warning",
  deal: "bg-success/10 text-success",
};

export function RecentActivities() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Activities</h3>
          <p className="text-sm text-muted-foreground">
            Track sales team activities
          </p>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex gap-4 rounded-lg p-3 transition-colors hover:bg-secondary/50"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                typeStyles[activity.type as keyof typeof typeStyles]
              )}
            >
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.description}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{activity.user}</span>
                <span>•</span>
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
