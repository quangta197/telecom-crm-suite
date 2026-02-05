import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  {
    id: 1,
    title: "VNPT Product Demo Meeting",
    time: "09:00 - 10:30",
    type: "meeting",
    location: "Meeting Room A",
    attendees: 5,
  },
  {
    id: 2,
    title: "Viettel Follow-up Call",
    time: "11:00 - 11:30",
    type: "call",
    location: "Online",
    attendees: 2,
  },
  {
    id: 3,
    title: "FPT Solution Presentation",
    time: "14:00 - 16:00",
    type: "presentation",
    location: "Client Site",
    attendees: 8,
  },
  {
    id: 4,
    title: "CMC Contract Review",
    time: "16:30 - 17:30",
    type: "internal",
    location: "Meeting Room B",
    attendees: 3,
  },
];

const typeColors = {
  meeting: "bg-primary/10 text-primary border-l-primary",
  call: "bg-success/10 text-success border-l-success",
  presentation: "bg-warning/10 text-warning border-l-warning",
  internal: "bg-accent/10 text-accent border-l-accent",
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarPage = () => {
  // Generate calendar days for current month
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">
              Manage appointments and meetings
            </p>
          </div>
          <Button className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Create Appointment
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <Card className="lg:col-span-2 p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">January 2024</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before first of month */}
              {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-2" />
              ))}
              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate();
                const hasEvents = [5, 8, 12, 15, 18, 22, 25].includes(day);

                return (
                  <div
                    key={day}
                    className={cn(
                      "aspect-square p-2 rounded-lg cursor-pointer transition-colors hover:bg-secondary",
                      isToday && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <div className="text-sm font-medium">{day}</div>
                    {hasEvents && !isToday && (
                      <div className="mt-1 flex gap-0.5">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        <div className="h-1 w-1 rounded-full bg-success" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Today's Events */}
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "p-4 rounded-lg border-l-4 transition-all hover:shadow-md cursor-pointer",
                    typeColors[event.type as keyof typeof typeColors]
                  )}
                >
                  <p className="font-semibold text-sm mb-2">{event.title}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      {event.attendees} attendees
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
