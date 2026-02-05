import { 
  ClipboardList, 
  ShoppingCart, 
  MessageSquare, 
  Calendar, 
  Gift, 
  Heart, 
  Phone, 
  UserX, 
  Target 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  icon: React.ElementType;
  value: number;
  label: string;
  iconBg: string;
  iconColor: string;
}

const stats: StatItem[] = [
  {
    id: "tasks",
    icon: ClipboardList,
    value: 5,
    label: "Tasks",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "orders",
    icon: ShoppingCart,
    value: 5,
    label: "Due Orders",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: "consultations",
    icon: MessageSquare,
    value: 20,
    label: "Consultations",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    id: "appointments",
    icon: Calendar,
    value: 5,
    label: "Appointments",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "birthdays",
    icon: Gift,
    value: 10,
    label: "Birthdays",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: "care",
    icon: Heart,
    value: 30,
    label: "Care Cards",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    id: "calls",
    icon: Phone,
    value: 4,
    label: "Calls",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "inactive",
    icon: UserX,
    value: 12,
    label: "7 Days Inactive",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: "opportunities",
    icon: Target,
    value: 15,
    label: "Opportunities",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export function WorkStatistics() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold">Work Statistics</h3>
        <button className="text-muted-foreground hover:text-foreground">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", stat.iconBg)}>
              <stat.icon className={cn("h-6 w-6", stat.iconColor)} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
