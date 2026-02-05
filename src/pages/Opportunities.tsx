 import { useState } from "react";
 import { MainLayout } from "@/components/layout/MainLayout";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
 import { Plus, MoreHorizontal } from "lucide-react";
 import { Checkbox } from "@/components/ui/checkbox";
 import { Progress } from "@/components/ui/progress";
 
 const opportunities = [
   {
     id: 1,
     code: "CH00001",
     title: "Hạ tầng mạng VNPT",
     company: "VNPT Hà Nội",
     value: "3.2 tỷ",
     stage: "Đàm phán",
     probability: 75,
     closeDate: "15/01/2024",
     owner: "Nguyễn Văn A",
   },
   {
     id: 2,
     code: "CH00002",
     title: "Data Center Viettel",
     company: "Viettel Business",
     value: "5.8 tỷ",
     stage: "Đề xuất",
     probability: 60,
     closeDate: "22/01/2024",
     owner: "Trần Thị B",
   },
   {
     id: 3,
     code: "CH00003",
     title: "Cloud Migration FPT",
     company: "FPT Telecom",
     value: "2.1 tỷ",
     stage: "Đánh giá",
     probability: 45,
     closeDate: "30/01/2024",
     owner: "Lê Văn C",
   },
   {
     id: 4,
     code: "CH00004",
     title: "5G Enterprise CMC",
     company: "CMC Telecom",
     value: "4.5 tỷ",
     stage: "Đàm phán",
     probability: 80,
     closeDate: "10/02/2024",
     owner: "Nguyễn Văn A",
   },
   {
     id: 5,
     code: "CH00005",
     title: "IoT Platform MobiFone",
     company: "MobiFone",
     value: "1.8 tỷ",
     stage: "Tiếp cận",
     probability: 30,
     closeDate: "28/02/2024",
     owner: "Phạm Văn D",
   },
   {
     id: 6,
     code: "CH00006",
     title: "Security Solution BIDV",
     company: "BIDV Securities",
     value: "2.5 tỷ",
     stage: "Chốt đơn",
     probability: 95,
     closeDate: "05/01/2024",
     owner: "Trần Thị B",
   },
 ];
 
 const stageColors: Record<string, string> = {
   "Tiếp cận": "bg-info/10 text-info",
   "Đánh giá": "bg-primary/10 text-primary",
   "Đề xuất": "bg-accent/10 text-accent",
   "Đàm phán": "bg-warning/10 text-warning",
   "Chốt đơn": "bg-success/10 text-success",
 };
 
 const filterOptions = [
   { id: "code", label: "Mã cơ hội" },
   { id: "title", label: "Tên cơ hội" },
   { id: "company", label: "Khách hàng" },
   { id: "value", label: "Giá trị" },
   { id: "stage", label: "Giai đoạn" },
   { id: "owner", label: "Người phụ trách" },
 ];
 
 const savedFilters = ["Cơ hội đang đàm phán", "Cơ hội tháng này"];
 
 const Opportunities = () => {
   const [selectedRows, setSelectedRows] = useState<number[]>([]);
 
   const toggleRow = (id: number) => {
     setSelectedRows((prev) =>
       prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
     );
   };
 
   const toggleAll = () => {
     if (selectedRows.length === opportunities.length) {
       setSelectedRows([]);
     } else {
       setSelectedRows(opportunities.map((o) => o.id));
     }
   };
 
   return (
     <MainLayout
       filterTitle="Tất cả cơ hội"
       filters={filterOptions}
       savedFilters={savedFilters}
     >
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <h1 className="text-xl font-bold">Tất cả cơ hội</h1>
           <Button className="gradient-primary">
             <Plus className="mr-2 h-4 w-4" />
             Thêm
           </Button>
         </div>
 
         {/* Table */}
         <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
           <Table>
             <TableHeader>
               <TableRow className="bg-muted/50">
                 <TableHead className="w-12">
                   <Checkbox
                     checked={selectedRows.length === opportunities.length}
                     onCheckedChange={toggleAll}
                   />
                 </TableHead>
                 <TableHead>Mã CH</TableHead>
                 <TableHead>Tên cơ hội</TableHead>
                 <TableHead>Khách hàng</TableHead>
                 <TableHead>Giá trị</TableHead>
                 <TableHead>Giai đoạn</TableHead>
                 <TableHead>Xác suất</TableHead>
                 <TableHead>Ngày chốt</TableHead>
                 <TableHead>Người PT</TableHead>
                 <TableHead className="w-12"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {opportunities.map((opp) => (
                 <TableRow
                   key={opp.id}
                   className={`hover:bg-muted/50 cursor-pointer ${
                     selectedRows.includes(opp.id) ? "bg-primary/5" : ""
                   }`}
                 >
                   <TableCell>
                     <Checkbox
                       checked={selectedRows.includes(opp.id)}
                       onCheckedChange={() => toggleRow(opp.id)}
                     />
                   </TableCell>
                   <TableCell className="font-mono text-sm">{opp.code}</TableCell>
                   <TableCell className="font-medium text-primary hover:underline">
                     {opp.title}
                   </TableCell>
                   <TableCell>{opp.company}</TableCell>
                   <TableCell className="font-semibold text-primary">
                     {opp.value}
                   </TableCell>
                   <TableCell>
                     <Badge variant="secondary" className={stageColors[opp.stage]}>
                       {opp.stage}
                     </Badge>
                   </TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <Progress value={opp.probability} className="h-2 w-16" />
                       <span className="text-sm">{opp.probability}%</span>
                     </div>
                   </TableCell>
                   <TableCell>{opp.closeDate}</TableCell>
                   <TableCell>{opp.owner}</TableCell>
                   <TableCell>
                     <Button variant="ghost" size="icon">
                       <MoreHorizontal className="h-4 w-4" />
                     </Button>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
 
           {/* Footer */}
           <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <span>Tổng: {opportunities.length}</span>
             </div>
             <div className="flex items-center gap-2 text-sm">
               <span className="text-muted-foreground">1 đến {opportunities.length}</span>
             </div>
           </div>
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Opportunities;