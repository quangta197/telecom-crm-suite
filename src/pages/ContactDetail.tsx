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
  Edit, 
  MoreHorizontal, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Mail,
  Building2,
  MapPin,
  Globe,
  FileText,
  ShoppingCart,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

const contactData = {
  id: 1,
  code: "CT00015",
  name: "MISA Corporation",
  taxCode: "0102345646",
  phone: "0362 855 655",
  email: "contact@misa.com.vn",
  website: "www.misa.com.vn",
  address: "Pham Hung Street, Cau Giay District, Hanoi",
  industry: "Software & Technology",
  type: "Enterprise",
  smeScore: 90,
  revenue: "$5,000,000",
  employees: "500+",
  foundedYear: "1994",
  primaryContact: "Nguyen Van A",
  primaryContactPhone: "0912 345 678",
  primaryContactEmail: "nguyenvana@misa.com.vn",
  accountManager: "John Smith",
  createdAt: "01/01/2020",
  lastActivity: "01/15/2024",
};

const opportunities = [
  { id: 1, code: "OP00001", title: "ERP Implementation", value: "$150,000", stage: "Negotiation", date: "01/15/2024" },
  { id: 2, code: "OP00002", title: "Cloud Migration", value: "$80,000", stage: "Proposal", date: "01/10/2024" },
];

const orders = [
  { id: 1, code: "ORD001", title: "Annual License Renewal", value: "$25,000", status: "Completed", date: "12/01/2023" },
  { id: 2, code: "ORD002", title: "Support Package", value: "$5,000", status: "Active", date: "01/01/2024" },
];

const activities = [
  { id: 1, type: "call", title: "Follow-up call", description: "Discussed renewal terms", author: "John Smith", date: "01/15/2024" },
  { id: 2, type: "email", title: "Proposal sent", description: "Sent cloud migration proposal", author: "Sarah Johnson", date: "01/12/2024" },
  { id: 3, type: "meeting", title: "Product demo", description: "Demonstrated new features", author: "John Smith", date: "01/10/2024" },
];

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("detail");
  const [activityTab, setActivityTab] = useState("activity");

  return (
    <MainLayout showFilters={false} showActivity={false}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/contacts")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {contactData.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{contactData.name}</h1>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="font-mono">{contactData.code}</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    SME Score: {contactData.smeScore}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Target className="h-4 w-4" />
              Create Opportunity
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
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{contactData.phone}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-primary">{contactData.email}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Industry</p>
                <p className="font-medium">{contactData.industry}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Website</p>
                <p className="font-medium text-primary">{contactData.website}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left - Detail Tabs */}
          <div className="col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0">
                {["detail", "opportunities", "orders", "contacts", "notes", "attachments"].map((tab) => (
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
                  <h3 className="font-semibold mb-6">Company Information</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {[
                      ["Company Name", contactData.name],
                      ["Tax Code", contactData.taxCode],
                      ["Industry", contactData.industry],
                      ["Type", contactData.type],
                      ["Phone", contactData.phone],
                      ["Email", contactData.email, true],
                      ["Website", contactData.website, true],
                      ["Address", contactData.address],
                      ["Annual Revenue", contactData.revenue],
                      ["Employees", contactData.employees],
                      ["Founded", contactData.foundedYear],
                      ["Account Manager", contactData.accountManager],
                    ].map(([label, value, isLink]) => (
                      <div key={label as string} className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={isLink ? "text-primary" : ""}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold mt-8 mb-6">Primary Contact</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {[
                      ["Name", contactData.primaryContact],
                      ["Phone", contactData.primaryContactPhone],
                      ["Email", contactData.primaryContactEmail, true],
                    ].map(([label, value, isLink]) => (
                      <div key={label as string} className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={isLink ? "text-primary" : ""}>{value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="opportunities" className="mt-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    {opportunities.map((opp) => (
                      <div key={opp.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div>
                          <p className="font-medium">{opp.title}</p>
                          <p className="text-sm text-muted-foreground">{opp.code} • {opp.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{opp.value}</p>
                          <Badge variant="secondary">{opp.stage}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div>
                          <p className="font-medium">{order.title}</p>
                          <p className="text-sm text-muted-foreground">{order.code} • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{order.value}</p>
                          <Badge variant="secondary" className={order.status === "Completed" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {["contacts", "notes", "attachments"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-6">
                  <Card className="p-6">
                    <p className="text-muted-foreground text-center py-8">No {tab} yet</p>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Right - Activity Sidebar */}
          <div className="col-span-1">
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-center gap-2 p-3 border-b">
                {[Phone, Calendar, MessageSquare, Mail].map((Icon, i) => (
                  <Button key={i} variant="ghost" size="icon" className="h-9 w-9">
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>

              <div className="flex border-b">
                {["activity", "opportunities", "orders"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivityTab(tab)}
                    className={cn(
                      "flex-1 py-2 text-sm font-medium border-b-2 transition-colors capitalize",
                      activityTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="max-h-[500px] overflow-y-auto">
                {activities.map((item) => (
                  <div key={item.id} className="p-4 border-b hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {item.type === "call" && <Phone className="h-4 w-4" />}
                          {item.type === "email" && <Mail className="h-4 w-4" />}
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
    </MainLayout>
  );
};

export default ContactDetail;
