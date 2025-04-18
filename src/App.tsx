import { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import { routes } from "./lib/config";
import { ThemeProvider } from "./lib/ThemeContext";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

// Define a priority loading mechanism for critical components
const withPriorityLoading = (importFn: () => Promise<any>) => {
  return lazy(() => {
    const prefetchPromise = importFn();
    return prefetchPromise;
  });
};

// Priority components (loaded during initial bootstrap)
const Index = withPriorityLoading(() => import("./pages/Index"));
const SplashCursor = withPriorityLoading(() => import("./reactbits/SplashCursor"));

// Secondary components (loaded after main content is displayed)
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Improved loading fallback with subtle animation
const LoadingFallback = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-4 border-tech-blue border-t-transparent animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-2 border-tech-purple border-b-transparent animate-spin animate-delay-150"></div>
    </div>
  </div>
);

// Layout component to wrap routes that need navbar
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  </>
);

// Layout for interactive experiences (without navbar)
const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-screen w-screen overflow-hidden">
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      try {
        // Start loading the main page in the background
        const indexPagePromise = import("./pages/Index");
        
        // Preload critical assets (fonts, hero images, etc)
        const criticalImagePromises = [
          // Add critical images here if needed
          // new Promise(resolve => {
          //   const img = new Image();
          //   img.src = "/path/to/critical/image.jpg";
          //   img.onload = resolve;
          // })
        ];
        
        // Only wait for index page in development
        // In production, show the loader for minimum time for UX reasons
        if (import.meta.env.DEV) {
          await indexPagePromise;
          await Promise.all(criticalImagePromises);
        } else {
          // In production, show loader for a short time for visual consistency
          // but also reduce the minimum time from 1000ms to 600ms for faster loading
          await Promise.race([
            Promise.all([indexPagePromise, ...criticalImagePromises]),
            new Promise(resolve => setTimeout(resolve, 600)),
          ]);
        }
      } catch (error) {
        console.error("Error preloading resources:", error);
      }
    };
    
    preloadResources().then(() => {
      // When resources are loaded, set loading to false
      setIsLoading(false);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* Use LazyMotion with domAnimation to improve performance */}
        <LazyMotion features={domAnimation} strict>
          <TooltipProvider>
            <Toaster />
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
              ) : (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="hardware-accelerated"
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <SplashCursor />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        {/* Main Routes with Navbar */}
                        <Route 
                          path={routes.home} 
                          element={<MainLayout><Index /></MainLayout>} 
                        />
                        <Route 
                          path={routes.playground} 
                          element={<MainLayout><Playground /></MainLayout>} 
                        />

                        {/* 3D Worlds - Full Screen Experiences */}
                        <Route 
                          path={routes.worlds.globe} 
                          element={<PlaygroundLayout><FullScreenGlobe /></PlaygroundLayout>} 
                        />
                        <Route 
                          path={routes.worlds.galaxy} 
                          element={<PlaygroundLayout><GalaxyScene /></PlaygroundLayout>} 
                        />
                        <Route 
                          path={routes.worlds.cosmicSphere} 
                          element={<PlaygroundLayout><CosmicSphere /></PlaygroundLayout>} 
                        />
                        <Route 
                          path={routes.worlds.cube2} 
                          element={<PlaygroundLayout><Cube2 /></PlaygroundLayout>} 
                        />
                        <Route 
                          path={routes.worlds.cube3} 
                          element={<PlaygroundLayout><RubiksCubeShuffle /></PlaygroundLayout>} 
                        />

                        {/* Games */}
                        <Route 
                          path={routes.games.rubiksCube} 
                          element={<PlaygroundLayout><RubiksCubeScene /></PlaygroundLayout>} 
                        />
                        <Route 
                          path={routes.games.snake} 
                          element={<PlaygroundLayout><SnakeGame /></PlaygroundLayout>} 
                        />
                        <Route 
                          path={routes.games.carGame} 
                          element={<PlaygroundLayout><CarGame /></PlaygroundLayout>} 
                        />

                        {/* 404 Not Found */}
                        <Route 
                          path="*" 
                          element={<MainLayout><NotFound /></MainLayout>} 
                        />
                      </Routes>
                    </BrowserRouter>
                  </Suspense>
                </m.div>
              )}
            </AnimatePresence>
          </TooltipProvider>
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
