import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import About from "./pages/About.tsx";
import Arise from "./pages/Arise.tsx";
import Ascend from "./pages/Ascend.tsx";
import Impact from "./pages/Impact.tsx";
import Education from "./pages/Education.tsx";
import Testimonials from "./pages/Testimonials.tsx";
import Donate from "./pages/Donate.tsx";
import Advocacy from "./pages/Advocacy.tsx";
import Contact from "./pages/Contact.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs/arise" element={<Arise />} />
          <Route path="/programs/ascend" element={<Ascend />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/education" element={<Education />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/advocacy" element={<Advocacy />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
