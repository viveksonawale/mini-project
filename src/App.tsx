import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Index from "./pages/public/Index";
import NotFound from "./pages/public/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import OrganiserDashboard from "./pages/organizer/Dashboard";
import CreateHackathon from "./pages/organizer/CreateHackathon";
import ReviewSubmissions from "./pages/organizer/ReviewSubmissions";
import ManageHackathon from "./pages/organizer/ManageHackathon";
import Leaderboard from "./pages/public/Leaderboard";
import BrowseHackathons from "./pages/public/BrowseHackathons";
import HackathonDetail from "./pages/public/HackathonDetail";
import ParticipantDashboard from "./pages/participant/Dashboard";
import TeamManagement from "./pages/participant/TeamManagement";
import SubmitProject from "./pages/participant/SubmitProject";
import About from "./pages/public/About";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/hackathons" element={<BrowseHackathons />} />
                <Route path="/hackathons/:id" element={<HackathonDetail />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/about" element={<About />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Organizer Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/organizer/dashboard" element={<OrganiserDashboard />} />
                  <Route path="/organizer/create-hackathon" element={<CreateHackathon />} />
                  <Route path="/organizer/hackathon/:hackathonId/manage" element={<ManageHackathon />} />
                  <Route path="/organizer/hackathon/:hackathonId/submissions" element={<ReviewSubmissions />} />
                </Route>

                {/* Participant Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
                  <Route path="/participant/hackathons/:hackathonId/team" element={<TeamManagement />} />
                  <Route path="/participant/hackathons/:hackathonId/submit" element={<SubmitProject />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </NotificationProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;