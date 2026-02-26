import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Edit, 
  MoreHorizontal, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Mail,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EditLeadDialog, LeadData } from "@/components/leads/EditLeadDialog";
import { LeadNotes } from "@/components/leads/LeadNotes";
import { LeadAttachments } from "@/components/leads/LeadAttachments";
import { AddActivityDialog } from "@/components/layout/AddActivityDialog";

const initialLeadData: LeadData = {
  id: 1,
  code: "LD00001",
  name: "Michael Johnson",
  company: "NetNam Corporation",
  title: "IT Director",
  phone: "0912 345 678",
  email: "michael.johnson@netnam.vn",
  source: "Website",
  score: 85,
  status: "Hot",
  createdAt: "01/12/2024",
  lastActivity: "01/15/2024",
  address: "District 1, Ho Chi Minh City",
  website: "www.netnam.vn",
  industry: "Internet Services",
  employees: "100-500",
  budget: "$50,000 - $100,000",
  timeline: "Q1 2024",
  interests: ["Cloud Services", "Network Infrastructure", "Security"],
  notes: "Very interested in cloud migration. Decision maker.",
  assignedTo: "John Smith",
};

const stages = [
  { id: "new", label: "New", completed: true },
  { id: "contacted", label: "Contacted", completed: true },
  { id: "qualified", label: "Qualified", completed: true, active: true },
  { id: "converted", label: "Converted", completed: false },
];

const initialActivities = [
  { id: 1, type: "call", title: "Discovery call", description: "Discussed requirements and budget", author: "John Smith", date: "01/15/2024" },
  { id: 2, type: "email", title: "Information sent", description: "Sent product brochure", author: "John Smith", date: "01/13/2024" },
  { id: 3, type: "note", title: "Lead qualified", description: "Budget confirmed, timeline Q1 2024", author: "John Smith", date: "01/12/2024" },
];

const statusColors: Record<string, string> = {
  "Hot": "bg-destructive text-destructive-foreground",
  "Warm": "bg-warning text-warning-foreground",
  "Cold": "bg-info text-info-foreground",
};

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("detail");
  const [activityTab, setActivityTab] = useState("activity");
  const [leadData, setLeadData] = useState<LeadData>(initialLeadData);
  const [editOpen, setEditOpen] = useState(false);
  const [activities, setActivities] = useState(initialActivities);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [activityType, setActivityType] = useState<"call" | "email" | "meeting" | "note">("call");

  const handleAddActivity = (activity: { type: string; title: string; description: string; author: string; date: string }) => {
    setActivities([{ id: Date.now(), ...activity }, ...activities]);
  };

  const openActivityDialog = (type: "call" | "email" | "meeting" | "note") => {
    setActivityType(type);
    setActivityDialogOpen(true);
  };

  const handleSaveLead = (updated: LeadData) => {
    setLeadData(updated);
  };

  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/leads")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {leadData.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{leadData.name}</h1>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="text-muted-foreground">{leadData.title} at {leadData.company}</span>
                  <Badge className={statusColors[leadData.status]}>{leadData.status}</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Target className="h-4 w-4" />
              Convert to Opportunity
            </Button>
            <Button className="gap-2" onClick={() => setEditOpen(true)}>
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Lead Score & Stage */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Lead Score</h3>
              <span className="text-2xl font-bold text-primary">{leadData.score}</span>
            </div>
            <Progress value={leadData.score} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {leadData.score >= 80 ? "High probability of conversion" : 
               leadData.score >= 50 ? "Moderate engagement" : "Needs nurturing"}
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Lead Stage</h3>
            <div className="flex items-center gap-2">
              {stages.map((stage) => (
                <div key={stage.id} className="flex-1">
                  <div
                    className={cn(
                      "h-2 rounded-full",
                      stage.completed ? "bg-primary" : "bg-muted"
                    )}
                  />
                  <p className={cn(
                    "text-xs mt-1 text-center",
                    stage.active ? "text-primary font-medium" : "text-muted-foreground"
                  )}>
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left - Detail Tabs */}
          <div className="col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0">
                {["detail", "notes", "attachments"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2 capitalize"
                  >
                    {tab === "detail" ? "Detail Info" : tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="detail" className="mt-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-6">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {[
                      ["Full Name", leadData.name],
                      ["Title", leadData.title],
                      ["Company", leadData.company],
                      ["Industry", leadData.industry],
                      ["Phone", leadData.phone],
                      ["Email", leadData.email, true],
                      ["Website", leadData.website, true],
                      ["Address", leadData.address],
                    ].map(([label, value, isLink]) => (
                      <div key={label as string} className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={isLink ? "text-primary" : ""}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold mt-8 mb-6">Lead Details</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {[
                      ["Source", leadData.source],
                      ["Status", leadData.status],
                      ["Lead Score", leadData.score.toString()],
                      ["Assigned To", leadData.assignedTo],
                      ["Created Date", leadData.createdAt],
                      ["Last Activity", leadData.lastActivity],
                      ["Budget", leadData.budget],
                      ["Timeline", leadData.timeline],
                    ].map(([label, value]) => (
                      <div key={label as string} className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold mt-8 mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {leadData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <LeadNotes />
              </TabsContent>

              <TabsContent value="attachments" className="mt-6">
                <LeadAttachments />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right - Activity Sidebar */}
          <div className="col-span-1">
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-center gap-2 p-3 border-b">
                {([
                  { Icon: Phone, type: "call" as const },
                  { Icon: Calendar, type: "meeting" as const },
                  { Icon: MessageSquare, type: "note" as const },
                  { Icon: Mail, type: "email" as const },
                ]).map(({ Icon, type }) => (
                  <Button key={type} variant="ghost" size="icon" className="h-9 w-9" onClick={() => openActivityDialog(type)}>
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>

              <div className="p-4 border-b">
                <h4 className="font-medium mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => openActivityDialog("call")}>
                    <Phone className="h-3 w-3" /> Call
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => openActivityDialog("email")}>
                    <Mail className="h-3 w-3" /> Email
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => openActivityDialog("meeting")}>
                    <Calendar className="h-3 w-3" /> Meeting
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => openActivityDialog("note")}>
                    <MessageSquare className="h-3 w-3" /> Note
                  </Button>
                </div>
              </div>

              <div className="p-3 border-b">
                <h4 className="font-medium text-sm">Activity History</h4>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {activities.map((item) => (
                  <div key={item.id} className="p-4 border-b hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {item.type === "call" && <Phone className="h-4 w-4" />}
                          {item.type === "email" && <Mail className="h-4 w-4" />}
                          {item.type === "note" && <MessageSquare className="h-4 w-4" />}
                          {item.type === "meeting" && <Calendar className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.author} • {item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <EditLeadDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        lead={leadData}
        onSave={handleSaveLead}
      />
      <AddActivityDialog
        open={activityDialogOpen}
        onOpenChange={setActivityDialogOpen}
        type={activityType}
        onAdd={handleAddActivity}
      />
    </MainLayout>
  );
};

export default LeadDetail;
