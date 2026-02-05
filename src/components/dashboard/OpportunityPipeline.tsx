 import { cn } from "@/lib/utils";
 
 const stages = [
   { name: "Tiếp cận", count: 24, value: "2.4 tỷ", color: "bg-info" },
   { name: "Đánh giá", count: 18, value: "4.2 tỷ", color: "bg-primary" },
   { name: "Đề xuất", count: 12, value: "3.8 tỷ", color: "bg-accent" },
   { name: "Đàm phán", count: 8, value: "2.1 tỷ", color: "bg-warning" },
   { name: "Chốt đơn", count: 5, value: "1.5 tỷ", color: "bg-success" },
 ];
 
 export function OpportunityPipeline() {
   const maxCount = Math.max(...stages.map((s) => s.count));
 
   return (
     <div className="rounded-xl bg-card p-6 shadow-card">
       <div className="mb-6">
         <h3 className="text-lg font-semibold">Pipeline Cơ hội</h3>
         <p className="text-sm text-muted-foreground">
           Theo dõi tiến độ bán hàng theo giai đoạn
         </p>
       </div>
       <div className="space-y-4">
         {stages.map((stage, index) => (
           <div key={stage.name} className="group">
             <div className="mb-2 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <div className={cn("h-2.5 w-2.5 rounded-full", stage.color)} />
                 <span className="text-sm font-medium">{stage.name}</span>
               </div>
               <div className="text-right">
                 <span className="text-sm font-semibold">{stage.count}</span>
                 <span className="ml-2 text-xs text-muted-foreground">
                   ({stage.value})
                 </span>
               </div>
             </div>
             <div className="h-2 overflow-hidden rounded-full bg-secondary">
               <div
                 className={cn(
                   "h-full rounded-full transition-all duration-500 group-hover:opacity-80",
                   stage.color
                 )}
                 style={{
                   width: `${(stage.count / maxCount) * 100}%`,
                   animationDelay: `${index * 100}ms`,
                 }}
               />
             </div>
           </div>
         ))}
       </div>
       <div className="mt-6 flex items-center justify-between rounded-lg bg-secondary/50 p-4">
         <div>
           <p className="text-sm text-muted-foreground">Tổng giá trị Pipeline</p>
           <p className="text-2xl font-bold text-gradient">14 tỷ VNĐ</p>
         </div>
         <div className="text-right">
           <p className="text-sm text-muted-foreground">Tỷ lệ chuyển đổi</p>
           <p className="text-2xl font-bold text-success">24.5%</p>
         </div>
       </div>
     </div>
   );
 }