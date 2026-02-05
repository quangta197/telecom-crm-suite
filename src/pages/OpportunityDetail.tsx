import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Users, 
  Tag, 
  Edit, 
  MoreHorizontal, 
  Check, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Mail,
  FileText,
  ShoppingCart
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
  successRate: 100,
  expectedRevenue: "5,000,000",
  expectedCloseDate: "10/06/2021",
  stage: "Closed Won",
  opportunityName: "Sales for Dat Phat Company Ltd",
  opportunityType: "New Customer",
  productType: "MeInvoice",
  amount: "5,000,000",
  source: "Sales Rep Search",
  campaign: "-",
  project: "-",
  salesProject: "Sales Project",
  winLossReason: "Company Brand Trust",
  expectedSpend: "1,000,000",
};

const stages = [
  { id: "discovery", label: "Discovery", completed: true },
  { id: "qualification", label: "Qualification", completed: true },
  { id: "proposal", label: "Proposal", completed: true },
  { id: "negotiation", label: "Negotiation", completed: true },
  { id: "closed_won", label: "Closed Won", completed: true, active: true },
  { id: "closed_lost", label: "Closed Lost", completed: false },
];

const activityItems = [
  {
    id: "1",
    code: "DH02345646",
    date: "05/09/2019",
    description: "Order for A Chau Bank",
    amount: "50,000,000",
    status: "Not Executed",
    detailDescription: "-",
    executor: "Nguyen Bao Ngoc",
    type: "order",
  },
  {
    id: "2",
    code: "BG12031515",
    date: "05/09/2019",
    description: "",
    amount: "20,000,000",
    status: "Not Approved",
    detailDescription: "-",
    executor: "Nguyen Bao Ngoc",
    type: "quote",
  },
  {
    id: "3",
    code: "Opportunity for MISA Corp",
    date: "04/09/2019",
    description: "",
    productType: "AMIS.VN",
    amount: "3,000,000",
    stage: "Training Deployment",
    detailDescription: "-",
    executor: "Nguyen Bao Ngoc",
    type: "opportunity",
  },
];

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("detail");
  const [activityTab, setActivityTab] = useState("opportunity");

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
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={cn(
                "flex-1 h-10 flex items-center justify-center text-sm font-medium relative",
                stage.completed && !stage.active && "bg-green-500 text-white",
                stage.active && "bg-green-600 text-white",
                !stage.completed && !stage.active && "bg-muted text-muted-foreground",
                index === 0 && "rounded-l-lg",
                index === stages.length - 1 && "rounded-r-lg"
              )}
              style={{
                clipPath: index === 0 
                  ? "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)"
                  : index === stages.length - 1 
                  ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)"
                  : "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)"
              }}
            >
              {stage.completed && <Check className="h-4 w-4 mr-1" />}
              <span className="text-xs">{stage.label}</span>
            </div>
          ))}
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
                <TabsTrigger 
                  value="detail" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Detail Info
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="notes" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Notes
                </TabsTrigger>
                <TabsTrigger 
                  value="attachments" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Attachments
                </TabsTrigger>
                <TabsTrigger 
                  value="contacts" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Contacts
                </TabsTrigger>
                <TabsTrigger 
                  value="in-progress" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="detail" className="mt-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-6">General Information</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Customer</span>
                      <span className="text-primary font-medium">{opportunityData.customer}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Contact</span>
                      <span className="text-primary font-medium">{opportunityData.contact}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Opportunity Name</span>
                      <span>{opportunityData.opportunityName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Opportunity Type</span>
                      <span>{opportunityData.opportunityType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Product Type</span>
                      <span>{opportunityData.productType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Amount</span>
                      <span>{opportunityData.amount}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Stage</span>
                      <span>{opportunityData.stage}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Success Rate (%)</span>
                      <span>{opportunityData.successRate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Expected Revenue</span>
                      <span>{opportunityData.expectedRevenue}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Expected Close Date</span>
                      <span>{opportunityData.expectedCloseDate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Source</span>
                      <span>{opportunityData.source}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Campaign</span>
                      <span>{opportunityData.campaign}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Belongs to Project</span>
                      <span>{opportunityData.project}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Sales Project</span>
                      <span>{opportunityData.salesProject}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Win/Loss Reason</span>
                      <span>{opportunityData.winLossReason}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Expected Spend</span>
                      <span>{opportunityData.expectedSpend}</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center py-8">No orders yet</p>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center py-8">No notes yet</p>
                </Card>
              </TabsContent>

              <TabsContent value="attachments" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center py-8">No attachments yet</p>
                </Card>
              </TabsContent>

              <TabsContent value="contacts" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center py-8">No contacts yet</p>
                </Card>
              </TabsContent>

              <TabsContent value="in-progress" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center py-8">No tasks in progress</p>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground text-center py-8">No completed tasks</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right - Activity Sidebar */}
          <div className="col-span-1">
            <Card className="p-0 overflow-hidden">
              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 p-3 border-b">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setActivityTab("opportunity")}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium border-b-2 transition-colors",
                    activityTab === "opportunity" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  Opportunity
                </button>
                <button
                  onClick={() => setActivityTab("customer")}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium border-b-2 transition-colors",
                    activityTab === "customer" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  Customer
                </button>
                <button
                  onClick={() => setActivityTab("purchase")}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium border-b-2 transition-colors",
                    activityTab === "purchase" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  Purchase
                </button>
              </div>

              {/* Activity Subtabs */}
              <div className="flex border-b text-xs">
                <button className="flex-1 py-2 border-b-2 border-primary text-primary font-medium">
                  Activity
                </button>
                <button className="flex-1 py-2 text-muted-foreground hover:text-foreground">
                  Purchase
                </button>
              </div>

              {/* Activity List */}
              <div className="max-h-[500px] overflow-y-auto">
                {activityItems.map((item) => (
                  <div key={item.id} className="p-4 border-b hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className={cn(
                          "text-xs",
                          item.type === "order" && "bg-amber-100 text-amber-700",
                          item.type === "quote" && "bg-green-100 text-green-700",
                          item.type === "opportunity" && "bg-blue-100 text-blue-700"
                        )}>
                          {item.type === "order" && <ShoppingCart className="h-4 w-4" />}
                          {item.type === "quote" && <FileText className="h-4 w-4" />}
                          {item.type === "opportunity" && "CH"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-primary">{item.code}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                        
                        {item.description && (
                          <div className="mt-2 text-xs">
                            <span className="text-muted-foreground">Description: </span>
                            <span>{item.description}</span>
                          </div>
                        )}
                        
                        {item.productType && (
                          <div className="mt-1 text-xs">
                            <span className="text-muted-foreground">Product Type: </span>
                            <span>{item.productType}</span>
                          </div>
                        )}
                        
                        <div className="mt-1 text-xs">
                          <span className="text-muted-foreground">Amount: </span>
                          <span>{item.amount}</span>
                        </div>
                        
                        {item.status && (
                          <div className="mt-1 text-xs">
                            <span className="text-muted-foreground">Status: </span>
                            <span>{item.status}</span>
                          </div>
                        )}
                        
                        {item.stage && (
                          <div className="mt-1 text-xs">
                            <span className="text-muted-foreground">Stage: </span>
                            <span>{item.stage}</span>
                          </div>
                        )}
                        
                        <div className="mt-1 text-xs">
                          <span className="text-muted-foreground">Executor: </span>
                          <span>{item.executor}</span>
                        </div>
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

export default OpportunityDetail;
