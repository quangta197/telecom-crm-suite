 import { ReactNode, useState } from "react";
 import { TopNavigation } from "./TopNavigation";
 import { FilterPanel } from "./FilterPanel";
 import { ActivityPanel } from "./ActivityPanel";
 
 interface MainLayoutProps {
   children: ReactNode;
   showFilters?: boolean;
   showActivity?: boolean;
   filterTitle?: string;
   filters?: { id: string; label: string; checked?: boolean }[];
   savedFilters?: string[];
 }
 
 export function MainLayout({
   children,
   showFilters = true,
   showActivity = true,
   filterTitle = "Tất cả",
   filters = [],
   savedFilters = [],
 }: MainLayoutProps) {
   const [filterCollapsed, setFilterCollapsed] = useState(false);
   const [activityOpen, setActivityOpen] = useState(true);
 
   return (
     <div className="min-h-screen bg-background flex flex-col">
       <TopNavigation />
       <div className="flex-1 flex overflow-hidden">
         {showFilters && (
           <FilterPanel
             title={filterTitle}
             filters={filters}
             savedFilters={savedFilters}
             collapsed={filterCollapsed}
             onCollapse={() => setFilterCollapsed(!filterCollapsed)}
           />
         )}
         <main className="flex-1 overflow-auto p-6 bg-secondary/30">{children}</main>
         {showActivity && (
           <ActivityPanel
             isOpen={activityOpen}
             onClose={() => setActivityOpen(false)}
           />
         )}
       </div>
     </div>
   );
 }