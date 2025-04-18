import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashCursor from "./reactbits/SplashCursor";
import Playground from "./components/Playground";
import TorusKnotPage from "./pages/TorusKnot";
import RubiksCubeScene from "./components/RubiksCube";
import FullScreenGlobe from "./components/GlobeComponent";
import DinoGame from "./components/DinoGame";
import SnakeGame from "./components/SnakeGame";
import GalaxyScene from "./components/GalaxyScene";
import Cube2 from "./components/cube2";
import RubiksCubeShuffle from "./components/InfiniteShuffle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SplashCursor />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/globe" element={<FullScreenGlobe />} />

          {/* GAMES */}
          <Route path="/torus" element={<TorusKnotPage />} /> 
          <Route path="/cube" element={<RubiksCubeScene />} />
          <Route path="/dino" element={<SnakeGame />} />
          <Route path="/gala" element={<GalaxyScene />} />
          <Route path="/Cube2" element={<Cube2 />} />
          <Route path="/Cube3" element={<RubiksCubeShuffle />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
