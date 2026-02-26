import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TableHead } from "@/components/ui/table";

interface SortableTableHeadProps {
  label: string;
  sortKey: string;
  currentSortKey: string | null;
  currentSortDir: "asc" | "desc" | null;
  onSort: (key: string) => void;
  className?: string;
}

export function SortableTableHead({
  label,
  sortKey,
  currentSortKey,
  currentSortDir,
  onSort,
  className = "",
}: SortableTableHeadProps) {
  const isActive = currentSortKey === sortKey;

  return (
    <TableHead
      className={`cursor-pointer select-none hover:text-foreground transition-colors ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center">
        {label}
        {!isActive && <ArrowUpDown className="h-3.5 w-3.5 ml-1 text-muted-foreground/50" />}
        {isActive && currentSortDir === "asc" && <ArrowUp className="h-3.5 w-3.5 ml-1 text-primary" />}
        {isActive && currentSortDir === "desc" && <ArrowDown className="h-3.5 w-3.5 ml-1 text-primary" />}
      </div>
    </TableHead>
  );
}
