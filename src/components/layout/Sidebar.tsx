 import { useState } from "react";
 import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Target,
  TrendingUp,
  Calendar,
  FileText,
  Calculator,
  BarChart3,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Signal,
  Settings,
} from "lucide-react";
 import { cn } from "@/lib/utils";
 
const menuItems = [
  { icon: LayoutDashboard, label: "Bàn làm việc", path: "/" },
  { icon: Target, label: "Tiềm năng", path: "/leads" },
  { icon: TrendingUp, label: "Cơ hội", path: "/opportunities" },
  { icon: FileText, label: "Dự án", path: "/projects" },
  { icon: Users, label: "Liên hệ", path: "/contacts" },
  { icon: Calendar, label: "Lịch làm việc", path: "/calendar" },
  { icon: Calculator, label: "Báo giá", path: "/quotations" },
  
  { icon: MapPin, label: "Bản đồ hoạt động", path: "/sales-map" },
  { icon: Settings, label: "Cài đặt", path: "/settings" },
];
 
 export function Sidebar() {
   const [collapsed, setCollapsed] = useState(false);
   const location = useLocation();
 
   return (
     <aside
       className={cn(
         "fixed left-0 top-0 z-40 h-screen gradient-sidebar transition-all duration-300 ease-in-out flex flex-col",
         collapsed ? "w-20" : "w-64"
       )}
     >
       {/* Logo */}
       <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
         <div className="flex items-center gap-3">
           <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
             <Signal className="h-5 w-5 text-sidebar-primary-foreground" />
           </div>
           {!collapsed && (
             <div className="animate-fade-in">
               <h1 className="text-lg font-bold text-sidebar-foreground">TeleCRM</h1>
               <p className="text-xs text-sidebar-muted">Viễn thông B2B</p>
             </div>
           )}
         </div>
       </div>
 
       {/* Navigation */}
       <nav className="flex-1 overflow-y-auto py-4 px-3">
         <ul className="space-y-1">
           {menuItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
               <li key={item.path}>
                 <Link
                   to={item.path}
                   className={cn(
                     "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                     isActive
                       ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                       : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                   )}
                 >
                   <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "animate-scale-in")} />
                   {!collapsed && <span className="animate-fade-in">{item.label}</span>}
                 </Link>
               </li>
             );
           })}
         </ul>
       </nav>
 
       {/* Collapse Toggle */}
       <div className="border-t border-sidebar-border p-3">
         <button
           onClick={() => setCollapsed(!collapsed)}
           className="flex w-full items-center justify-center rounded-lg py-2 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
         >
           {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
         </button>
       </div>
     </aside>
   );
 }