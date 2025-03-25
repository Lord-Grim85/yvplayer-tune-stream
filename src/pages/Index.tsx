
import { useState, useEffect } from "react";
import LanguageTabs from "@/components/LanguageTabs";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background page-transition-in">
      <header className="sticky top-0 z-20 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              YVPlayer
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="mt-4 mb-8">
          <LanguageTabs />
        </div>
      </main>
    </div>
  );
};

export default Index;
