 import { Phone, Mail, FileText, Calendar, CheckCircle } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 const activities = [
   {
     id: 1,
     type: "call",
     icon: Phone,
     title: "Gọi điện cho VNPT Hà Nội",
     description: "Thảo luận về gói cước doanh nghiệp",
     time: "10 phút trước",
     user: "Nguyễn Văn A",
   },
   {
     id: 2,
     type: "email",
     icon: Mail,
     title: "Gửi báo giá cho Viettel Corp",
     description: "Gói giải pháp hạ tầng mạng",
     time: "1 giờ trước",
     user: "Trần Thị B",
   },
   {
     id: 3,
     type: "proposal",
     icon: FileText,
     title: "Tạo đề xuất mới",
     description: "Dự án trung tâm dữ liệu FPT",
     time: "2 giờ trước",
     user: "Lê Văn C",
   },
   {
     id: 4,
     type: "meeting",
     icon: Calendar,
     title: "Đặt lịch họp với MobiFone",
     description: "Demo sản phẩm ngày 15/01",
     time: "3 giờ trước",
     user: "Nguyễn Văn A",
   },
   {
     id: 5,
     type: "deal",
     icon: CheckCircle,
     title: "Chốt hợp đồng CMC Telecom",
     description: "Giá trị: 2.5 tỷ VNĐ",
     time: "5 giờ trước",
     user: "Phạm Văn D",
   },
 ];
 
 const typeStyles = {
   call: "bg-info/10 text-info",
   email: "bg-primary/10 text-primary",
   proposal: "bg-accent/10 text-accent",
   meeting: "bg-warning/10 text-warning",
   deal: "bg-success/10 text-success",
 };
 
 export function RecentActivities() {
   return (
     <div className="rounded-xl bg-card p-6 shadow-card">
       <div className="mb-6 flex items-center justify-between">
         <div>
           <h3 className="text-lg font-semibold">Hoạt động gần đây</h3>
           <p className="text-sm text-muted-foreground">
             Theo dõi hoạt động của đội sales
           </p>
         </div>
         <button className="text-sm font-medium text-primary hover:underline">
           Xem tất cả
         </button>
       </div>
       <div className="space-y-4">
         {activities.map((activity, index) => (
           <div
             key={activity.id}
             className="flex gap-4 rounded-lg p-3 transition-colors hover:bg-secondary/50"
             style={{ animationDelay: `${index * 50}ms` }}
           >
             <div
               className={cn(
                 "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                 typeStyles[activity.type as keyof typeof typeStyles]
               )}
             >
               <activity.icon className="h-5 w-5" />
             </div>
             <div className="flex-1 min-w-0">
               <p className="font-medium truncate">{activity.title}</p>
               <p className="text-sm text-muted-foreground truncate">
                 {activity.description}
               </p>
               <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                 <span>{activity.user}</span>
                 <span>•</span>
                 <span>{activity.time}</span>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 }