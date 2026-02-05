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
 import { Plus, MoreHorizontal, Eye, Download } from "lucide-react";
 import { Checkbox } from "@/components/ui/checkbox";
 
 const proposals = [
   {
     id: 1,
     code: "CH-2024-001",
     title: "Giải pháp hạ tầng mạng VNPT",
     customer: "VNPT Hà Nội",
     value: "3.2 tỷ",
     status: "Đã gửi",
     createdAt: "12/01/2024",
     validUntil: "12/02/2024",
   },
   {
     id: 2,
     code: "CH-2024-002",
     title: "Data Center Solution Viettel",
     customer: "Viettel Business",
     value: "5.8 tỷ",
     status: "Chờ phê duyệt",
     createdAt: "10/01/2024",
     validUntil: "10/02/2024",
   },
   {
     id: 3,
     code: "CH-2024-003",
     title: "Cloud Migration Package",
     customer: "FPT Telecom",
     value: "2.1 tỷ",
     status: "Đã duyệt",
     createdAt: "08/01/2024",
     validUntil: "08/02/2024",
   },
   {
     id: 4,
     code: "CH-2024-004",
     title: "5G Enterprise Solution",
     customer: "CMC Telecom",
     value: "4.5 tỷ",
     status: "Đã gửi",
     createdAt: "05/01/2024",
     validUntil: "05/02/2024",
   },
   {
     id: 5,
     code: "CH-2024-005",
     title: "IoT Platform Integration",
     customer: "MobiFone",
     value: "1.8 tỷ",
     status: "Nháp",
     createdAt: "03/01/2024",
     validUntil: "03/02/2024",
   },
 ];
 
 const statusColors: Record<string, string> = {
   "Nháp": "bg-secondary text-secondary-foreground",
   "Chờ phê duyệt": "bg-warning/10 text-warning",
   "Đã duyệt": "bg-success/10 text-success",
   "Đã gửi": "bg-primary/10 text-primary",
   "Đã từ chối": "bg-destructive/10 text-destructive",
 };
 
 const filterOptions = [
   { id: "code", label: "Mã chào hàng" },
   { id: "title", label: "Tiêu đề" },
   { id: "customer", label: "Khách hàng" },
   { id: "value", label: "Giá trị" },
   { id: "status", label: "Trạng thái" },
 ];
 
 const savedFilters = ["Chào hàng đã gửi", "Chào hàng tháng này"];
 
 const Proposals = () => {
   const [selectedRows, setSelectedRows] = useState<number[]>([]);
 
   const toggleRow = (id: number) => {
     setSelectedRows((prev) =>
       prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
     );
   };
 
   const toggleAll = () => {
     if (selectedRows.length === proposals.length) {
       setSelectedRows([]);
     } else {
       setSelectedRows(proposals.map((p) => p.id));
     }
   };
 
   return (
     <MainLayout
       filterTitle="Tất cả chào hàng"
       filters={filterOptions}
       savedFilters={savedFilters}
     >
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <h1 className="text-xl font-bold">Tất cả chào hàng</h1>
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
                     checked={selectedRows.length === proposals.length}
                     onCheckedChange={toggleAll}
                   />
                 </TableHead>
                 <TableHead>Mã CH</TableHead>
                 <TableHead>Tiêu đề</TableHead>
                 <TableHead>Khách hàng</TableHead>
                 <TableHead>Giá trị</TableHead>
                 <TableHead>Trạng thái</TableHead>
                 <TableHead>Ngày tạo</TableHead>
                 <TableHead>Hiệu lực</TableHead>
                 <TableHead className="w-24">Thao tác</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {proposals.map((proposal) => (
                 <TableRow
                   key={proposal.id}
                   className={`hover:bg-muted/50 cursor-pointer ${
                     selectedRows.includes(proposal.id) ? "bg-primary/5" : ""
                   }`}
                 >
                   <TableCell>
                     <Checkbox
                       checked={selectedRows.includes(proposal.id)}
                       onCheckedChange={() => toggleRow(proposal.id)}
                     />
                   </TableCell>
                   <TableCell className="font-mono text-sm">{proposal.code}</TableCell>
                   <TableCell className="font-medium text-primary hover:underline">
                     {proposal.title}
                   </TableCell>
                   <TableCell>{proposal.customer}</TableCell>
                   <TableCell className="font-semibold text-primary">
                     {proposal.value}
                   </TableCell>
                   <TableCell>
                     <Badge variant="secondary" className={statusColors[proposal.status]}>
                       {proposal.status}
                     </Badge>
                   </TableCell>
                   <TableCell>{proposal.createdAt}</TableCell>
                   <TableCell>{proposal.validUntil}</TableCell>
                   <TableCell>
                     <div className="flex items-center gap-1">
                       <Button variant="ghost" size="icon" className="h-8 w-8">
                         <Eye className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8">
                         <Download className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8">
                         <MoreHorizontal className="h-4 w-4" />
                       </Button>
                     </div>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
 
           {/* Footer */}
           <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <span>Tổng: {proposals.length}</span>
             </div>
             <div className="flex items-center gap-2 text-sm">
               <span className="text-muted-foreground">1 đến {proposals.length}</span>
             </div>
           </div>
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Proposals;