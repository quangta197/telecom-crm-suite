import { useState, useRef, useEffect } from "react";
import { useOpportunityStagesStore } from "@/stores/opportunityStagesStore";
import { useOpportunityCustomFieldsStore } from "@/stores/opportunityCustomFieldsStore";
import { useOpportunityTypesStore } from "@/stores/opportunityTypesStore";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { OpportunityContacts } from "@/components/opportunities/OpportunityContacts";
import { OpportunityAttachments } from "@/components/opportunities/OpportunityAttachments";
import { OpportunityNotes } from "@/components/opportunities/OpportunityNotes";
import { OpportunityServiceProducts } from "@/components/opportunities/OpportunityServiceProducts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select as UISelect,
  SelectContent as UISelectContent,
  SelectItem as UISelectItem,
  SelectTrigger as UISelectTrigger,
  SelectValue as UISelectValue,
} from "@/components/ui/select";
import { OpportunityQuotations } from "@/components/opportunities/OpportunityQuotations";
import { OpportunityNegotiation } from "@/components/opportunities/OpportunityNegotiation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddActivityDialog } from "@/components/layout/AddActivityDialog";
import { useActivityTypesStore, iconMap } from "@/stores/activityTypesStore";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ArrowLeft, 
  Users, 
  Tag, 
  Edit, 
  MoreHorizontal, 
  Check, 
  Plus,
  FileText,
  ShoppingCart,
  Handshake,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the opportunity
const opportunityData = {
  id: 1,
  code: "OP00001",
  title: "Sales for Dat Phat Company Ltd",
  value: "5,000,000",
  currency: "VND",
  contact: "Nguyen Ngoc Anh",
  customer: "Dat Phat Company Ltd",
  opportunityName: "Sales for Dat Phat Company Ltd",
  opportunityType: "New Customer",
  stage: "Closed Won",
  successRate: 100,
  expectedRevenue: "5,000,000",
  expectedCloseDate: "10/06/2021",
  source: "Sales Rep Search",
  winLossReason: "Company Brand Trust",
  decisionPerson: "Tran Van Minh",
  position: "CEO",
  // Extended field values (keyed by custom field id)
  customFields: {
    "industry": "Viễn thông",
    "company-size": "51-200",
    "competitor": "VNPT, FPT Telecom",
  } as Record<string, string>,
};

const leadActivities = [
  { id: "l1", type: "call", title: "Discovery call", description: "Discussed requirements and budget", author: "John Smith", date: "01/15/2024", source: "lead" as const },
  { id: "l2", type: "email", title: "Information sent", description: "Sent product brochure", author: "John Smith", date: "01/13/2024", source: "lead" as const },
  { id: "l3", type: "note", title: "Lead qualified", description: "Budget confirmed, timeline Q1 2024", author: "John Smith", date: "01/12/2024", source: "lead" as const },
];

const oppActivities = [
  { id: "o1", type: "meeting", title: "Proposal presentation", description: "Presented solution to stakeholders", author: "Nguyen Bao Ngoc", date: "06/01/2024", source: "opportunity" as const },
  { id: "o2", type: "call", title: "Follow-up call", description: "Discussed pricing details and contract terms", author: "Nguyen Bao Ngoc", date: "05/28/2024", source: "opportunity" as const },
  { id: "o3", type: "quote", title: "Quotation QT-2024-001 sent", description: "Enterprise Network Package - 5,000,000 VND", author: "Nguyen Bao Ngoc", date: "05/25/2024", source: "opportunity" as const },
  { id: "o4", type: "negotiation", title: "Price negotiation", description: "Customer requested 10% discount, counter-offered 7%", author: "Nguyen Bao Ngoc", date: "05/20/2024", source: "opportunity" as const },
  { id: "o5", type: "email", title: "Contract draft sent", description: "Sent contract for review", author: "Nguyen Bao Ngoc", date: "05/15/2024", source: "opportunity" as const },
];

const sourceLabels: Record<string, { label: string; className: string }> = {
  lead: { label: "From Lead", className: "bg-amber-500/10 text-amber-600 border-amber-200" },
  opportunity: { label: "Opportunity", className: "bg-primary/10 text-primary border-primary/20" },
};

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("detail");
  const { stages: stageList } = useOpportunityStagesStore();
  const { fields: customFieldDefs } = useOpportunityCustomFieldsStore();
  const { types: opportunityTypes } = useOpportunityTypesStore();
  const [activeStage, setActiveStage] = useState("closed-won");
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>(opportunityData.customFields);
  const [activeCustomFieldIds, setActiveCustomFieldIds] = useState<string[]>(Object.keys(opportunityData.customFields));
  const [generalFieldValues, setGeneralFieldValues] = useState<Record<string, string>>({
    customer: opportunityData.customer,
    opportunityName: opportunityData.opportunityName,
    contact: opportunityData.contact,
    opportunityType: opportunityData.opportunityType,
    stage: opportunityData.stage,
    successRate: String(opportunityData.successRate),
    expectedRevenue: opportunityData.expectedRevenue,
    expectedCloseDate: opportunityData.expectedCloseDate,
    source: opportunityData.source,
    winLossReason: opportunityData.winLossReason,
    decisionPerson: opportunityData.decisionPerson,
    position: opportunityData.position,
  });
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const editInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const { activityTypes } = useActivityTypesStore();
  const [activities, setActivities] = useState([...oppActivities, ...leadActivities]);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [activityType, setActivityType] = useState("call");
  const [activityFilter, setActivityFilter] = useState("all");
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const handleAddActivity = (activity: { type: string; title: string; description: string; author: string; date: string }) => {
    setActivities([{ id: String(Date.now()), source: "opportunity" as const, ...activity }, ...activities]);
  };

  const openActivityDialog = (type: string) => {
    setActivityType(type);
    setActivityDialogOpen(true);
  };

  const handleDeleteActivity = (id: string) => {
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

  const startEditField = (fieldId: string, currentValue: string) => {
    setEditingFieldId(fieldId);
    setEditingValue(currentValue || "");
  };

  const saveField = (store: "general" | "custom") => {
    if (editingFieldId) {
      const rawId = editingFieldId.replace(/^(gen_|ext_)/, "");
      if (store === "general") {
        setGeneralFieldValues((prev) => ({ ...prev, [rawId]: editingValue }));
      } else {
        setCustomFieldValues((prev) => ({ ...prev, [rawId]: editingValue }));
      }
      setEditingFieldId(null);
    }
  };

  const cancelEditField = () => {
    setEditingFieldId(null);
  };

  const makeFieldKeyDown = (store: "general" | "custom") => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveField(store);
    } else if (e.key === "Escape") {
      cancelEditField();
    }
  };

  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/opportunities")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{opportunityData.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-primary font-semibold">
                  {opportunityData.value} {opportunityData.currency}
                </span>
                <Button variant="ghost" size="sm" className="h-6 gap-1 text-muted-foreground">
                  <Users className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 gap-1 text-muted-foreground">
                  <Tag className="h-3 w-3" />
                  Add Tag
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Create Order
            </Button>
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Info */}
        <div className="grid grid-cols-5 gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Contact</span>
            <p className="text-primary font-medium mt-1">{opportunityData.contact}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Customer</span>
            <p className="text-primary font-medium mt-1">{opportunityData.customer}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Success Rate (%)</span>
            <p className="font-medium mt-1">{opportunityData.successRate}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Expected Revenue</span>
            <p className="font-medium mt-1">{opportunityData.expectedRevenue}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Expected Close Date</span>
            <p className="font-medium mt-1">{opportunityData.expectedCloseDate}</p>
          </div>
        </div>

        {/* Stage Pipeline */}
        <div className="flex items-center gap-1">
          {stageList.map((stage, index) => {
            const stageIndex = stageList.findIndex((s) => s.id === stage.id);
            const activeIndex = stageList.findIndex((s) => s.id === activeStage);
            const isCompleted = stageIndex <= activeIndex;
            const isActive = stage.id === activeStage;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={cn(
                  "flex-1 h-10 flex items-center justify-center text-sm font-medium relative cursor-pointer transition-colors",
                  isCompleted && !isActive && `${stage.color} text-white`,
                  isActive && `${stage.color} text-white ring-2 ring-offset-1 ring-foreground/20`,
                  !isCompleted && "bg-muted text-muted-foreground hover:bg-muted/80",
                  index === 0 && "rounded-l-lg",
                  index === stageList.length - 1 && "rounded-r-lg"
                )}
                style={{
                  clipPath: index === 0 
                    ? "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)"
                    : index === stageList.length - 1 
                    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)"
                    : "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)"
                }}
              >
                {isCompleted && <Check className="h-4 w-4 mr-1" />}
                <span className="text-xs">{stage.label}</span>
              </div>
            );
          })}
          <div className="ml-4 text-sm text-muted-foreground">
            {opportunityData.expectedCloseDate}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left - Detail Tabs */}
          <div className="col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0">
                {[
                  { value: "detail", label: "Detail Info" },
                  { value: "services", label: "Service/Product" },
                  { value: "notes", label: "Notes" },
                  { value: "attachments", label: "Attachments" },
                  { value: "contacts", label: "Contacts" },
                  { value: "quotation", label: "Quotation" },
                  { value: "negotiation", label: "Negotiation" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="detail" className="mt-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-6">General Information</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {[
                      { key: "customer", label: "Customer", isLink: true },
                      { key: "opportunityName", label: "Opportunity Name" },
                      { key: "contact", label: "Contact", isLink: true },
                      { key: "opportunityType", label: "Opportunity Type", type: "select" as const, options: opportunityTypes.map((t) => t.name) },
                      { key: "stage", label: "Stage", type: "select" as const, options: stageList.map((s) => s.label) },
                      { key: "successRate", label: "Success Rate (%)", type: "number" as const },
                      { key: "expectedRevenue", label: "Expected Revenue" },
                      { key: "expectedCloseDate", label: "Expected Close Date", type: "date" as const },
                      { key: "source", label: "Source" },
                      { key: "winLossReason", label: "Win/Loss Reason" },
                      { key: "decisionPerson", label: "Decision Person" },
                      { key: "position", label: "Position" },
                    ].map((item) => (
                      <div key={item.key} className="flex justify-between items-center py-2 border-b min-h-[40px]">
                        <span className="text-muted-foreground">{item.label}</span>
                        {editingFieldId === `gen_${item.key}` ? (
                          <div className="flex items-center gap-1.5 max-w-[60%]">
                            {item.type === "select" && item.options ? (
                              <UISelect value={editingValue} onValueChange={(v) => { setGeneralFieldValues((prev) => ({ ...prev, [item.key]: v })); setEditingFieldId(null); }}>
                                <UISelectTrigger className="h-8 text-sm w-[180px]">
                                  <UISelectValue placeholder="Chọn..." />
                                </UISelectTrigger>
                                <UISelectContent>
                                  {item.options.map((opt) => (
                                    <UISelectItem key={opt} value={opt}>{opt}</UISelectItem>
                                  ))}
                                </UISelectContent>
                              </UISelect>
                            ) : (
                              <Input
                                type={item.type === "number" ? "number" : item.type === "date" ? "date" : "text"}
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onKeyDown={makeFieldKeyDown("general")}
                                onBlur={() => saveField("general")}
                                className="h-8 text-sm w-[180px]"
                                autoFocus
                              />
                            )}
                          </div>
                        ) : (
                          <span
                            className={cn(
                              "cursor-pointer hover:bg-muted px-2 py-1 rounded transition-colors min-w-[40px] text-right",
                              item.isLink && "text-primary font-medium"
                            )}
                            onClick={() => startEditField(`gen_${item.key}`, generalFieldValues[item.key])}
                            title="Click để chỉnh sửa"
                          >
                            {generalFieldValues[item.key] || <span className="text-muted-foreground/50 italic">Click để nhập...</span>}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Extended Information */}
                <Card className="p-6 mt-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold">Thông tin mở rộng</h3>
                    {(() => {
                      const availableFields = customFieldDefs.filter((f) => !activeCustomFieldIds.includes(f.id));
                      if (availableFields.length === 0) return null;
                      return (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
                              <Plus className="h-3.5 w-3.5" /> Thêm trường
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {availableFields.map((field) => (
                              <DropdownMenuItem
                                key={field.id}
                                onClick={() => setActiveCustomFieldIds((prev) => [...prev, field.id])}
                              >
                                {field.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      );
                    })()}
                  </div>
                  {activeCustomFieldIds.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Chưa có trường mở rộng nào. Nhấn "Thêm trường" để chọn từ danh sách.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                      {activeCustomFieldIds.map((fieldId) => {
                        const field = customFieldDefs.find((f) => f.id === fieldId);
                        if (!field) return null;
                        return (
                          <div key={field.id} className="flex justify-between items-center py-2 border-b group min-h-[40px]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground">{field.label}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  setActiveCustomFieldIds((prev) => prev.filter((id) => id !== field.id));
                                  setCustomFieldValues((prev) => {
                                    const next = { ...prev };
                                    delete next[field.id];
                                    return next;
                                  });
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            {editingFieldId === `ext_${field.id}` ? (
                              <div className="flex items-center gap-1.5 max-w-[60%]">
                                {field.type === "select" && field.options ? (
                                  <UISelect value={editingValue} onValueChange={(v) => { setCustomFieldValues((prev) => ({ ...prev, [field.id]: v })); setEditingFieldId(null); }}>
                                    <UISelectTrigger className="h-8 text-sm w-[180px]">
                                      <UISelectValue placeholder="Chọn..." />
                                    </UISelectTrigger>
                                    <UISelectContent>
                                      {field.options.map((opt) => (
                                        <UISelectItem key={opt} value={opt}>{opt}</UISelectItem>
                                      ))}
                                    </UISelectContent>
                                  </UISelect>
                                ) : field.type === "textarea" ? (
                                  <Textarea
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                    onKeyDown={makeFieldKeyDown("custom")}
                                    onBlur={() => saveField("custom")}
                                    className="h-16 text-sm w-[180px]"
                                    autoFocus
                                  />
                                ) : (
                                  <Input
                                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                    onKeyDown={makeFieldKeyDown("custom")}
                                    onBlur={() => saveField("custom")}
                                    className="h-8 text-sm w-[180px]"
                                    autoFocus
                                  />
                                )}
                              </div>
                            ) : (
                              <span
                                className="cursor-pointer hover:bg-muted px-2 py-1 rounded transition-colors min-w-[40px] text-right"
                                onClick={() => startEditField(`ext_${field.id}`, customFieldValues[field.id])}
                                title="Click để chỉnh sửa"
                              >
                                {customFieldValues[field.id] || <span className="text-muted-foreground/50 italic">Click để nhập...</span>}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <OpportunityServiceProducts />
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <OpportunityNotes />
              </TabsContent>

              <TabsContent value="attachments" className="mt-6">
                <OpportunityAttachments />
              </TabsContent>

              <TabsContent value="contacts" className="mt-6">
                <OpportunityContacts />
              </TabsContent>

              <TabsContent value="quotation" className="mt-6">
                <OpportunityQuotations />
              </TabsContent>

              <TabsContent value="negotiation" className="mt-6">
                <OpportunityNegotiation />
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
                  {[{ id: "quote", name: "Quote" }, { id: "negotiation", name: "Negotiation" }].map((t) => {
                    const count = activities.filter((a) => a.type === t.id).length;
                    return (
                      <Button
                        key={t.id}
                        size="sm"
                        variant={activityFilter === t.id ? "default" : "outline"}
                        className="h-6 text-xs px-2.5 rounded-full"
                        onClick={() => setActivityFilter(t.id)}
                      >
                        {t.name} ({count})
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
                  // For special types (quote, negotiation), use custom icons
                  const isQuote = item.type === "quote";
                  const isNegotiation = item.type === "negotiation";
                  const Icon = isQuote ? FileText : isNegotiation ? Handshake : actType ? iconMap[actType.icon] : null;
                  const color = isQuote ? "bg-success" : isNegotiation ? "bg-info" : actType?.color || "bg-primary/10";
                  const srcInfo = item.source ? sourceLabels[item.source] : null;

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
                                  {srcInfo && (
                                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${srcInfo.className}`}>
                                      {srcInfo.label}
                                    </Badge>
                                  )}
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

      <AddActivityDialog
        open={activityDialogOpen}
        onOpenChange={setActivityDialogOpen}
        type={activityType}
        onAdd={handleAddActivity}
      />
    </MainLayout>
  );
};

export default OpportunityDetail;
