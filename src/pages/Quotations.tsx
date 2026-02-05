 import { MainLayout } from "@/components/layout/MainLayout";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Badge } from "@/components/ui/badge";
 import { Card } from "@/components/ui/card";
 import { Plus, Search, Filter, FileText, Building2, Calendar, DollarSign, Copy, Send } from "lucide-react";
 
 const quotations = [
   {
     id: "QT-2024-001",
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
     id: "QT-2024-002",
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
     id: "QT-2024-003",
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
     id: "QT-2024-004",
     title: "5G Enterprise Solution",
     customer: "CMC Telecom",
     items: 15,
     totalValue: "4.5 tỷ",
     discount: "10%",
     finalValue: "4.05 tỷ",
     status: "Nháp",
     validUntil: "28/02/2024",
   },
 ];
 
 const statusColors = {
   "Nháp": "bg-secondary text-secondary-foreground",
   "Chờ xác nhận": "bg-warning/10 text-warning",
   "Đã chấp nhận": "bg-success/10 text-success",
   "Đã gửi": "bg-primary/10 text-primary",
   "Đã từ chối": "bg-destructive/10 text-destructive",
 };
 
 const Quotations = () => {
   return (
     <MainLayout>
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold">Báo giá</h1>
             <p className="text-muted-foreground">
               Quản lý và theo dõi các báo giá gửi khách hàng
             </p>
           </div>
           <Button className="gradient-primary">
             <Plus className="mr-2 h-4 w-4" />
             Tạo báo giá
           </Button>
         </div>
 
         {/* Filters */}
         <div className="flex items-center gap-4">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input placeholder="Tìm kiếm báo giá..." className="pl-10" />
           </div>
           <Button variant="outline">
             <Filter className="mr-2 h-4 w-4" />
             Bộ lọc
           </Button>
         </div>
 
         {/* Quotation Cards */}
         <div className="grid gap-4 md:grid-cols-2">
           {quotations.map((quote) => (
             <Card key={quote.id} className="p-6 shadow-card hover:shadow-card-hover transition-all">
               <div className="flex items-start justify-between mb-4">
                 <div className="flex items-center gap-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                     <FileText className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <p className="font-mono text-sm text-muted-foreground">{quote.id}</p>
                     <p className="font-semibold">{quote.title}</p>
                   </div>
                 </div>
                 <Badge
                   variant="secondary"
                   className={statusColors[quote.status as keyof typeof statusColors]}
                 >
                   {quote.status}
                 </Badge>
               </div>
 
               <div className="grid grid-cols-2 gap-4 mb-4">
                 <div className="flex items-center gap-2 text-sm">
                   <Building2 className="h-4 w-4 text-muted-foreground" />
                   <span>{quote.customer}</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm">
                   <Calendar className="h-4 w-4 text-muted-foreground" />
                   <span>HSD: {quote.validUntil}</span>
                 </div>
               </div>
 
               <div className="rounded-lg bg-secondary/50 p-4 mb-4">
                 <div className="grid grid-cols-3 gap-4 text-sm">
                   <div>
                     <p className="text-muted-foreground">Tổng giá</p>
                     <p className="font-semibold">{quote.totalValue}</p>
                   </div>
                   <div>
                     <p className="text-muted-foreground">Chiết khấu</p>
                     <p className="font-semibold text-success">-{quote.discount}</p>
                   </div>
                   <div>
                     <p className="text-muted-foreground">Thành tiền</p>
                     <p className="font-bold text-primary">{quote.finalValue}</p>
                   </div>
                 </div>
               </div>
 
               <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="flex-1">
                   <Copy className="mr-1 h-3 w-3" />
                   Nhân bản
                 </Button>
                 <Button size="sm" className="flex-1 gradient-primary">
                   <Send className="mr-1 h-3 w-3" />
                   Gửi KH
                 </Button>
               </div>
             </Card>
           ))}
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Quotations;