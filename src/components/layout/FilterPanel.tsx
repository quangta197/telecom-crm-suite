 import { useState } from "react";
 import { ChevronDown, ChevronLeft, Search } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { Checkbox } from "@/components/ui/checkbox";
 import { cn } from "@/lib/utils";
 import { Button } from "@/components/ui/button";
 
 interface FilterOption {
   id: string;
   label: string;
   checked?: boolean;
 }
 
 interface FilterPanelProps {
   title?: string;
   filters?: FilterOption[];
   savedFilters?: string[];
   onFilterChange?: (id: string, checked: boolean) => void;
   collapsed?: boolean;
   onCollapse?: () => void;
 }
 
 export function FilterPanel({
   title = "Tất cả",
   filters = [],
   savedFilters = [],
   onFilterChange,
   collapsed = false,
   onCollapse,
 }: FilterPanelProps) {
   const [savedOpen, setSavedOpen] = useState(true);
   const [filterOpen, setFilterOpen] = useState(true);
 
   if (collapsed) {
     return (
       <div className="w-10 border-r bg-card flex flex-col items-center py-4">
         <Button variant="ghost" size="icon" onClick={onCollapse}>
           <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
         </Button>
       </div>
     );
   }
 
   return (
     <aside className="w-64 border-r bg-card flex flex-col h-full">
       {/* Header */}
       <div className="flex items-center justify-between p-4 border-b">
         <div className="flex items-center gap-2">
           <h2 className="font-semibold text-foreground">{title}</h2>
           <ChevronDown className="h-4 w-4 text-muted-foreground" />
         </div>
         <Button variant="ghost" size="icon" onClick={onCollapse} className="h-8 w-8">
           <ChevronLeft className="h-4 w-4" />
         </Button>
       </div>
 
       <div className="flex-1 overflow-y-auto p-4 space-y-4">
         {/* Saved filters */}
         {savedFilters.length > 0 && (
           <div>
             <button
               onClick={() => setSavedOpen(!savedOpen)}
               className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
             >
               <span>BỘ LỌC ĐÃ LƯU</span>
               <ChevronDown className={cn("h-4 w-4 transition-transform", savedOpen && "rotate-180")} />
             </button>
             {savedOpen && (
               <div className="space-y-1">
                 {savedFilters.map((filter, index) => (
                   <button
                     key={index}
                     className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-secondary transition-colors"
                   >
                     {filter}
                   </button>
                 ))}
               </div>
             )}
           </div>
         )}
 
         {/* Filter section */}
         <div>
           <button
             onClick={() => setFilterOpen(!filterOpen)}
             className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground mb-3"
           >
             <span>LỌC DỮ LIỆU</span>
             <ChevronDown className={cn("h-4 w-4 transition-transform", filterOpen && "rotate-180")} />
           </button>
 
           {filterOpen && (
             <div className="space-y-3">
               {/* Search within filters */}
               <div className="relative">
                 <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                 <Input placeholder="Tìm kiếm trường" className="pl-8 h-8 text-sm" />
               </div>
 
               {/* Filter options */}
               <div className="space-y-2">
                 {filters.map((filter) => (
                   <div key={filter.id} className="flex items-center gap-2">
                     <Checkbox
                       id={filter.id}
                       checked={filter.checked}
                       onCheckedChange={(checked) =>
                         onFilterChange?.(filter.id, checked as boolean)
                       }
                     />
                     <label
                       htmlFor={filter.id}
                       className="text-sm cursor-pointer hover:text-foreground text-muted-foreground"
                     >
                       {filter.label}
                     </label>
                   </div>
                 ))}
               </div>
 
               <button className="text-sm text-primary hover:underline">
                 Xem thêm
               </button>
             </div>
           )}
         </div>
       </div>
     </aside>
   );
 }