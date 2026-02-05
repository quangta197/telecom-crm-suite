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
 
 const contacts = [
   {
     id: 1,
     code: "KH00015",
     name: "Công ty CP MISA",
     taxCode: "0102345646",
     phone: "0362 855 655",
     smeScore: 90,
   },
   {
     id: 2,
     code: "KH00016",
     name: "Công ty TNHH Thân Thiện",
     taxCode: "0102345647",
     phone: "0362 624 827",
     smeScore: 100,
   },
   {
     id: 3,
     code: "KH00017",
     name: "Công ty CP Văn Kiều",
     taxCode: "0102345648",
     phone: "0362 222 333",
     smeScore: 40,
   },
   {
     id: 4,
     code: "KH00018",
     name: "Quán Nhỏ",
     taxCode: "0102345649",
     phone: "0362 123 123",
     smeScore: 70,
   },
   {
     id: 5,
     code: "KH00019",
     name: "Cà phê Trung Nguyên",
     taxCode: "0102345650",
     phone: "0362 255 255",
     smeScore: 90,
   },
   {
     id: 6,
     code: "KH00020",
     name: "Công ty CP TM & DV Thân Thiện",
     taxCode: "0102345651",
     phone: "0362 500 500",
     smeScore: 80,
   },
   {
     id: 7,
     code: "KH00022",
     name: "Công ty CP Anh Dũng",
     taxCode: "0102345652",
     phone: "0362 212 212",
     smeScore: 10,
   },
   {
     id: 8,
     code: "KH00023",
     name: "Chuỗi cửa hàng thời trang T & T",
     taxCode: "0102345653",
     phone: "0362 222 222",
     smeScore: 100,
   },
   {
     id: 9,
     code: "KH00024",
     name: "Công ty CP Minh Nhật",
     taxCode: "0102345654",
     phone: "0362 678 678",
     smeScore: 90,
   },
   {
     id: 10,
     code: "KH00025",
     name: "Cà phê 69",
     taxCode: "0102345655",
     phone: "0362 822 833",
     smeScore: 20,
   },
 ];
 
 const filterOptions = [
   { id: "code", label: "Mã khách hàng" },
   { id: "name", label: "Tên khách hàng" },
   { id: "taxCode", label: "Mã số thuế" },
   { id: "phone", label: "Điện thoại" },
   { id: "smeScore", label: "Điểm tiềm năng SME" },
 ];
 
 const savedFilters = ["Khách hàng VIP", "Khách hàng mới"];
 
 const Contacts = () => {
   const [selectedRows, setSelectedRows] = useState<number[]>([]);
 
   const toggleRow = (id: number) => {
     setSelectedRows((prev) =>
       prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
     );
   };
 
   const toggleAll = () => {
     if (selectedRows.length === contacts.length) {
       setSelectedRows([]);
     } else {
       setSelectedRows(contacts.map((c) => c.id));
     }
   };
 
   const getScoreColor = (score: number) => {
     if (score >= 80) return "text-success";
     if (score >= 50) return "text-warning";
     return "text-destructive";
   };
 
   return (
     <MainLayout
       filterTitle="Tất cả khách hàng"
       filters={filterOptions}
       savedFilters={savedFilters}
     >
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-xl font-bold">Tất cả khách hàng</h1>
           </div>
           <div className="flex items-center gap-2">
             <Button className="gradient-primary">
               <Plus className="mr-2 h-4 w-4" />
               Thêm
             </Button>
           </div>
         </div>
 
         {/* Table */}
         <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
           <Table>
             <TableHeader>
               <TableRow className="bg-muted/50">
                 <TableHead className="w-12">
                   <Checkbox
                     checked={selectedRows.length === contacts.length}
                     onCheckedChange={toggleAll}
                   />
                 </TableHead>
                 <TableHead>Mã khách hàng</TableHead>
                 <TableHead>Tên khách hàng</TableHead>
                 <TableHead>Mã số thuế</TableHead>
                 <TableHead>Điện thoại</TableHead>
                 <TableHead className="text-right">Điểm tiềm năng SME</TableHead>
                 <TableHead className="w-12"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {contacts.map((contact) => (
                 <TableRow
                   key={contact.id}
                   className={`hover:bg-muted/50 cursor-pointer ${
                     selectedRows.includes(contact.id) ? "bg-primary/5" : ""
                   }`}
                 >
                   <TableCell>
                     <Checkbox
                       checked={selectedRows.includes(contact.id)}
                       onCheckedChange={() => toggleRow(contact.id)}
                     />
                   </TableCell>
                   <TableCell className="font-mono text-sm">{contact.code}</TableCell>
                   <TableCell className="font-medium text-primary hover:underline">
                     {contact.name}
                   </TableCell>
                   <TableCell className="font-mono text-sm">{contact.taxCode}</TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <Phone className="h-3.5 w-3.5 text-success" />
                       <span>{contact.phone}</span>
                     </div>
                   </TableCell>
                   <TableCell className={`text-right font-semibold ${getScoreColor(contact.smeScore)}`}>
                     {contact.smeScore}
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
               <span>Tổng: {contacts.length}</span>
             </div>
             <div className="flex items-center gap-2 text-sm">
               <span className="text-muted-foreground">1 đến {contacts.length}</span>
             </div>
           </div>
         </div>
       </div>
     </MainLayout>
   );
 };
 
 export default Contacts;