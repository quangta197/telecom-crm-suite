import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: string;
  time: string;
  date: string;
  title: string;
  isAllDay?: boolean;
  assignee: {
    name: string;
    avatar?: string;
  };
}

const appointments: Appointment[] = [
  {
    id: "1",
    time: "08:00, 26/07",
    date: "10:00, 27/07",
    title: "Product demo with customer",
    assignee: { name: "John Smith" },
  },
  {
    id: "2",
    time: "All day",
    date: "01/08/2022",
    title: "Product demo with customer",
    isAllDay: true,
    assignee: { name: "Sarah Johnson" },
  },
  {
    id: "3",
    time: "08:00, 26/08",
    date: "10:00, 27/08",
    title: "Product demo with customer",
    assignee: { name: "Mike Wilson" },
  },
  {
    id: "4",
    time: "01/09/2022",
    date: "10:00, 27/07",
    title: "Product demo with customer",
    assignee: { name: "Emily Davis" },
  },
];

export function DueAppointments() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Due Appointments</h3>
          <Badge variant="secondary" className="rounded-full">5</Badge>
        </div>
        <button className="text-sm text-primary hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                {apt.isAllDay ? (
                  <span className="text-primary font-medium">All day</span>
                ) : (
                  apt.time
                )}
              </p>
              <p className="text-xs text-muted-foreground">{apt.date}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{apt.title}</p>
            </div>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={apt.assignee.avatar} />
              <AvatarFallback className="text-xs">
                {apt.assignee.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
}
