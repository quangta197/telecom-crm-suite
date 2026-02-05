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
 import { Plus, MoreHorizontal, Phone } from "lucide-react";
 import { Checkbox } from "@/components/ui/checkbox";
 
 const leads = [
   {
     id: 1,
     code: "TN00001",
     name: "Hoàng Minh Tuấn",
     company: "NetNam Corporation",
     phone: "0912 345 678",
     source: "Website",
     score: 85,
     status: "Nóng",
     createdAt: "12/01/2024",
   },
   {
     id: 2,
     code: "TN00002",
     name: "Nguyễn Thị Lan",
     company: "VietnamWorks",
     phone: "0987 654 321",
     source: "Sự kiện",
     score: 72,
     status: "Ấm",
     createdAt: "10/01/2024",
   },
   {
     id: 3,
     code: "TN00003",
     name: "Trần Đức Anh",
     company: "BIDV Securities",
     phone: "0909 123 456",
     source: "Giới thiệu",
     score: 90,
     status: "Nóng",
     createdAt: "08/01/2024",
   },
   {
     id: 4,
     code: "TN00004",
     name: "Lê Văn Hùng",
     company: "Techcombank",
     phone: "0918 765 432",
     source: "Cold call",
     score: 45,
     status: "Lạnh",
     createdAt: "05/01/2024",
   },
   {
     id: 5,
     code: "TN00005",
     name: "Phạm Thị Mai",
     company: "Vingroup",
     phone: "0923 456 789",
     source: "LinkedIn",
     score: 68,
     status: "Ấm",
     createdAt: "03/01/2024",
   },
   {
     id: 6,
     code: "TN00006",
     name: "Đặng Quốc Việt",
     company: "Samsung Vietnam",
     phone: "0934 567 890",
     source: "Website",
     score: 78,
     status: "Ấm",
     createdAt: "02/01/2024",
   },
 ];
 
 const statusColors = {
   "Nóng": "bg-destructive/10 text-destructive",
   "Ấm": "bg-warning/10 text-warning",
   "Lạnh": "bg-info/10 text-info",
 };
 
 const filterOptions = [
   { id: "code", label: "Mã tiềm năng" },
   { id: "name", label: "Tên tiềm năng" },
   { id: "company", label: "Công ty" },
   { id: "phone", label: "Điện thoại" },
   { id: "source", label: "Nguồn" },
   { id: "status", label: "Trạng thái" },
 ];
 
 const savedFilters = ["Tiềm năng nóng", "Tiềm năng tuần này"];
 
 const Leads = () => {
   const [selectedRows, setSelectedRows] = useState<number[]>([]);
 
   const toggleRow = (id: number) => {
     setSelectedRows((prev) =>
       prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
     );
   };
 
   const toggleAll = () => {
     if (selectedRows.length === leads.length) {
       setSelectedRows([]);
     } else {
       setSelectedRows(leads.map((l) => l.id));
     }
   };
 
   const getScoreColor = (score: number) => {
     if (score >= 80) return "text-success";
     if (score >= 50) return "text-warning";
     return "text-destructive";
   };
 
   return (
     <MainLayout
       filterTitle="Tất cả tiềm năng"
       filters={filterOptions}
       savedFilters={savedFilters}
     >
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <h1 className="text-xl font-bold">Tất cả tiềm năng</h1>
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
                     checked={selectedRows.length === leads.length}
                     onCheckedChange={toggleAll}
                   />
                 </TableHead>
                 <TableHead>Mã TN</TableHead>
                 <TableHead>Tên tiềm năng</TableHead>
                 <TableHead>Công ty</TableHead>
                 <TableHead>Điện thoại</TableHead>
                 <TableHead>Nguồn</TableHead>
                 <TableHead>Trạng thái</TableHead>
                 <TableHead className="text-right">Điểm</TableHead>
                 <TableHead className="w-12"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {leads.map((lead) => (
                 <TableRow
                   key={lead.id}
                   className={`hover:bg-muted/50 cursor-pointer ${
                     selectedRows.includes(lead.id) ? "bg-primary/5" : ""
                   }`}
                 >
                   <TableCell>
                     <Checkbox
                       checked={selectedRows.includes(lead.id)}
                       onCheckedChange={() => toggleRow(lead.id)}
                     />
                   </TableCell>
                   <TableCell className="font-mono text-sm">{lead.code}</TableCell>
                   <TableCell className="font-medium text-primary hover:underline">
                     {lead.name}
                   </TableCell>
                   <TableCell>{lead.company}</TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <Phone className="h-3.5 w-3.5 text-success" />
                       <span>{lead.phone}</span>
                     </div>
                   </TableCell>
                   <TableCell>{lead.source}</TableCell>
                   <TableCell>
                     <Badge
                       variant="secondary"
                       className={statusColors[lead.status as keyof typeof statusColors]}
                     >
                       {lead.status}
                     </Badge>
                   </TableCell>
                   <TableCell className={`text-right font-semibold ${getScoreColor(lead.score)}`}>
                     {lead.score}
                   </TableCell>
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
               <span>Tổng: {leads.length}</span>
             </div>
             <div className="flex items-center gap-2 text-sm">
               <span className="text-muted-foreground">1 đến {leads.length}</span>
             </div>
           </div>
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Leads;