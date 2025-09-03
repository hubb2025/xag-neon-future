import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Auth from "./pages/Auth";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Customers from "./pages/admin/Customers";
import Drones from "./pages/admin/Drones";
import Support from "./pages/admin/Support";
import Orders from "./pages/admin/Orders";
import ApiTokens from "./pages/admin/ApiTokens";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import ServiceContract from "./pages/ServiceContract";
import XagPhantomPro from "./pages/XagPhantomPro";
import XagStealthElite from "./pages/XagStealthElite";
import XagCargoMaster from "./pages/XagCargoMaster";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="drones" element={<Drones />} />
              <Route path="support" element={<Support />} />
              <Route path="orders" element={<Orders />} />
              <Route path="tokens" element={<ApiTokens />} />
            </Route>
            <Route path="/drones/xag-phantom-pro" element={<XagPhantomPro />} />
            <Route path="/drones/xag-stealth-elite" element={<XagStealthElite />} />
            <Route path="/drones/xag-cargo-master" element={<XagCargoMaster />} />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-uso" element={<TermsOfService />} />
            <Route path="/politica-cookies" element={<CookiePolicy />} />
            <Route path="/contrato-servicos" element={<ServiceContract />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
