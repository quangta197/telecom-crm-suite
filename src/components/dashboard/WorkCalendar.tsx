import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: number; // in hours
  color: string;
  type: "task" | "appointment" | "call";
}

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Product demo",
    time: "08:00",
    duration: 2,
    color: "bg-green-500",
    type: "appointment",
  },
  {
    id: "2",
    title: "Product demo",
    time: "09:00",
    duration: 1,
    color: "bg-amber-400",
    type: "task",
  },
  {
    id: "3",
    title: "Product consultation",
    time: "11:00",
    duration: 1,
    color: "bg-rose-400",
    type: "call",
  },
  {
    id: "4",
    title: "Contract closing",
    time: "14:00",
    duration: 2,
    color: "bg-blue-500",
    type: "task",
  },
  {
    id: "5",
    title: "Consultation",
    time: "15:00",
    duration: 1,
    color: "bg-cyan-400",
    type: "appointment",
  },
  {
    id: "6",
    title: "Consultation",
    time: "15:30",
    duration: 1,
    color: "bg-purple-400",
    type: "task",
  },
  {
    id: "7",
    title: "Build quote",
    time: "16:00",
    duration: 1.5,
    color: "bg-amber-500",
    type: "task",
  },
  {
    id: "8",
    title: "Contract closing",
    time: "16:30",
    duration: 1,
    color: "bg-green-400",
    type: "appointment",
  },
];

const timeSlots = [
  "All day",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const tabs = [
  { id: "all", label: "All", count: 15 },
  { id: "tasks", label: "Tasks", count: 5 },
  { id: "appointments", label: "Appointments", count: 5 },
  { id: "calls", label: "Calls", count: 5 },
];

export function WorkCalendar() {
  const [activeTab, setActiveTab] = useState("all");
  const today = new Date();

  return (
    <div className="rounded-xl bg-card p-6 shadow-card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Work Calendar</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>

      {/* Date & User selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {today.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })}
          </span>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="text-xs h-7">
            Today
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs">LG</AvatarFallback>
          </Avatar>
          <span className="text-sm">Le Minh Giang</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1 text-sm whitespace-nowrap pb-2 -mb-2 border-b-2 transition-colors",
              activeTab === tab.id
                ? "text-primary border-primary font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            <span className="font-bold">{tab.count}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Calendar Timeline */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          {timeSlots.map((time, index) => (
            <div key={time} className="flex min-h-[48px]">
              <div className="w-16 flex-shrink-0 text-xs text-muted-foreground py-2">
                {time}
              </div>
              <div className="flex-1 border-t border-dashed border-muted relative">
                {/* Events for this time slot */}
                {events
                  .filter((event) => event.time === time || (index === 0 && time === "All day"))
                  .map((event, eventIndex) => (
                    <div
                      key={event.id}
                      className={cn(
                        "absolute rounded px-2 py-1 text-xs text-white truncate cursor-pointer hover:opacity-90 transition-opacity",
                        event.color
                      )}
                      style={{
                        top: 4,
                        left: eventIndex * 85,
                        width: "80px",
                        height: `${event.duration * 40}px`,
                        minHeight: "32px",
                      }}
                    >
                      <p className="font-medium truncate">{event.title}</p>
                      <p className="opacity-80 truncate">{event.time}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
