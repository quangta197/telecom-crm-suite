 import { MainLayout } from "@/components/layout/MainLayout";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Card } from "@/components/ui/card";
 import { Progress } from "@/components/ui/progress";
 import { Plus, Search, Filter, MoreHorizontal, Building2, DollarSign, Calendar, User } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 const stages = [
   { id: "approach", name: "Tiếp cận", color: "bg-info" },
   { id: "evaluate", name: "Đánh giá", color: "bg-primary" },
   { id: "propose", name: "Đề xuất", color: "bg-accent" },
   { id: "negotiate", name: "Đàm phán", color: "bg-warning" },
   { id: "close", name: "Chốt đơn", color: "bg-success" },
 ];
 
 const opportunities = [
   {
     id: 1,
     title: "Hạ tầng mạng VNPT",
     company: "VNPT Hà Nội",
     value: "3.2 tỷ",
     stage: "negotiate",
     probability: 75,
     closeDate: "15/01/2024",
     owner: "Nguyễn Văn A",
   },
   {
     id: 2,
     title: "Data Center Viettel",
     company: "Viettel Business",
     value: "5.8 tỷ",
     stage: "propose",
     probability: 60,
     closeDate: "22/01/2024",
     owner: "Trần Thị B",
   },
   {
     id: 3,
     title: "Cloud Migration FPT",
     company: "FPT Telecom",
     value: "2.1 tỷ",
     stage: "evaluate",
     probability: 45,
     closeDate: "30/01/2024",
     owner: "Lê Văn C",
   },
   {
     id: 4,
     title: "5G Enterprise CMC",
     company: "CMC Telecom",
     value: "4.5 tỷ",
     stage: "negotiate",
     probability: 80,
     closeDate: "10/02/2024",
     owner: "Nguyễn Văn A",
   },
   {
     id: 5,
     title: "IoT Platform MobiFone",
     company: "MobiFone",
     value: "1.8 tỷ",
     stage: "approach",
     probability: 30,
     closeDate: "28/02/2024",
     owner: "Phạm Văn D",
   },
   {
     id: 6,
     title: "Security Solution BIDV",
     company: "BIDV Securities",
     value: "2.5 tỷ",
     stage: "close",
     probability: 95,
     closeDate: "05/01/2024",
     owner: "Trần Thị B",
   },
 ];
 
 const Opportunities = () => {
   const getOpportunitiesByStage = (stageId: string) =>
     opportunities.filter((opp) => opp.stage === stageId);
 
   return (
     <MainLayout>
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold">Cơ hội</h1>
             <p className="text-muted-foreground">
               Quản lý pipeline bán hàng theo giai đoạn
             </p>
           </div>
           <Button className="gradient-primary">
             <Plus className="mr-2 h-4 w-4" />
             Thêm cơ hội
           </Button>
         </div>
 
         {/* Filters */}
         <div className="flex items-center gap-4">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input placeholder="Tìm kiếm cơ hội..." className="pl-10" />
           </div>
           <Button variant="outline">
             <Filter className="mr-2 h-4 w-4" />
             Bộ lọc
           </Button>
         </div>
 
         {/* Kanban Board */}
         <div className="flex gap-4 overflow-x-auto pb-4">
           {stages.map((stage) => {
             const stageOpps = getOpportunitiesByStage(stage.id);
             const totalValue = stageOpps.reduce((sum, opp) => {
               const value = parseFloat(opp.value.replace(" tỷ", ""));
               return sum + value;
             }, 0);
 
             return (
               <div key={stage.id} className="flex-shrink-0 w-80">
                 <div className="rounded-t-lg bg-secondary p-3">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <div className={cn("h-3 w-3 rounded-full", stage.color)} />
                       <span className="font-semibold">{stage.name}</span>
                       <span className="text-sm text-muted-foreground">
                         ({stageOpps.length})
                       </span>
                     </div>
                     <span className="text-sm font-medium text-muted-foreground">
                       {totalValue.toFixed(1)} tỷ
                     </span>
                   </div>
                 </div>
                 <div className="space-y-3 bg-secondary/30 rounded-b-lg p-3 min-h-[500px]">
                   {stageOpps.map((opp) => (
                     <Card
                       key={opp.id}
                       className="p-4 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer"
                     >
                       <div className="flex items-start justify-between mb-3">
                         <p className="font-semibold text-sm">{opp.title}</p>
                         <Button variant="ghost" size="icon" className="h-6 w-6">
                           <MoreHorizontal className="h-4 w-4" />
                         </Button>
                       </div>
                       <div className="space-y-2 text-sm">
                         <div className="flex items-center gap-2 text-muted-foreground">
                           <Building2 className="h-3 w-3" />
                           {opp.company}
                         </div>
                         <div className="flex items-center gap-2 text-primary font-semibold">
                           <DollarSign className="h-3 w-3" />
                           {opp.value}
                         </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                           <Calendar className="h-3 w-3" />
                           {opp.closeDate}
                         </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                           <User className="h-3 w-3" />
                           {opp.owner}
                         </div>
                       </div>
                       <div className="mt-3 pt-3 border-t">
                         <div className="flex items-center justify-between text-xs mb-1">
                           <span className="text-muted-foreground">Xác suất</span>
                           <span className="font-medium">{opp.probability}%</span>
                         </div>
                         <Progress value={opp.probability} className="h-1.5" />
                       </div>
                     </Card>
                   ))}
                 </div>
               </div>
             );
           })}
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Opportunities;