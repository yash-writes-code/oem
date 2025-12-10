import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import Dashboard from "./pages/Dashboard";
import WarrantyManagement from "./pages/WarrantyManagement";
import ServiceAnalytics from "./pages/ServiceAnalytics";
import ContractAutomation from "./pages/ContractAutomation";
import SLAMonitoring from "./pages/SLAMonitoring";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/warranty" element={<WarrantyManagement />} />
            <Route path="/analytics" element={<ServiceAnalytics />} />
            <Route path="/contracts" element={<ContractAutomation />} />
            <Route path="/sla" element={<SLAMonitoring />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
