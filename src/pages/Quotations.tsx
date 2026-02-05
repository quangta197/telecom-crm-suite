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
 import { Plus, MoreHorizontal, Eye, Send } from "lucide-react";
 import { Checkbox } from "@/components/ui/checkbox";
 
 const quotations = [
   {
     id: 1,
     code: "BG-2024-001",
     title: "Gói hạ tầng mạng Enterprise",
     customer: "VNPT Hà Nội",
     items: 12,
     totalValue: "3.2 tỷ",
     discount: "5%",
     finalValue: "3.04 tỷ",
     status: "Đã gửi",
     validUntil: "15/02/2024",
   },
   {
     id: 2,
     code: "BG-2024-002",
     title: "Data Center Premium Package",
     customer: "Viettel Business",
     items: 8,
     totalValue: "5.8 tỷ",
     discount: "8%",
     finalValue: "5.34 tỷ",
     status: "Chờ xác nhận",
     validUntil: "20/02/2024",
   },
   {
     id: 3,
     code: "BG-2024-003",
     title: "Cloud Migration Standard",
     customer: "FPT Telecom",
     items: 5,
     totalValue: "2.1 tỷ",
     discount: "3%",
     finalValue: "2.04 tỷ",
     status: "Đã chấp nhận",
     validUntil: "25/02/2024",
   },
   {
     id: 4,
     code: "BG-2024-004",
     title: "5G Enterprise Solution",
     customer: "CMC Telecom",
     items: 15,
     totalValue: "4.5 tỷ",
     discount: "10%",
     finalValue: "4.05 tỷ",
     status: "Nháp",
     validUntil: "28/02/2024",
   },
   {
     id: 5,
     code: "BG-2024-005",
     title: "IoT Platform Package",
     customer: "MobiFone",
     items: 7,
     totalValue: "1.8 tỷ",
     discount: "5%",
     finalValue: "1.71 tỷ",
     status: "Đã gửi",
     validUntil: "01/03/2024",
   },
 ];
 
 const statusColors: Record<string, string> = {
   "Nháp": "bg-secondary text-secondary-foreground",
   "Chờ xác nhận": "bg-warning/10 text-warning",
   "Đã chấp nhận": "bg-success/10 text-success",
   "Đã gửi": "bg-primary/10 text-primary",
   "Đã từ chối": "bg-destructive/10 text-destructive",
 };
 
 const filterOptions = [
   { id: "code", label: "Mã báo giá" },
   { id: "title", label: "Tiêu đề" },
   { id: "customer", label: "Khách hàng" },
   { id: "value", label: "Giá trị" },
   { id: "status", label: "Trạng thái" },
 ];
 
 const savedFilters = ["Báo giá đã gửi", "Báo giá tháng này"];
 
 const Quotations = () => {
   const [selectedRows, setSelectedRows] = useState<number[]>([]);
 
   const toggleRow = (id: number) => {
     setSelectedRows((prev) =>
       prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
     );
   };
 
   const toggleAll = () => {
     if (selectedRows.length === quotations.length) {
       setSelectedRows([]);
     } else {
       setSelectedRows(quotations.map((q) => q.id));
     }
   };
 
   return (
     <MainLayout
       filterTitle="Tất cả báo giá"
       filters={filterOptions}
       savedFilters={savedFilters}
     >
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <h1 className="text-xl font-bold">Tất cả báo giá</h1>
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
                     checked={selectedRows.length === quotations.length}
                     onCheckedChange={toggleAll}
                   />
                 </TableHead>
                 <TableHead>Mã BG</TableHead>
                 <TableHead>Tiêu đề</TableHead>
                 <TableHead>Khách hàng</TableHead>
                 <TableHead>Tổng giá</TableHead>
                 <TableHead>Chiết khấu</TableHead>
                 <TableHead>Thành tiền</TableHead>
                 <TableHead>Trạng thái</TableHead>
                 <TableHead>Hiệu lực</TableHead>
                 <TableHead className="w-24">Thao tác</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {quotations.map((quote) => (
                 <TableRow
                   key={quote.id}
                   className={`hover:bg-muted/50 cursor-pointer ${
                     selectedRows.includes(quote.id) ? "bg-primary/5" : ""
                   }`}
                 >
                   <TableCell>
                     <Checkbox
                       checked={selectedRows.includes(quote.id)}
                       onCheckedChange={() => toggleRow(quote.id)}
                     />
                   </TableCell>
                   <TableCell className="font-mono text-sm">{quote.code}</TableCell>
                   <TableCell className="font-medium text-primary hover:underline">
                     {quote.title}
                   </TableCell>
                   <TableCell>{quote.customer}</TableCell>
                   <TableCell>{quote.totalValue}</TableCell>
                   <TableCell className="text-success">-{quote.discount}</TableCell>
                   <TableCell className="font-semibold text-primary">
                     {quote.finalValue}
                   </TableCell>
                   <TableCell>
                     <Badge variant="secondary" className={statusColors[quote.status]}>
                       {quote.status}
                     </Badge>
                   </TableCell>
                   <TableCell>{quote.validUntil}</TableCell>
                   <TableCell>
                     <div className="flex items-center gap-1">
                       <Button variant="ghost" size="icon" className="h-8 w-8">
                         <Eye className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8">
                         <Send className="h-4 w-4" />
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
               <span>Tổng: {quotations.length}</span>
             </div>
             <div className="flex items-center gap-2 text-sm">
               <span className="text-muted-foreground">1 đến {quotations.length}</span>
             </div>
           </div>
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Quotations;