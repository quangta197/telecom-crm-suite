 import { MainLayout } from "@/components/layout/MainLayout";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Avatar, AvatarFallback } from "@/components/ui/avatar";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { MapPin, Phone, Mail, Calendar, Target, TrendingUp, Clock, CheckCircle } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 const salesTeam = [
   {
     id: 1,
     name: "Nguyễn Văn A",
     role: "Sales Manager",
     region: "Hà Nội",
     status: "online",
     visits: 8,
     deals: 3,
     revenue: "2.4 tỷ",
     lastActivity: "15 phút trước",
   },
   {
     id: 2,
     name: "Trần Thị B",
     role: "Senior Sales",
     region: "Hồ Chí Minh",
     status: "meeting",
     visits: 6,
     deals: 2,
     revenue: "1.8 tỷ",
     lastActivity: "1 giờ trước",
   },
   {
     id: 3,
     name: "Lê Văn C",
     role: "Sales Executive",
     region: "Đà Nẵng",
     status: "traveling",
     visits: 5,
     deals: 1,
     revenue: "950 triệu",
     lastActivity: "2 giờ trước",
   },
   {
     id: 4,
     name: "Phạm Văn D",
     role: "Sales Executive",
     region: "Cần Thơ",
     status: "offline",
     visits: 4,
     deals: 2,
     revenue: "1.2 tỷ",
     lastActivity: "5 giờ trước",
   },
 ];
 
 const todayActivities = [
   {
     id: 1,
     type: "visit",
     salesperson: "Nguyễn Văn A",
     customer: "VNPT Hà Nội",
     location: "Số 57 Huỳnh Thúc Kháng, Đống Đa",
     time: "09:00",
     status: "completed",
   },
   {
     id: 2,
     type: "meeting",
     salesperson: "Trần Thị B",
     customer: "Viettel Business",
     location: "Tầng 12, Viettel Tower, Cầu Giấy",
     time: "10:30",
     status: "in-progress",
   },
   {
     id: 3,
     type: "visit",
     salesperson: "Lê Văn C",
     customer: "FPT Telecom Đà Nẵng",
     location: "137 Nguyễn Văn Linh, Đà Nẵng",
     time: "14:00",
     status: "upcoming",
   },
   {
     id: 4,
     type: "demo",
     salesperson: "Nguyễn Văn A",
     customer: "CMC Telecom",
     location: "Online - Teams Meeting",
     time: "15:30",
     status: "upcoming",
   },
 ];
 
 const statusColors = {
   online: "bg-success",
   meeting: "bg-warning",
   traveling: "bg-info",
   offline: "bg-muted-foreground",
 };
 
 const activityStatusColors = {
   completed: "bg-success/10 text-success",
   "in-progress": "bg-warning/10 text-warning",
   upcoming: "bg-primary/10 text-primary",
 };
 
 const SalesMap = () => {
   return (
     <MainLayout>
       <div className="space-y-6 animate-fade-in">
         {/* Page Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold">Bản đồ hoạt động Sales</h1>
             <p className="text-muted-foreground">
               Theo dõi vị trí và hoạt động của đội ngũ bán hàng
             </p>
           </div>
           <div className="flex items-center gap-3">
             <Select defaultValue="today">
               <SelectTrigger className="w-40">
                 <SelectValue />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="today">Hôm nay</SelectItem>
                 <SelectItem value="week">Tuần này</SelectItem>
                 <SelectItem value="month">Tháng này</SelectItem>
               </SelectContent>
             </Select>
             <Button variant="outline">Làm mới</Button>
           </div>
         </div>
 
         <div className="grid gap-6 lg:grid-cols-3">
           {/* Map Placeholder */}
           <Card className="lg:col-span-2 p-6 shadow-card">
             <h3 className="text-lg font-semibold mb-4">Bản đồ hoạt động</h3>
             <div className="relative h-96 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-dashed border-border flex items-center justify-center">
               <div className="text-center">
                 <MapPin className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                 <p className="text-muted-foreground">
                   Bản đồ tích hợp sẽ hiển thị ở đây
                 </p>
                 <p className="text-sm text-muted-foreground mt-1">
                   (Yêu cầu tích hợp Google Maps API)
                 </p>
               </div>
               {/* Mock location markers */}
               <div className="absolute top-1/4 left-1/4 flex items-center gap-2 bg-card rounded-lg p-2 shadow-lg animate-pulse-subtle">
                 <div className="h-3 w-3 rounded-full bg-success" />
                 <span className="text-xs font-medium">Nguyễn Văn A</span>
               </div>
               <div className="absolute top-1/3 right-1/4 flex items-center gap-2 bg-card rounded-lg p-2 shadow-lg">
                 <div className="h-3 w-3 rounded-full bg-warning" />
                 <span className="text-xs font-medium">Trần Thị B</span>
               </div>
               <div className="absolute bottom-1/4 left-1/3 flex items-center gap-2 bg-card rounded-lg p-2 shadow-lg">
                 <div className="h-3 w-3 rounded-full bg-info" />
                 <span className="text-xs font-medium">Lê Văn C</span>
               </div>
             </div>
           </Card>
 
           {/* Sales Team Status */}
           <Card className="p-6 shadow-card">
             <h3 className="text-lg font-semibold mb-4">Đội ngũ Sales</h3>
             <div className="space-y-4">
               {salesTeam.map((member) => (
                 <div
                   key={member.id}
                   className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                 >
                   <div className="flex items-start gap-3">
                     <div className="relative">
                       <Avatar>
                         <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                           {member.name.split(" ").slice(-2).map(n => n[0]).join("")}
                         </AvatarFallback>
                       </Avatar>
                       <div
                         className={cn(
                           "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card",
                           statusColors[member.status as keyof typeof statusColors]
                         )}
                       />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="font-semibold text-sm">{member.name}</p>
                       <p className="text-xs text-muted-foreground">{member.role}</p>
                       <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                         <MapPin className="h-3 w-3" />
                         {member.region}
                       </div>
                     </div>
                   </div>
                   <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t text-center text-xs">
                     <div>
                       <p className="font-semibold text-primary">{member.visits}</p>
                       <p className="text-muted-foreground">Visits</p>
                     </div>
                     <div>
                       <p className="font-semibold text-success">{member.deals}</p>
                       <p className="text-muted-foreground">Deals</p>
                     </div>
                     <div>
                       <p className="font-semibold">{member.revenue}</p>
                       <p className="text-muted-foreground">Revenue</p>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </Card>
         </div>
 
         {/* Today's Activities */}
         <Card className="p-6 shadow-card">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-semibold">Hoạt động hôm nay</h3>
             <Badge variant="secondary" className="bg-primary/10 text-primary">
               {todayActivities.length} hoạt động
             </Badge>
           </div>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
             {todayActivities.map((activity) => (
               <div
                 key={activity.id}
                 className={cn(
                   "p-4 rounded-lg border-l-4",
                   activityStatusColors[activity.status as keyof typeof activityStatusColors],
                   activity.status === "completed" && "border-l-success",
                   activity.status === "in-progress" && "border-l-warning",
                   activity.status === "upcoming" && "border-l-primary"
                 )}
               >
                 <div className="flex items-center justify-between mb-2">
                   <Badge variant="outline" className="text-xs capitalize">
                     {activity.type}
                   </Badge>
                   <div className="flex items-center gap-1 text-xs">
                     <Clock className="h-3 w-3" />
                     {activity.time}
                   </div>
                 </div>
                 <p className="font-semibold text-sm mb-1">{activity.customer}</p>
                 <p className="text-xs text-muted-foreground mb-2">{activity.salesperson}</p>
                 <div className="flex items-start gap-1 text-xs text-muted-foreground">
                   <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
                   <span className="line-clamp-2">{activity.location}</span>
                 </div>
                 {activity.status === "completed" && (
                   <div className="flex items-center gap-1 mt-2 text-xs text-success">
                     <CheckCircle className="h-3 w-3" />
                     Đã hoàn thành
                   </div>
                 )}
               </div>
             ))}
           </div>
         </Card>
       </div>
     </MainLayout>
   );
 };
 
 export default SalesMap;