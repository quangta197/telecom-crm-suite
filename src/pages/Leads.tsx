 import { MainLayout } from "@/components/layout/MainLayout";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Badge } from "@/components/ui/badge";
 import { Card } from "@/components/ui/card";
 import { Plus, Search, Filter, MoreHorizontal, User, Building2, Phone, Calendar } from "lucide-react";
 
 const leads = [
   {
     id: 1,
     name: "Hoàng Minh Tuấn",
     company: "NetNam Corporation",
     source: "Website",
     score: 85,
     status: "Nóng",
     createdAt: "12/01/2024",
   },
   {
     id: 2,
     name: "Nguyễn Thị Lan",
     company: "VietnamWorks",
     source: "Sự kiện",
     score: 72,
     status: "Ấm",
     createdAt: "10/01/2024",
   },
   {
     id: 3,
     name: "Trần Đức Anh",
     company: "BIDV Securities",
     source: "Giới thiệu",
     score: 90,
     status: "Nóng",
     createdAt: "08/01/2024",
   },
   {
     id: 4,
     name: "Lê Văn Hùng",
     company: "Techcombank",
     source: "Cold call",
     score: 45,
     status: "Lạnh",
     createdAt: "05/01/2024",
   },
   {
     id: 5,
     name: "Phạm Thị Mai",
     company: "Vingroup",
     source: "LinkedIn",
     score: 68,
     status: "Ấm",
     createdAt: "03/01/2024",
   },
   {
     id: 6,
     name: "Đặng Quốc Việt",
     company: "Samsung Vietnam",
     source: "Website",
     score: 78,
     status: "Ấm",
     createdAt: "02/01/2024",
   },
 ];
 
 const statusColors = {
   "Nóng": "bg-destructive/10 text-destructive border-destructive/20",
   "Ấm": "bg-warning/10 text-warning border-warning/20",
   "Lạnh": "bg-info/10 text-info border-info/20",
 };
 
 const Leads = () => {
   return (
     <MainLayout>
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold">Tiềm năng</h1>
             <p className="text-muted-foreground">
               Theo dõi và chuyển đổi khách hàng tiềm năng
             </p>
           </div>
           <Button className="gradient-primary">
             <Plus className="mr-2 h-4 w-4" />
             Thêm tiềm năng
           </Button>
         </div>
 
         {/* Filters */}
         <div className="flex items-center gap-4">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input placeholder="Tìm kiếm tiềm năng..." className="pl-10" />
           </div>
           <Button variant="outline">
             <Filter className="mr-2 h-4 w-4" />
             Bộ lọc
           </Button>
         </div>
 
         {/* Lead Cards */}
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
           {leads.map((lead) => (
             <Card
               key={lead.id}
               className="p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
             >
               <div className="flex items-start justify-between mb-4">
                 <div className="flex items-center gap-3">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                     <User className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <p className="font-semibold">{lead.name}</p>
                     <div className="flex items-center gap-1 text-sm text-muted-foreground">
                       <Building2 className="h-3 w-3" />
                       {lead.company}
                     </div>
                   </div>
                 </div>
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                   <MoreHorizontal className="h-4 w-4" />
                 </Button>
               </div>
 
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <Badge
                     variant="outline"
                     className={statusColors[lead.status as keyof typeof statusColors]}
                   >
                     {lead.status}
                   </Badge>
                   <div className="flex items-center gap-2">
                     <div className="text-sm font-medium">Điểm: </div>
                     <div
                       className={`text-sm font-bold ${
                         lead.score >= 80
                           ? "text-success"
                           : lead.score >= 60
                           ? "text-warning"
                           : "text-muted-foreground"
                       }`}
                     >
                       {lead.score}
                     </div>
                   </div>
                 </div>
 
                 <div className="flex items-center justify-between text-sm text-muted-foreground">
                   <span>Nguồn: {lead.source}</span>
                   <div className="flex items-center gap-1">
                     <Calendar className="h-3 w-3" />
                     {lead.createdAt}
                   </div>
                 </div>
 
                 <div className="pt-3 border-t flex gap-2">
                   <Button variant="outline" size="sm" className="flex-1">
                     <Phone className="mr-1 h-3 w-3" />
                     Gọi điện
                   </Button>
                   <Button size="sm" className="flex-1 gradient-primary">
                     Chuyển đổi
                   </Button>
                 </div>
               </div>
             </Card>
           ))}
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Leads;