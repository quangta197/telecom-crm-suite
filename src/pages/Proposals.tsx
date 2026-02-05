 import { MainLayout } from "@/components/layout/MainLayout";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Badge } from "@/components/ui/badge";
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
 import { Plus, Search, Filter, MoreHorizontal, FileText, Eye, Download } from "lucide-react";
 
 const proposals = [
   {
     id: "PRP-2024-001",
     title: "Giải pháp hạ tầng mạng VNPT",
     customer: "VNPT Hà Nội",
     value: "3.2 tỷ",
     status: "Đã gửi",
     createdAt: "12/01/2024",
     validUntil: "12/02/2024",
   },
   {
     id: "PRP-2024-002",
     title: "Data Center Solution Viettel",
     customer: "Viettel Business",
     value: "5.8 tỷ",
     status: "Chờ phê duyệt",
     createdAt: "10/01/2024",
     validUntil: "10/02/2024",
   },
   {
     id: "PRP-2024-003",
     title: "Cloud Migration Package",
     customer: "FPT Telecom",
     value: "2.1 tỷ",
     status: "Đã duyệt",
     createdAt: "08/01/2024",
     validUntil: "08/02/2024",
   },
   {
     id: "PRP-2024-004",
     title: "5G Enterprise Solution",
     customer: "CMC Telecom",
     value: "4.5 tỷ",
     status: "Đã gửi",
     createdAt: "05/01/2024",
     validUntil: "05/02/2024",
   },
   {
     id: "PRP-2024-005",
     title: "IoT Platform Integration",
     customer: "MobiFone",
     value: "1.8 tỷ",
     status: "Nháp",
     createdAt: "03/01/2024",
     validUntil: "03/02/2024",
   },
 ];
 
 const statusColors = {
   "Nháp": "bg-secondary text-secondary-foreground",
   "Chờ phê duyệt": "bg-warning/10 text-warning",
   "Đã duyệt": "bg-success/10 text-success",
   "Đã gửi": "bg-primary/10 text-primary",
   "Đã từ chối": "bg-destructive/10 text-destructive",
 };
 
 const Proposals = () => {
   return (
     <MainLayout>
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold">Chào hàng</h1>
             <p className="text-muted-foreground">
               Quản lý các đề xuất chào hàng cho khách hàng
             </p>
           </div>
           <Button className="gradient-primary">
             <Plus className="mr-2 h-4 w-4" />
             Tạo chào hàng
           </Button>
         </div>
 
         {/* Filters */}
         <div className="flex items-center gap-4">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input placeholder="Tìm kiếm chào hàng..." className="pl-10" />
           </div>
           <Button variant="outline">
             <Filter className="mr-2 h-4 w-4" />
             Bộ lọc
           </Button>
         </div>
 
         {/* Table */}
         <div className="rounded-xl bg-card shadow-card overflow-hidden">
           <Table>
             <TableHeader>
               <TableRow className="bg-secondary/50">
                 <TableHead>Mã số</TableHead>
                 <TableHead>Tiêu đề</TableHead>
                 <TableHead>Khách hàng</TableHead>
                 <TableHead>Giá trị</TableHead>
                 <TableHead>Trạng thái</TableHead>
                 <TableHead>Ngày tạo</TableHead>
                 <TableHead className="w-24">Thao tác</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {proposals.map((proposal) => (
                 <TableRow key={proposal.id} className="hover:bg-secondary/30">
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <FileText className="h-4 w-4 text-primary" />
                       <span className="font-mono text-sm">{proposal.id}</span>
                     </div>
                   </TableCell>
                   <TableCell className="font-medium">{proposal.title}</TableCell>
                   <TableCell>{proposal.customer}</TableCell>
                   <TableCell className="font-semibold text-primary">
                     {proposal.value}
                   </TableCell>
                   <TableCell>
                     <Badge
                       variant="secondary"
                       className={statusColors[proposal.status as keyof typeof statusColors]}
                     >
                       {proposal.status}
                     </Badge>
                   </TableCell>
                   <TableCell className="text-muted-foreground">
                     {proposal.createdAt}
                   </TableCell>
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
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Proposals;