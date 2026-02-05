 import { ReactNode } from "react";
 import { cn } from "@/lib/utils";
 import { TrendingUp, TrendingDown } from "lucide-react";
 
 interface StatCardProps {
   title: string;
   value: string;
   change?: number;
   changeLabel?: string;
   icon: ReactNode;
   variant?: "default" | "primary" | "success" | "warning" | "accent";
 }
 
 const variantStyles = {
   default: "bg-card",
   primary: "gradient-primary text-primary-foreground",
   success: "gradient-success text-success-foreground",
   warning: "gradient-warm text-warning-foreground",
   accent: "bg-accent text-accent-foreground",
 };
 
 export function StatCard({
   title,
   value,
   change,
   changeLabel,
   icon,
   variant = "default",
 }: StatCardProps) {
   const isPositive = change && change > 0;
   const isGradient = variant !== "default";
 
   return (
     <div
       className={cn(
         "rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
         variantStyles[variant]
       )}
     >
       <div className="flex items-start justify-between">
         <div className="space-y-2">
           <p
             className={cn(
               "text-sm font-medium",
               isGradient ? "opacity-90" : "text-muted-foreground"
             )}
           >
             {title}
           </p>
           <p className="text-3xl font-bold tracking-tight">{value}</p>
           {change !== undefined && (
             <div
               className={cn(
                 "flex items-center gap-1 text-sm font-medium",
                 isGradient
                   ? "opacity-90"
                   : isPositive
                   ? "text-success"
                   : "text-destructive"
               )}
             >
               {isPositive ? (
                 <TrendingUp className="h-4 w-4" />
               ) : (
                 <TrendingDown className="h-4 w-4" />
               )}
               <span>
                 {isPositive ? "+" : ""}
                 {change}% {changeLabel}
               </span>
             </div>
           )}
         </div>
         <div
           className={cn(
             "flex h-12 w-12 items-center justify-center rounded-lg",
             isGradient ? "bg-white/20" : "bg-primary/10"
           )}
         >
           {icon}
         </div>
       </div>
     </div>
   );
 }