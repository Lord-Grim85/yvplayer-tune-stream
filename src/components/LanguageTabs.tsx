
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import PlaylistGrid from "./PlaylistGrid";

export type Language = "english" | "hindi";

interface LanguageTabsProps {
  className?: string;
  defaultLanguage?: Language;
}

const LanguageTabs = ({ className, defaultLanguage = "english" }: LanguageTabsProps) => {
  const [activeLanguage, setActiveLanguage] = useState<Language>(defaultLanguage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeLanguage]);

  const handleLanguageChange = (value: string) => {
    setIsLoading(true);
    setActiveLanguage(value as Language);
  };

  return (
    <Tabs
      defaultValue={defaultLanguage}
      onValueChange={handleLanguageChange}
      className={cn("w-full", className)}
    >
      <div className="sticky top-0 z-10 py-4 glass">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger 
            value="english" 
            className="text-base py-3 data-[state=active]:shadow-md transition-all"
          >
            English
          </TabsTrigger>
          <TabsTrigger 
            value="hindi" 
            className="text-base py-3 data-[state=active]:shadow-md transition-all"
          >
            Hindi
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent 
        value="english" 
        className="mt-6 animate-slide-in"
      >
        <PlaylistGrid language="english" isLoading={isLoading} />
      </TabsContent>

      <TabsContent 
        value="hindi" 
        className="mt-6 animate-slide-in"
      >
        <PlaylistGrid language="hindi" isLoading={isLoading} />
      </TabsContent>
    </Tabs>
  );
};

export default LanguageTabs;
