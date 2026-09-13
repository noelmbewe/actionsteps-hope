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
import Testimonies from "./pages/Testimonies.tsx";
import Donate from "./pages/Donate.tsx";
import PressRoom from "./pages/PressRoom.tsx";
import Contact from "./pages/Contact.tsx";
import Articles from "./pages/Articles.tsx";
import ArticleDetail from "./pages/ArticleDetail.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminArticles from "./pages/admin/AdminArticles.tsx";
import AdminArticleForm from "./pages/admin/AdminArticleForm.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";

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
          <Route path="/testimonies" element={<Testimonies />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/press-room" element={<PressRoom />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminArticles />} />
          <Route path="/admin/articles/new" element={<AdminArticleForm />} />
          <Route path="/admin/articles/:id/edit" element={<AdminArticleForm />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
