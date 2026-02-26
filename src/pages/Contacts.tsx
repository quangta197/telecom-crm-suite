import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreHorizontal, Phone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const contacts = [
  {
    id: 1,
    code: "CT00015",
    name: "MISA Corporation",
    taxCode: "0102345646",
    phone: "0362 855 655",
    email: "info@misa.vn",
    address: "Phạm Văn Bạch, Cầu Giấy, Hà Nội",
    industry: "Software",
    contactPerson: "Nguyễn Văn A",
  },
  {
    id: 2,
    code: "CT00016",
    name: "Friendly Solutions LLC",
    taxCode: "0102345647",
    phone: "0362 624 827",
    email: "contact@friendlysol.com",
    address: "Nguyễn Huệ, Quận 1, TP.HCM",
    industry: "Consulting",
    contactPerson: "Trần Thị B",
  },
  {
    id: 3,
    code: "CT00017",
    name: "VanKieu Corporation",
    taxCode: "0102345648",
    phone: "0362 222 333",
    email: "hello@vankieu.vn",
    address: "Lê Lợi, Quận 1, TP.HCM",
    industry: "Trading",
    contactPerson: "Lê Văn C",
  },
  {
    id: 4,
    code: "CT00018",
    name: "Small Shop Inc",
    taxCode: "0102345649",
    phone: "0362 123 123",
    email: "shop@smallshop.vn",
    address: "Hai Bà Trưng, Quận 3, TP.HCM",
    industry: "Retail",
    contactPerson: "Phạm Thị D",
  },
  {
    id: 5,
    code: "CT00019",
    name: "Central Coffee Co",
    taxCode: "0102345650",
    phone: "0362 255 255",
    email: "info@centralcoffee.vn",
    address: "Đống Đa, Hà Nội",
    industry: "F&B",
    contactPerson: "Hoàng Văn E",
  },
  {
    id: 6,
    code: "CT00020",
    name: "Friendly Trade & Services",
    taxCode: "0102345651",
    phone: "0362 500 500",
    email: "trade@friendly.vn",
    address: "Tân Bình, TP.HCM",
    industry: "Trading",
    contactPerson: "Vũ Thị F",
  },
  {
    id: 7,
    code: "CT00022",
    name: "Dragon Corp",
    taxCode: "0102345652",
    phone: "0362 212 212",
    email: "info@dragoncorp.vn",
    address: "Ba Đình, Hà Nội",
    industry: "Manufacturing",
    contactPerson: "Đỗ Văn G",
  },
  {
    id: 8,
    code: "CT00023",
    name: "T & T Fashion Chain",
    taxCode: "0102345653",
    phone: "0362 222 222",
    email: "fashion@tnt.vn",
    address: "Hoàn Kiếm, Hà Nội",
    industry: "Fashion",
    contactPerson: "Ngô Thị H",
  },
  {
    id: 9,
    code: "CT00024",
    name: "Sunrise Corporation",
    taxCode: "0102345654",
    phone: "0362 678 678",
    email: "hello@sunrise.vn",
    address: "Quận 7, TP.HCM",
    industry: "Real Estate",
    contactPerson: "Bùi Văn I",
  },
  {
    id: 10,
    code: "CT00025",
    name: "Coffee 69",
    taxCode: "0102345655",
    phone: "0362 822 833",
    email: "order@coffee69.vn",
    address: "Bình Thạnh, TP.HCM",
    industry: "F&B",
    contactPerson: "Mai Thị K",
  },
];

const filterOptions = [
  { id: "code", label: "Customer Code" },
  { id: "name", label: "Customer Name" },
  { id: "taxCode", label: "Tax Code" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "address", label: "Address" },
  { id: "industry", label: "Industry" },
  { id: "contactPerson", label: "Contact Person" },
];

const savedFilters = ["VIP Customers", "New Customers"];

const Contacts = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleRowClick = (id: number) => {
    navigate(`/contacts/${id}`);
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === contacts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(contacts.map((c) => c.id));
    }
  };



  return (
    <MainLayout
      filterTitle="All Customers"
      filters={filterOptions}
      savedFilters={savedFilters}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">All Customers</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg bg-card shadow-sm overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === contacts.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Customer Code</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Tax Code</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className={`hover:bg-muted/50 cursor-pointer ${
                    selectedRows.includes(contact.id) ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleRowClick(contact.id)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedRows.includes(contact.id)}
                      onCheckedChange={() => toggleRow(contact.id)}
                    />
                  </TableCell>
                  <TableCell className="text-sm text-primary">{contact.email}</TableCell>
                  <TableCell className="text-sm">{contact.address}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{contact.industry}</Badge></TableCell>
                  <TableCell className="text-sm font-medium">{contact.contactPerson}</TableCell>
                  <TableCell className="font-mono text-sm">{contact.code}</TableCell>
                  <TableCell className="font-medium text-primary hover:underline">
                    {contact.name}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{contact.taxCode}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-success" />
                      <span>{contact.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Total: {contacts.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">1 to {contacts.length}</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contacts;
