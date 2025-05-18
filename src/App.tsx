import { useState, lazy, Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./lib/config";
import { ThemeProvider } from "./lib/ThemeContext";
import { LazyMotion, domAnimation, m } from "framer-motion";

// Import critical path components directly
import Index from "./pages/Index";

// Create query client instance once
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Lazy load components with mobile detection
const NotFound = lazy(() => import("./pages/NotFound"));
const Playground = lazy(() => import("./components/Playground"));
const RubiksCubeScene = lazy(() => import("./components/RubiksCube"));
const FullScreenGlobe = lazy(() => import("./components/GlobeComponent"));
const SnakeGame = lazy(() => import("./components/SnakeGame"));
const GalaxyScene = lazy(() => import("./components/GalaxyScene"));
const Cube2 = lazy(() => import("./components/cube2"));
const RubiksCubeShuffle = lazy(() => import("./components/InfiniteShuffle"));
const CosmicSphere = lazy(() => import("./components/CosmicSphere"));
const CarGame = lazy(() => import("./components/CarDrivingSimulation"));

// Ultra lightweight loading indicator
const MinimalLoader = () => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-tech-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Combined layouts with shared logic
const Layout = ({ children, isPlayground = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Setup scroll behavior and event listeners once per component mount
  useState(() => {
    // Initialize UI enhancments
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.classList.add('transition-colors', 'duration-300');

    // Handle anchor link clicks
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      
      e.preventDefault();
      const targetId = anchor.getAttribute('href')?.substring(1);
      if (!targetId) return;
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  });

  return (
    <>
      {!isPlayground && <Navbar />}
      <Suspense fallback={<MinimalLoader />}>
        <div className={isPlayground ? "h-screen w-screen overflow-hidden" : ""}>
          {children}
        </div>
      </Suspense>
    </>
  );
};

// Mobile-optimized component wrapper
const MobileOptimizedComponent = ({ children, isMobile }) => {
  if (isMobile) {
    return (
      <div className="mobile-optimize">
        {children}
      </div>
    );
  }
  return children;
};

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use inline styles for critical path rendering
  const inlineStyle = document.createElement('style');
  inlineStyle.innerHTML = `
    html, body { background-color: var(--background, #ffffff); margin: 0; }
    .fade-in { opacity: 1; transition: opacity 0.3s ease-in; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .animate-spin { animation: spin 0.8s linear infinite; }
    @media (max-width: 768px) {
      .mobile-optimize { transform: none !important; }
      .mobile-optimize * { transform: none !important; }
      .mobile-optimize .animate-spin { animation: none; }
    }
  `;
  document.head.appendChild(inlineStyle);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LazyMotion features={domAnimation} strict>
          <TooltipProvider>
            <Toaster />
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="hardware-accelerated fade-in"
            >
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route
                    path={routes.home}
                    element={<Layout><Index /></Layout>}
                  />
                  {!isMobile && (
                    <>
                      <Route
                        path={routes.playground}
                        element={<Layout><Playground /></Layout>}
                      />
                      <Route
                        path={routes.worlds.globe}
                        element={<Layout isPlayground><FullScreenGlobe /></Layout>}
                      />
                      <Route
                        path={routes.worlds.galaxy}
                        element={<Layout isPlayground><GalaxyScene /></Layout>}
                      />
                      <Route
                        path={routes.worlds.cosmicSphere}
                        element={<Layout isPlayground><CosmicSphere /></Layout>}
                      />
                      <Route
                        path={routes.worlds.cube2}
                        element={<Layout isPlayground><Cube2 /></Layout>}
                      />
                      <Route
                        path={routes.worlds.cube3}
                        element={<Layout isPlayground><RubiksCubeShuffle /></Layout>}
                      />
                      <Route
                        path={routes.games.rubiksCube}
                        element={<Layout isPlayground><RubiksCubeScene /></Layout>}
                      />
                      <Route
                        path={routes.games.snake}
                        element={<Layout isPlayground><SnakeGame /></Layout>}
                      />
                      <Route
                        path={routes.games.carGame}
                        element={<Layout isPlayground><CarGame /></Layout>}
                      />
                    </>
                  )}
                  {/* 404 Not Found */}
                  <Route
                    path="*"
                    element={<Layout><NotFound /></Layout>}
                  />
                </Routes>
              </BrowserRouter>
            </m.div>
          </TooltipProvider>
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;