import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/site/Layout';
import HashRedirect from '@/components/site/HashRedirect';
import Index from './pages/Index';
import AboutPage from './pages/About';
import LegalPage from './pages/Legal';
import LibraryPage from './pages/Library';
import VolunteeringPage from './pages/Volunteering';
import InclusivePage from './pages/Inclusive';
import AuthoritiesPage from './pages/Authorities';
import ContactsPage from './pages/Contacts';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <HashRedirect />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/meetings" element={<Navigate to="/about#meetings" replace />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/volunteering" element={<VolunteeringPage />} />
            <Route path="/inclusive" element={<InclusivePage />} />
            <Route path="/authorities" element={<AuthoritiesPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/members" element={<Navigate to="/about" replace />} />
            <Route path="/groups" element={<Navigate to="/about" replace />} />
            <Route path="/reports" element={<Navigate to="/about" replace />} />
            <Route path="/documents" element={<Navigate to="/library" replace />} />
            <Route path="/recommendations" element={<Navigate to="/library" replace />} />
            <Route path="/control" element={<Navigate to="/legal" replace />} />
            <Route path="/volunteers" element={<Navigate to="/volunteering" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
