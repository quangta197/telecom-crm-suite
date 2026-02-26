import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Tags,
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  MoreHorizontal,
  Activity,
  GitBranch,
  Users,
} from "lucide-react";
import { StatusList } from "@/components/settings/StatusList";
import { TemplateList } from "@/components/settings/TemplateList";
import { ActivityTypeSettings } from "@/components/settings/ActivityTypeSettings";
import { LeadStageSettings } from "@/components/settings/LeadStageSettings";
import { OpportunityStageSettings } from "@/components/settings/OpportunityStageSettings";
import { LeadSourceSettings } from "@/components/settings/LeadSourceSettings";
import { ContactRoleSettings } from "@/components/settings/ContactRoleSettings";
import { OpportunityCustomFieldSettings } from "@/components/settings/OpportunityCustomFieldSettings";
import { OpportunityTypeSettings } from "@/components/settings/OpportunityTypeSettings";
import { ProjectTypeSettings } from "@/components/settings/ProjectTypeSettings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useQuotationTemplatesStore } from "@/stores/quotationTemplatesStore";

// Mock data for status definitions
const initialStatuses = {
  lead: [
    { id: 1, name: "Hot", color: "bg-red-500", description: "High potential lead" },
    { id: 2, name: "Warm", color: "bg-orange-500", description: "Interested lead" },
    { id: 3, name: "Cold", color: "bg-blue-500", description: "Needs nurturing" },
  ],
  opportunity: [
    { id: 1, name: "Discovery", color: "bg-slate-500", description: "Exploring needs" },
    { id: 2, name: "Qualification", color: "bg-blue-500", description: "Evaluating fit" },
    { id: 3, name: "Proposal", color: "bg-yellow-500", description: "Proposal sent" },
    { id: 4, name: "Negotiation", color: "bg-orange-500", description: "Negotiating terms" },
    { id: 5, name: "Closed Won", color: "bg-green-500", description: "Deal won" },
    { id: 6, name: "Closed Lost", color: "bg-red-500", description: "Deal lost" },
  ],
  project: [
    { id: 1, name: "Draft", color: "bg-slate-500", description: "Draft stage" },
    { id: 2, name: "Pending Approval", color: "bg-yellow-500", description: "Awaiting approval" },
    { id: 3, name: "Approved", color: "bg-blue-500", description: "Approved" },
    { id: 4, name: "Sent", color: "bg-green-500", description: "Sent to customer" },
    { id: 5, name: "Rejected", color: "bg-red-500", description: "Rejected" },
  ],
  task: [
    { id: 1, name: "To Do", color: "bg-slate-500", description: "Not started" },
    { id: 2, name: "In Progress", color: "bg-blue-500", description: "In progress" },
    { id: 3, name: "Completed", color: "bg-green-500", description: "Completed" },
    { id: 4, name: "Cancelled", color: "bg-red-500", description: "Cancelled" },
  ],
};

const colorOptions = [
  { value: "bg-slate-500", label: "Gray" },
  { value: "bg-red-500", label: "Red" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-pink-500", label: "Pink" },
];

export default function Settings() {
  const { templates, reorderTemplates: setTemplates, setDefault } = useQuotationTemplatesStore();
  const [statuses, setStatuses] = useState(initialStatuses);
  const [selectedStatusType, setSelectedStatusType] = useState<keyof typeof initialStatuses>("lead");
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const statusTypeLabels = {
    lead: "Lead",
    opportunity: "Opportunity",
    project: "Project",
    task: "Task",
  };

  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure definitions and system settings for CRM</p>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="templates" className="gap-2">
              <FileText className="h-4 w-4" />
              Quotation Templates
            </TabsTrigger>
            <TabsTrigger value="statuses" className="gap-2">
              <Tags className="h-4 w-4" />
              Statuses
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <Activity className="h-4 w-4" />
              Activity Types
            </TabsTrigger>
            <TabsTrigger value="leadStages" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Lead Stages
            </TabsTrigger>
            <TabsTrigger value="oppStages" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Opportunity Stages
            </TabsTrigger>
            <TabsTrigger value="oppTypes" className="gap-2">
              <Tags className="h-4 w-4" />
              Opportunity Types
            </TabsTrigger>
            <TabsTrigger value="leadSources" className="gap-2">
              <Tags className="h-4 w-4" />
              Lead Sources
            </TabsTrigger>
            <TabsTrigger value="contactRoles" className="gap-2">
              <Users className="h-4 w-4" />
              Contact Roles
            </TabsTrigger>
            <TabsTrigger value="oppCustomFields" className="gap-2">
              <FileText className="h-4 w-4" />
              Opp. Custom Fields
            </TabsTrigger>
            <TabsTrigger value="projectTypes" className="gap-2">
              <Tags className="h-4 w-4" />
              Project Types
            </TabsTrigger>
          </TabsList>

          {/* Quotation Templates Tab */}
          <TabsContent value="templates">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Quotation Templates</CardTitle>
                  <CardDescription>Manage quotation templates used in the system</CardDescription>
                </div>
                <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Template</DialogTitle>
                      <DialogDescription>Create a new quotation template for the system</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="templateName">Template Name</Label>
                        <Input id="templateName" placeholder="Enter template name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="templateDesc">Description</Label>
                        <Textarea id="templateDesc" placeholder="Short description of the template" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => setTemplateDialogOpen(false)}>Save Template</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <TemplateList
                  templates={templates}
                  onReorder={setTemplates}
                  onSetDefault={(id) => setDefault(id)}
                />
                <p className="text-sm text-muted-foreground mt-4">
                  💡 Drag and drop to reorder template display order
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Definitions Tab */}
          <TabsContent value="statuses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Status Definitions</CardTitle>
                  <CardDescription>Manage statuses for each entity type in CRM</CardDescription>
                </div>
                <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Status
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Status</DialogTitle>
                      <DialogDescription>Create a new status for {statusTypeLabels[selectedStatusType]}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="statusName">Status Name</Label>
                        <Input id="statusName" placeholder="Enter status name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="statusColor">Color</Label>
                        <Select defaultValue="bg-blue-500">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                <div className="flex items-center gap-2">
                                  <div className={`h-4 w-4 rounded ${color.value}`} />
                                  <span>{color.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="statusDesc">Description</Label>
                        <Input id="statusDesc" placeholder="Short description of the status" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => setStatusDialogOpen(false)}>Save Status</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Type Selector */}
                <div className="flex gap-2">
                  {Object.entries(statusTypeLabels).map(([key, label]) => (
                    <Button
                      key={key}
                      variant={selectedStatusType === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatusType(key as keyof typeof initialStatuses)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>

                {/* Status List with Drag and Drop */}
                <StatusList
                  statuses={statuses[selectedStatusType]}
                  onReorder={(newStatuses) => {
                    setStatuses((prev) => ({
                      ...prev,
                      [selectedStatusType]: newStatuses,
                    }));
                  }}
                />

                <p className="text-sm text-muted-foreground">
                  💡 Drag and drop to reorder status display in pipeline
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Activity Types Tab */}
          <TabsContent value="activities">
            <Card>
              <CardContent className="pt-6">
                <ActivityTypeSettings />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunity Stages Tab */}
          <TabsContent value="oppStages">
            <Card>
              <CardContent className="pt-6">
                <OpportunityStageSettings />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunity Types Tab */}
          <TabsContent value="oppTypes">
            <Card>
              <CardContent className="pt-6">
                <OpportunityTypeSettings />
              </CardContent>
            </Card>
          </TabsContent>
          {/* Lead Stages Tab */}
          <TabsContent value="leadStages">
            <Card>
              <CardContent className="pt-6">
                <LeadStageSettings />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lead Sources Tab */}
          <TabsContent value="leadSources">
            <Card>
              <CardContent className="pt-6">
                <LeadSourceSettings />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Roles Tab */}
          <TabsContent value="contactRoles">
            <Card>
              <CardContent className="pt-6">
                <ContactRoleSettings />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunity Custom Fields Tab */}
          <TabsContent value="oppCustomFields">
            <Card>
              <CardContent className="pt-6">
                <OpportunityCustomFieldSettings />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Types Tab */}
          <TabsContent value="projectTypes">
            <Card>
              <CardContent className="pt-6">
                <ProjectTypeSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
