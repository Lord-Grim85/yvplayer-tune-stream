
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import PlaylistCard from "./PlaylistCard";
import { cn } from "@/lib/utils";

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoCount: number;
}

interface PlaylistGridProps {
  language: string;
  isLoading?: boolean;
  className?: string;
}

// Mock data - would be replaced with Supabase query
const getMockPlaylists = (language: string): Playlist[] => {
  if (language === "english") {
    return [
      {
        id: "1",
        title: "Learning React",
        description: "Tutorials for React beginners",
        thumbnailUrl: "https://picsum.photos/400/225?random=1",
        videoCount: 12,
      },
      {
        id: "2",
        title: "Web Development",
        description: "Advanced web development techniques",
        thumbnailUrl: "https://picsum.photos/400/225?random=2",
        videoCount: 8,
      },
      {
        id: "3",
        title: "UI/UX Design",
        description: "Design principles and practices",
        thumbnailUrl: "https://picsum.photos/400/225?random=3",
        videoCount: 15,
      },
      {
        id: "4",
        title: "JavaScript Mastery",
        description: "Advanced JavaScript concepts",
        thumbnailUrl: "https://picsum.photos/400/225?random=4",
        videoCount: 10,
      },
    ];
  } else {
    return [
      {
        id: "5",
        title: "हिंदी में प्रोग्रामिंग",
        description: "प्रोग्रामिंग की मूल बातें",
        thumbnailUrl: "https://picsum.photos/400/225?random=5",
        videoCount: 14,
      },
      {
        id: "6",
        title: "वेब डेवलपमेंट सीखें",
        description: "वेब डेवलपमेंट के लिए मार्गदर्शिका",
        thumbnailUrl: "https://picsum.photos/400/225?random=6",
        videoCount: 9,
      },
      {
        id: "7",
        title: "फ्रंट-एंड मास्टरी",
        description: "रिएक्ट और जावास्क्रिप्ट सीखें",
        thumbnailUrl: "https://picsum.photos/400/225?random=7",
        videoCount: 11,
      },
    ];
  }
};

const PlaylistGrid = ({ language, isLoading = false, className }: PlaylistGridProps) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // This would be a Supabase query in production
    setPlaylists(getMockPlaylists(language));
  }, [language]);

  const gridCols = isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3";

  if (isLoading) {
    return (
      <div className={cn("grid gap-6", gridCols, className)}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[225px] w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">No playlists found.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", gridCols, className)}>
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistGrid;
