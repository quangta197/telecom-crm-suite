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
 import { Plus, Search, Filter, MoreHorizontal, Building2, Phone, Mail } from "lucide-react";
 import { Avatar, AvatarFallback } from "@/components/ui/avatar";
 
 const contacts = [
   {
     id: 1,
     name: "Nguyễn Văn Minh",
     company: "VNPT Hà Nội",
     position: "Giám đốc CNTT",
     email: "minh.nv@vnpt.com.vn",
     phone: "0912 345 678",
     status: "Hoạt động",
   },
   {
     id: 2,
     name: "Trần Thị Hương",
     company: "Viettel Business",
     position: "Trưởng phòng mua hàng",
     email: "huong.tt@viettel.com.vn",
     phone: "0987 654 321",
     status: "Hoạt động",
   },
   {
     id: 3,
     name: "Lê Hoàng Nam",
     company: "FPT Telecom",
     position: "Phó Giám đốc",
     email: "nam.lh@fpt.com.vn",
     phone: "0909 123 456",
     status: "Không hoạt động",
   },
   {
     id: 4,
     name: "Phạm Thanh Tùng",
     company: "CMC Telecom",
     position: "Giám đốc kinh doanh",
     email: "tung.pt@cmc.com.vn",
     phone: "0918 765 432",
     status: "Hoạt động",
   },
   {
     id: 5,
     name: "Đỗ Minh Châu",
     company: "MobiFone",
     position: "Trưởng phòng dự án",
     email: "chau.dm@mobifone.vn",
     phone: "0923 456 789",
     status: "Hoạt động",
   },
 ];
 
 const Contacts = () => {
   return (
     <MainLayout>
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold">Liên hệ</h1>
             <p className="text-muted-foreground">
               Quản lý danh sách khách hàng và đối tác
             </p>
           </div>
           <Button className="gradient-primary">
             <Plus className="mr-2 h-4 w-4" />
             Thêm liên hệ
           </Button>
         </div>
 
         {/* Filters */}
         <div className="flex items-center gap-4">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input placeholder="Tìm kiếm liên hệ..." className="pl-10" />
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
                 <TableHead>Liên hệ</TableHead>
                 <TableHead>Công ty</TableHead>
                 <TableHead>Liên lạc</TableHead>
                 <TableHead>Trạng thái</TableHead>
                 <TableHead className="w-12"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {contacts.map((contact) => (
                 <TableRow key={contact.id} className="hover:bg-secondary/30">
                   <TableCell>
                     <div className="flex items-center gap-3">
                       <Avatar>
                         <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                           {contact.name.split(" ").map(n => n[0]).join("").slice(-2)}
                         </AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-medium">{contact.name}</p>
                         <p className="text-sm text-muted-foreground">{contact.position}</p>
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <Building2 className="h-4 w-4 text-muted-foreground" />
                       {contact.company}
                     </div>
                   </TableCell>
                   <TableCell>
                     <div className="space-y-1">
                       <div className="flex items-center gap-2 text-sm">
                         <Mail className="h-3 w-3 text-muted-foreground" />
                         {contact.email}
                       </div>
                       <div className="flex items-center gap-2 text-sm">
                         <Phone className="h-3 w-3 text-muted-foreground" />
                         {contact.phone}
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                     <Badge
                       variant={contact.status === "Hoạt động" ? "default" : "secondary"}
                       className={contact.status === "Hoạt động" ? "bg-success/10 text-success hover:bg-success/20" : ""}
                     >
                       {contact.status}
                     </Badge>
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
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Contacts;