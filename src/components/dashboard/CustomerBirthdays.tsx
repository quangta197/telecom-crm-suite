import { Gift, Phone, MessageSquare, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BirthdayCustomer {
  id: string;
  name: string;
  birthDate: string;
  age: number;
  avatar?: string;
}

const customers: BirthdayCustomer[] = [
  {
    id: "1",
    name: "Vu Quynh Chi",
    birthDate: "30/08/1994",
    age: 29,
  },
  {
    id: "2",
    name: "Nguyen Hoa Sen",
    birthDate: "02/09/1992",
    age: 31,
  },
  {
    id: "3",
    name: "Tran Thanh Tung",
    birthDate: "15/09/1998",
    age: 25,
  },
  {
    id: "4",
    name: "Nguyen Duc Binh",
    birthDate: "21/09/1995",
    age: 28,
  },
  {
    id: "5",
    name: "Le Minh Tuan",
    birthDate: "01/10/1983",
    age: 40,
  },
];

export function CustomerBirthdays() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Customer Birthdays</h3>
          <Badge variant="secondary" className="rounded-full">10</Badge>
        </div>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">In the next 90 days</p>

      <div className="space-y-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {customer.name.split(" ").slice(-2).map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{customer.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{customer.birthDate}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Gift className="h-3 w-3 text-rose-500" />
                  <span>{customer.age} years old</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
