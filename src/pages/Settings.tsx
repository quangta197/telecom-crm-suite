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
    { id: 1, name: "Hot", color: "bg-red-500", description: "Lead có tiềm năng cao" },
    { id: 2, name: "Warm", color: "bg-orange-500", description: "Lead đang quan tâm" },
    { id: 3, name: "Cold", color: "bg-blue-500", description: "Lead cần nuôi dưỡng" },
  ],
  opportunity: [
    { id: 1, name: "Discovery", color: "bg-slate-500", description: "Đang tìm hiểu nhu cầu" },
    { id: 2, name: "Qualification", color: "bg-blue-500", description: "Đánh giá khả năng" },
    { id: 3, name: "Proposal", color: "bg-yellow-500", description: "Đã gửi đề xuất" },
    { id: 4, name: "Negotiation", color: "bg-orange-500", description: "Đang đàm phán" },
    { id: 5, name: "Closed Won", color: "bg-green-500", description: "Thắng hợp đồng" },
    { id: 6, name: "Closed Lost", color: "bg-red-500", description: "Mất cơ hội" },
  ],
  project: [
    { id: 1, name: "Draft", color: "bg-slate-500", description: "Bản nháp" },
    { id: 2, name: "Pending Approval", color: "bg-yellow-500", description: "Chờ phê duyệt" },
    { id: 3, name: "Approved", color: "bg-blue-500", description: "Đã phê duyệt" },
    { id: 4, name: "Sent", color: "bg-green-500", description: "Đã gửi khách hàng" },
    { id: 5, name: "Rejected", color: "bg-red-500", description: "Bị từ chối" },
  ],
  task: [
    { id: 1, name: "To Do", color: "bg-slate-500", description: "Chưa bắt đầu" },
    { id: 2, name: "In Progress", color: "bg-blue-500", description: "Đang thực hiện" },
    { id: 3, name: "Completed", color: "bg-green-500", description: "Hoàn thành" },
    { id: 4, name: "Cancelled", color: "bg-red-500", description: "Đã hủy" },
  ],
};

const colorOptions = [
  { value: "bg-slate-500", label: "Xám" },
  { value: "bg-red-500", label: "Đỏ" },
  { value: "bg-orange-500", label: "Cam" },
  { value: "bg-yellow-500", label: "Vàng" },
  { value: "bg-green-500", label: "Xanh lá" },
  { value: "bg-blue-500", label: "Xanh dương" },
  { value: "bg-purple-500", label: "Tím" },
  { value: "bg-pink-500", label: "Hồng" },
];

export default function Settings() {
  const { templates, reorderTemplates: setTemplates, setDefault } = useQuotationTemplatesStore();
  const [statuses, setStatuses] = useState(initialStatuses);
  const [selectedStatusType, setSelectedStatusType] = useState<keyof typeof initialStatuses>("lead");
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const statusTypeLabels = {
    lead: "Tiềm năng (Lead)",
    opportunity: "Cơ hội",
    project: "Dự án",
    task: "Nhiệm vụ",
  };

  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cài đặt</h1>
          <p className="text-muted-foreground">Thiết lập các định nghĩa và cấu hình hệ thống CRM</p>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="templates" className="gap-2">
              <FileText className="h-4 w-4" />
              Biểu mẫu chào giá
            </TabsTrigger>
            <TabsTrigger value="statuses" className="gap-2">
              <Tags className="h-4 w-4" />
              Trạng thái
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <Activity className="h-4 w-4" />
              Loại hoạt động
            </TabsTrigger>
            <TabsTrigger value="leadStages" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Lead Stages
            </TabsTrigger>
            <TabsTrigger value="oppStages" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Opportunity Stages
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
          </TabsList>

          {/* Quotation Templates Tab */}
          <TabsContent value="templates">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Biểu mẫu chào giá</CardTitle>
                  <CardDescription>Quản lý các mẫu báo giá dùng trong hệ thống</CardDescription>
                </div>
                <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Thêm biểu mẫu
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thêm biểu mẫu mới</DialogTitle>
                      <DialogDescription>Tạo mẫu báo giá mới cho hệ thống</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="templateName">Tên biểu mẫu</Label>
                        <Input id="templateName" placeholder="Nhập tên biểu mẫu" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="templateDesc">Mô tả</Label>
                        <Textarea id="templateDesc" placeholder="Mô tả ngắn về biểu mẫu" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>Hủy</Button>
                      <Button onClick={() => setTemplateDialogOpen(false)}>Lưu biểu mẫu</Button>
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
                  💡 Kéo thả để sắp xếp thứ tự hiển thị của các biểu mẫu
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Definitions Tab */}
          <TabsContent value="statuses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Định nghĩa trạng thái</CardTitle>
                  <CardDescription>Quản lý các trạng thái cho từng loại đối tượng trong CRM</CardDescription>
                </div>
                <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Thêm trạng thái
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thêm trạng thái mới</DialogTitle>
                      <DialogDescription>Tạo trạng thái mới cho {statusTypeLabels[selectedStatusType]}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="statusName">Tên trạng thái</Label>
                        <Input id="statusName" placeholder="Nhập tên trạng thái" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="statusColor">Màu sắc</Label>
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
                        <Label htmlFor="statusDesc">Mô tả</Label>
                        <Input id="statusDesc" placeholder="Mô tả ngắn về trạng thái" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>Hủy</Button>
                      <Button onClick={() => setStatusDialogOpen(false)}>Lưu trạng thái</Button>
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
                  💡 Kéo thả để sắp xếp thứ tự hiển thị của các trạng thái trong pipeline
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
        </Tabs>
      </div>
    </MainLayout>
  );
}
