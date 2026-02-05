import { useState } from "react";
import { Phone, Mail, Calendar, MessageSquare, FileText, User, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note" | "quote";
  title: string;
  description: string;
  author: string;
  date: string;
}

interface ActivityPanelProps {
  activities?: Activity[];
  selectedName?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const iconMap = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: MessageSquare,
  quote: FileText,
};

const colorMap = {
  call: "bg-green-500/10 text-green-600",
  email: "bg-blue-500/10 text-blue-600",
  meeting: "bg-purple-500/10 text-purple-600",
  note: "bg-yellow-500/10 text-yellow-600",
  quote: "bg-red-500/10 text-red-600",
};

const defaultActivities: Activity[] = [
  {
    id: "1",
    type: "note",
    title: "Data created",
    description: "Created demo data for customer experience",
    author: "John Smith",
    date: "09/05/24",
  },
  {
    id: "2",
    type: "meeting",
    title: "Product demo",
    description: "Product demonstration for customer",
    author: "John Smith",
    date: "09/05/24",
  },
  {
    id: "3",
    type: "call",
    title: "Information gathering",
    description: "Collected customer information",
    author: "John Smith",
    date: "09/05/24",
  },
  {
    id: "4",
    type: "quote",
    title: "Product quotation",
    description: "Sent product quotation for CRM.VN",
    author: "John Smith",
    date: "09/05/24",
  },
  {
    id: "5",
    type: "email",
    title: "VIP Customer",
    description: "Customer is a friend of the Director",
    author: "Sarah Johnson",
    date: "09/05/24",
  },
];

export function ActivityPanel({
  activities = defaultActivities,
  selectedName,
  isOpen = true,
  onClose,
}: ActivityPanelProps) {
  if (!isOpen) return null;

  return (
    <aside className="w-80 border-l bg-card flex flex-col h-full">
      {/* Action buttons */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="activities" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
          <TabsTrigger
            value="activities"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            Activities
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="flex-1 overflow-y-auto m-0 p-0">
          <div className="divide-y">
            {activities.map((activity) => {
              const Icon = iconMap[activity.type];
              return (
                <div key={activity.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex gap-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0", colorMap[activity.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-sm truncate">{activity.title}</p>
                        <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.author} • {activity.date}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="flex-1 overflow-y-auto m-0 p-4">
          <p className="text-sm text-muted-foreground text-center py-8">
            No orders yet
          </p>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
