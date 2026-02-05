 import { Building2, TrendingUp } from "lucide-react";
 import { Progress } from "@/components/ui/progress";
 
 const deals = [
   {
     id: 1,
     company: "VNPT Hà Nội",
     value: "3.2 tỷ",
     stage: "Đàm phán",
     probability: 75,
     closeDate: "15/01/2024",
   },
   {
     id: 2,
     company: "Viettel Business",
     value: "5.8 tỷ",
     stage: "Đề xuất",
     probability: 60,
     closeDate: "22/01/2024",
   },
   {
     id: 3,
     company: "FPT Telecom",
     value: "2.1 tỷ",
     stage: "Đánh giá",
     probability: 45,
     closeDate: "30/01/2024",
   },
   {
     id: 4,
     company: "CMC Telecom",
     value: "4.5 tỷ",
     stage: "Đàm phán",
     probability: 80,
     closeDate: "10/02/2024",
   },
 ];
 
 export function TopDeals() {
   return (
     <div className="rounded-xl bg-card p-6 shadow-card">
       <div className="mb-6 flex items-center justify-between">
         <div>
           <h3 className="text-lg font-semibold">Cơ hội lớn nhất</h3>
           <p className="text-sm text-muted-foreground">Top deals theo giá trị</p>
         </div>
         <TrendingUp className="h-5 w-5 text-success" />
       </div>
       <div className="space-y-4">
         {deals.map((deal) => (
           <div
             key={deal.id}
             className="rounded-lg border border-border p-4 transition-all hover:border-primary hover:shadow-md"
           >
             <div className="flex items-start justify-between mb-3">
               <div className="flex items-center gap-3">
                 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                   <Building2 className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <p className="font-semibold">{deal.company}</p>
                   <p className="text-sm text-muted-foreground">{deal.stage}</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="font-bold text-primary">{deal.value}</p>
                 <p className="text-xs text-muted-foreground">
                   Dự kiến: {deal.closeDate}
                 </p>
               </div>
             </div>
             <div className="space-y-1.5">
               <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Xác suất thành công</span>
                 <span className="font-medium">{deal.probability}%</span>
               </div>
               <Progress value={deal.probability} className="h-2" />
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 }