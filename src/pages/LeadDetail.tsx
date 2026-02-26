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
  Target,
  Plus,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EditLeadDialog, LeadData } from "@/components/leads/EditLeadDialog";
import { LeadNotes } from "@/components/leads/LeadNotes";
import { LeadAttachments } from "@/components/leads/LeadAttachments";
import { AddActivityDialog } from "@/components/layout/AddActivityDialog";
import { useActivityTypesStore, iconMap } from "@/stores/activityTypesStore";
import { ConvertToOpportunityDialog } from "@/components/leads/ConvertToOpportunityDialog";
import { useLeadStagesStore } from "@/stores/leadStagesStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  forecastRevenue: "$50,000 - $100,000",
  timeline: "Q1 2024",
  interests: ["Cloud Services", "Network Infrastructure", "Security"],
  notes: "Very interested in cloud migration. Decision maker.",
  assignedTo: "John Smith",
};


const initialActivities = [
  { id: 1, type: "call", title: "Discovery call", description: "Discussed requirements and budget", author: "John Smith", date: "01/15/2024" },
  { id: 2, type: "email", title: "Information sent", description: "Sent product brochure", author: "John Smith", date: "01/13/2024" },
  { id: 3, type: "note", title: "Lead qualified", description: "Budget confirmed, timeline Q1 2024", author: "John Smith", date: "01/12/2024" },
];

const statusColors: Record<string, string> = {
  "Hot": "bg-destructive text-destructive-foreground",
  "Warm": "bg-warning text-warning-foreground",
  "Cold": "bg-info text-info-foreground",
  "Converted": "bg-green-500 text-white",
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
  const [activityType, setActivityType] = useState<string>("call");
  const [activityFilter, setActivityFilter] = useState("all");
  const { activityTypes } = useActivityTypesStore();
  const [activeStage, setActiveStage] = useState("qualified");
  const [convertOpen, setConvertOpen] = useState(false);
  const { stages: stageList } = useLeadStagesStore();

  const handleAddActivity = (activity: { type: string; title: string; description: string; author: string; date: string }) => {
    setActivities([{ id: Date.now(), ...activity }, ...activities]);
  };

  const openActivityDialog = (type: string) => {
    setActivityType(type);
    setActivityDialogOpen(true);
  };

  const [editingActivityId, setEditingActivityId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleStartEditActivity = (item: typeof activities[0]) => {
    setEditingActivityId(item.id);
    setEditForm({ title: item.title, description: item.description });
  };

  const handleSaveEditActivity = () => {
    if (!editForm.title.trim()) return;
    setActivities(activities.map((a) =>
      a.id === editingActivityId ? { ...a, title: editForm.title.trim(), description: editForm.description.trim() } : a
    ));
    setEditingActivityId(null);
  };

  const handleCancelEditActivity = () => {
    setEditingActivityId(null);
  };

  const handleSaveLead = (updated: LeadData) => {
    setLeadData(updated);
  };

  const handleConverted = () => {
    // Set stage to last stage (Converted)
    const lastStage = stageList[stageList.length - 1];
    if (lastStage) setActiveStage(lastStage.id);
    // Update lead status
    setLeadData((prev) => ({ ...prev, status: "Converted" }));
  };

  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate("/leads")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarFallback className="text-base font-semibold bg-primary/10 text-primary">
                {leadData.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold leading-tight">{leadData.name}</h1>
              <div className="flex items-center gap-2 mt-0.5 text-sm">
                <span className="text-muted-foreground">{leadData.title} at {leadData.company}</span>
                <Badge className={cn("text-xs px-2 py-0.5", statusColors[leadData.status])}>{leadData.status}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setConvertOpen(true)}>
              <Target className="h-3.5 w-3.5" />
              Convert to Opportunity
            </Button>
            <Button size="sm" className="gap-1.5" onClick={() => setEditOpen(true)}>
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Lead Score & Stage */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Lead Score</h3>
              <span className="text-2xl font-bold text-primary">{leadData.score}</span>
            </div>
            <Progress value={leadData.score} className="h-2.5" />
            <p className="text-xs text-muted-foreground mt-2">
              {leadData.score >= 80 ? "High probability of conversion" : 
               leadData.score >= 50 ? "Moderate engagement" : "Needs nurturing"}
            </p>
          </Card>
          
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-4">Lead Stage</h3>
            <div className="flex items-center gap-1">
              {stageList.map((stage) => {
                const stageIndex = stageList.findIndex((s) => s.id === stage.id);
                const activeIndex = stageList.findIndex((s) => s.id === activeStage);
                const isCompleted = stageIndex <= activeIndex;
                const isActive = stage.id === activeStage;
                return (
                  <div
                    key={stage.id}
                    className="flex-1 cursor-pointer group"
                    onClick={() => setActiveStage(stage.id)}
                  >
                    <div
                      className={cn(
                        "h-1.5 rounded-full transition-colors",
                        isCompleted ? "bg-primary" : "bg-muted group-hover:bg-primary/30"
                      )}
                    />
                    <p className={cn(
                      "text-xs mt-1.5 text-center transition-colors",
                      isActive ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {stage.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left - Detail Tabs */}
          <div className="col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-0">
                {["detail", "notes", "attachments"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-5 py-2.5 text-sm capitalize"
                  >
                    {tab === "detail" ? "Detail Info" : tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="detail" className="mt-4">
                <Card className="p-5">
                  <h3 className="font-semibold text-sm mb-5">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-x-10 gap-y-0 text-sm">
                    {[
                      ["Full Name", leadData.name],
                      ["Title", leadData.title],
                      ["Company", leadData.company],
                      ["Industry", leadData.industry],
                      ["Phone", leadData.phone, true],
                      ["Email", leadData.email, true],
                      ["Website", leadData.website, true],
                      ["Address", leadData.address],
                    ].map(([label, value, isLink]) => (
                      <div key={label as string} className="flex justify-between py-2.5 border-b border-border/60">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={cn("text-right", isLink ? "text-primary" : "font-medium")}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-sm mt-7 mb-5">Lead Details</h3>
                  <div className="grid grid-cols-2 gap-x-10 gap-y-0 text-sm">
                    {[
                      ["Source", leadData.source],
                      ["Status", leadData.status],
                      ["Lead Score", leadData.score.toString()],
                      ["Assigned To", leadData.assignedTo],
                      ["Created Date", leadData.createdAt],
                      ["Last Activity", leadData.lastActivity],
                      ["Forecast Revenue", leadData.forecastRevenue],
                      ["Timeline", leadData.timeline],
                    ].map(([label, value]) => (
                      <div key={label as string} className="flex justify-between py-2.5 border-b border-border/60">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold text-sm mt-7 mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {leadData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">{interest}</Badge>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <LeadNotes />
              </TabsContent>

              <TabsContent value="attachments" className="mt-4">
                <LeadAttachments />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right - Activity Sidebar */}
          <div className="col-span-1">
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                  {activityTypes.slice(0, 4).map((at) => {
                    const Icon = iconMap[at.icon];
                    return (
                      <Button key={at.id} variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary" onClick={() => openActivityDialog(at.id)}>
                        {Icon && <Icon className="h-4 w-4" />}
                      </Button>
                    );
                  })}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="gap-1.5 h-8 text-xs">
                      <Plus className="h-3.5 w-3.5" /> Add
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {activityTypes.map((at) => {
                      const Icon = iconMap[at.icon];
                      return (
                        <DropdownMenuItem key={at.id} onClick={() => openActivityDialog(at.id)} className="gap-2">
                          <div className={`h-5 w-5 rounded-full ${at.color} flex items-center justify-center text-white`}>
                            {Icon && <Icon className="h-3 w-3" />}
                          </div>
                          {at.name}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="px-4 py-2.5 border-b">
                <h4 className="font-semibold text-sm mb-2">Activity History</h4>
                <div className="flex flex-wrap gap-1.5">
                  <Button
                    size="sm"
                    variant={activityFilter === "all" ? "default" : "outline"}
                    className="h-6 text-xs px-2.5 rounded-full"
                    onClick={() => setActivityFilter("all")}
                  >
                    All ({activities.length})
                  </Button>
                  {activityTypes.map((at) => {
                    const count = activities.filter((a) => a.type === at.id).length;
                    return (
                      <Button
                        key={at.id}
                        size="sm"
                        variant={activityFilter === at.id ? "default" : "outline"}
                        className="h-6 text-xs px-2.5 rounded-full"
                        onClick={() => setActivityFilter(at.id)}
                      >
                        {at.name} ({count})
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="max-h-[450px] overflow-y-auto">
                {activities
                  .filter((item) => activityFilter === "all" || item.type === activityFilter)
                  .map((item) => {
                  const actType = activityTypes.find((at) => at.id === item.type);
                  const Icon = actType ? iconMap[actType.icon] : null;
                  const color = actType?.color || "bg-primary/10";
                    return (
                      <div key={item.id} className="px-4 py-3 border-b last:border-b-0 hover:bg-muted/30 transition-colors group">
                        <div className="flex items-start gap-3">
                          <div className={`h-9 w-9 rounded-full ${color} flex items-center justify-center flex-shrink-0 text-white`}>
                            {Icon && <Icon className="h-3.5 w-3.5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            {editingActivityId === item.id ? (
                              <div className="space-y-2">
                                <input
                                  className="w-full text-sm font-semibold border rounded px-2 py-1 bg-background"
                                  value={editForm.title}
                                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                  autoFocus
                                />
                                <input
                                  className="w-full text-xs border rounded px-2 py-1 bg-background"
                                  value={editForm.description}
                                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                  placeholder="Description"
                                />
                                <div className="flex gap-1.5">
                                  <Button size="sm" className="h-6 text-xs gap-1" onClick={handleSaveEditActivity} disabled={!editForm.title.trim()}>
                                    <Check className="h-3 w-3" /> Save
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={handleCancelEditActivity}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-sm leading-tight">{item.title}</p>
                                  <div className="ml-auto flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleStartEditActivity(item)}>
                                      <Pencil className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDeleteActivity(item.id)}>
                                      <Trash2 className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{item.author} • {item.date}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                  );
                })}
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
      <ConvertToOpportunityDialog
        open={convertOpen}
        onOpenChange={setConvertOpen}
        lead={leadData}
        onConverted={handleConverted}
      />
    </MainLayout>
  );
};

export default LeadDetail;
