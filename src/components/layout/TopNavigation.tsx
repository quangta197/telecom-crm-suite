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
   Signal,
   Search,
   Bell,
   Settings,
   HelpCircle,
 } from "lucide-react";
 import { cn } from "@/lib/utils";
 import { Input } from "@/components/ui/input";
 import { Avatar, AvatarFallback } from "@/components/ui/avatar";
 import { Button } from "@/components/ui/button";
 
 const menuItems = [
   { icon: LayoutDashboard, label: "Tổng quan", path: "/" },
   { icon: Target, label: "Tiềm năng", path: "/leads" },
   { icon: FileText, label: "Chào hàng", path: "/proposals" },
   { icon: Users, label: "Liên hệ", path: "/contacts" },
   { icon: TrendingUp, label: "Cơ hội", path: "/opportunities" },
   { icon: Calculator, label: "Báo giá", path: "/quotations" },
   { icon: Calendar, label: "Lịch", path: "/calendar" },
   { icon: BarChart3, label: "Báo cáo", path: "/analytics" },
   { icon: MapPin, label: "Bản đồ", path: "/sales-map" },
 ];
 
 export function TopNavigation() {
   const location = useLocation();
 
   return (
     <header className="sticky top-0 z-50 w-full bg-card border-b">
       {/* Top row - Logo, Search, Actions */}
       <div className="flex items-center justify-between h-14 px-4 border-b">
         {/* Logo */}
         <div className="flex items-center gap-3">
           <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
             <Signal className="h-5 w-5 text-primary-foreground" />
           </div>
           <span className="text-lg font-bold text-foreground">CRM</span>
         </div>
 
         {/* Search */}
         <div className="flex-1 max-w-xl mx-8">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input
               placeholder="Tìm kiếm tiềm năng, liên hệ, khách hàng..."
               className="pl-10 bg-secondary/50 border-0"
             />
           </div>
         </div>
 
         {/* Right actions */}
         <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
             <Bell className="h-5 w-5" />
           </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
             <Settings className="h-5 w-5" />
           </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
             <HelpCircle className="h-5 w-5" />
           </Button>
           <Avatar className="h-9 w-9 ml-2">
             <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
               NV
             </AvatarFallback>
           </Avatar>
         </div>
       </div>
 
       {/* Navigation tabs */}
       <nav className="flex items-center h-11 px-4 gap-1 overflow-x-auto">
         {menuItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
             <Link
               key={item.path}
               to={item.path}
               className={cn(
                 "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                 isActive
                   ? "bg-primary/10 text-primary"
                   : "text-muted-foreground hover:text-foreground hover:bg-secondary"
               )}
             >
               <item.icon className="h-4 w-4" />
               <span>{item.label}</span>
             </Link>
           );
         })}
       </nav>
     </header>
   );
 }