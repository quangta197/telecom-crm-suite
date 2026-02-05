import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contacts from "./pages/Contacts";
import ContactDetail from "./pages/ContactDetail";
import Leads from "./pages/Leads";
import LeadDetail from "./pages/LeadDetail";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import CalendarPage from "./pages/Calendar";
import Proposals from "./pages/Proposals";
import ProposalDetail from "./pages/ProposalDetail";
import Quotations from "./pages/Quotations";
import Analytics from "./pages/Analytics";
import SalesMap from "./pages/SalesMap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/:id" element={<LeadDetail />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunities/:id" element={<OpportunityDetail />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposals/:id" element={<ProposalDetail />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/sales-map" element={<SalesMap />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
