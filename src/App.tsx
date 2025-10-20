
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentRegister from "./pages/StudentRegister";
import SchoolRegister from "./pages/SchoolRegister";
import CountryDetail from "./pages/CountryDetail";
import NotFound from "./pages/NotFound";
import ComecarAgora from "./pages/ComecarAgora";
import FaleConsultor from "./pages/FaleConsultor";
import CandidatarSe from "./pages/CandidatarSe";
import SouEscola from "./pages/SouEscola";
import EsqueciSenha from "./pages/EsqueciSenha";
import Paises from "./pages/Paises";
import QuemSomos from "./pages/QuemSomos";
import Programas from "./pages/Programas";
import Dashboard from "./pages/Dashboard";
import Precos from "./pages/Precos";
import AdminDashboard from "./pages/AdminDashboard";
import CadastrarPrograma from "./pages/CadastrarPrograma";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cadastro-estudante" element={<StudentRegister />} />
            {!isMobile && <Route path="/cadastro-escola" element={<SchoolRegister />} />}
            <Route path="/pais/:countrySlug" element={<CountryDetail />} />
            <Route path="/paises" element={<Paises />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/programas" element={<Programas />} />
            <Route path="/precos" element={<Precos />} />
            <Route path="/comecar-agora" element={<ComecarAgora />} />
            <Route path="/fale-consultor" element={<FaleConsultor />} />
            <Route path="/candidatar-se" element={<CandidatarSe />} />
            <Route path="/sou-escola" element={<SouEscola />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cadastrar-programa" element={<CadastrarPrograma />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
