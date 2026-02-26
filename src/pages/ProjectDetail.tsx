import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpportunityServiceProducts } from "@/components/opportunities/OpportunityServiceProducts";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Edit, 
  MoreHorizontal, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Mail,
  FileText,
  Download,
  Send,
  Printer,
  Copy
} from "lucide-react";
import { cn } from "@/lib/utils";

const projectData = {
  id: 1,
  code: "PJ-2024-001",
  title: "VNPT Network Infrastructure Solution",
  customer: "VNPT Hanoi",
  contact: "Nguyen Van B",
  contactEmail: "nguyenvanb@vnpt.vn",
  contactPhone: "0912 456 789",
  value: "$320,000",
  status: "Sent",
  createdAt: "01/12/2024",
  sentAt: "01/14/2024",
  validUntil: "02/12/2024",
  createdBy: "John Smith",
  opportunity: "OP00001 - VNPT Network Infrastructure",
  description: "Comprehensive network infrastructure solution including hardware, software, and implementation services.",
  terms: "Net 30 days",
  warranty: "24 months",
  deliveryTime: "60 days after approval",
};

const lineItems = [
  { id: 1, item: "Network Switches (48-port)", quantity: 20, unitPrice: "$2,500", total: "$50,000" },
  { id: 2, item: "Fiber Optic Cables (1000m)", quantity: 50, unitPrice: "$200", total: "$10,000" },
  { id: 3, item: "Network Routers (Enterprise)", quantity: 5, unitPrice: "$15,000", total: "$75,000" },
  { id: 4, item: "Firewall Appliances", quantity: 2, unitPrice: "$25,000", total: "$50,000" },
  { id: 5, item: "Implementation Services", quantity: 1, unitPrice: "$85,000", total: "$85,000" },
  { id: 6, item: "Training & Support Package", quantity: 1, unitPrice: "$50,000", total: "$50,000" },
];

const statusColors: Record<string, string> = {
  "Draft": "bg-secondary text-secondary-foreground",
  "Pending Approval": "bg-warning/10 text-warning",
  "Approved": "bg-success/10 text-success",
  "Sent": "bg-primary/10 text-primary",
  "Rejected": "bg-destructive/10 text-destructive",
  "Accepted": "bg-success text-success-foreground",
};

const activities = [
  { id: 1, type: "email", title: "Project sent", description: "Sent to customer via email", author: "John Smith", date: "01/14/2024" },
  { id: 2, type: "note", title: "Pricing approved", description: "Internal approval received", author: "Manager", date: "01/13/2024" },
  { id: 3, type: "note", title: "Project created", description: "Initial draft created", author: "John Smith", date: "01/12/2024" },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("detail");

  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/projects")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">{projectData.title}</h1>
                <Badge className={statusColors[projectData.status]}>{projectData.status}</Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="font-mono">{projectData.code}</span>
                <span>•</span>
                <span>{projectData.customer}</span>
                <span>•</span>
                <span className="font-semibold text-primary">{projectData.value}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Send className="h-4 w-4" />
              Send
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

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Customer", value: projectData.customer, icon: FileText },
            { label: "Valid Until", value: projectData.validUntil, icon: Calendar },
            { label: "Created By", value: projectData.createdBy, icon: Mail },
            { label: "Total Value", value: projectData.value, icon: FileText, highlight: true },
          ].map((item, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className={cn("font-medium", item.highlight && "text-primary text-lg")}>{item.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left - Detail Tabs */}
          <div className="col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0">
                {[
                  { value: "detail", label: "Detail Info" },
                  { value: "attachments", label: "Attachment" },
                  { value: "pnl", label: "P&L" },
                  { value: "products", label: "Product/Solution" },
                  { value: "quotation", label: "Quotation" },
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
                  <h3 className="font-semibold mb-6">Project Information</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {[
                      ["Project Code", projectData.code],
                      ["Title", projectData.title],
                      ["Customer", projectData.customer],
                      ["Contact Person", projectData.contact],
                      ["Contact Email", projectData.contactEmail, true],
                      ["Contact Phone", projectData.contactPhone],
                      ["Related Opportunity", projectData.opportunity],
                      ["Status", projectData.status],
                      ["Created Date", projectData.createdAt],
                      ["Sent Date", projectData.sentAt || "-"],
                      ["Valid Until", projectData.validUntil],
                      ["Created By", projectData.createdBy],
                    ].map(([label, value, isLink]) => (
                      <div key={label as string} className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={isLink ? "text-primary" : ""}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold mt-8 mb-4">Description</h3>
                  <p className="text-sm text-muted-foreground">{projectData.description}</p>
                </Card>
              </TabsContent>

              <TabsContent value="attachments" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center py-8">No attachments yet</p>
                </Card>
              </TabsContent>

              <TabsContent value="pnl" className="mt-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Profit & Loss Analysis</h3>
                  <p className="text-muted-foreground text-center py-8">No P&L data available</p>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="mt-6">
                <OpportunityServiceProducts />
              </TabsContent>

              <TabsContent value="quotation" className="mt-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Quotations</h3>
                  <p className="text-muted-foreground text-center py-8">No quotations yet</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right - Activity Sidebar */}
          <div className="col-span-1">
            <Card className="p-0 overflow-hidden">
              <div className="p-3 border-b">
                <h4 className="font-medium text-sm">Activity History</h4>
              </div>

              <div className="max-h-[500px] overflow-y-auto">
                {activities.map((item) => (
                  <div key={item.id} className="p-4 border-b hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {item.type === "email" && <Mail className="h-4 w-4" />}
                          {item.type === "note" && <MessageSquare className="h-4 w-4" />}
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
    </MainLayout>
  );
};

export default ProjectDetail;
