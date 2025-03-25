
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "./VideoCard";
import { cn } from "@/lib/utils";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoId: string; // YouTube video ID
  duration: string;
}

interface VideoListProps {
  playlistId: string;
  activeVideoId?: string;
  onVideoSelect?: (video: Video) => void;
  isLoading?: boolean;
  className?: string;
}

// Mock data - would be replaced with Supabase query
const getMockVideos = (playlistId: string): Video[] => {
  if (playlistId === "1") {
    return [
      {
        id: "v1",
        title: "React Basics",
        description: "Learn the fundamentals of React",
        thumbnailUrl: "https://picsum.photos/280/157?random=10",
        videoId: "w7ejDZ8SWv8",
        duration: "10:15",
      },
      {
        id: "v2",
        title: "React Hooks",
        description: "Understanding React hooks in depth",
        thumbnailUrl: "https://picsum.photos/280/157?random=11",
        videoId: "TNhaISOUy6Q",
        duration: "18:22",
      },
      {
        id: "v3",
        title: "State Management",
        description: "Managing state in React applications",
        thumbnailUrl: "https://picsum.photos/280/157?random=12",
        videoId: "O6P86uwfdR0",
        duration: "14:30",
      },
    ];
  } else if (playlistId === "5") {
    return [
      {
        id: "v4",
        title: "जावास्क्रिप्ट परिचय",
        description: "जावास्क्रिप्ट की मूल बातें",
        thumbnailUrl: "https://picsum.photos/280/157?random=13",
        videoId: "hKB-YGF14SY",
        duration: "12:45",
      },
      {
        id: "v5",
        title: "DOM मैनिपुलेशन",
        description: "DOM के साथ काम करना",
        thumbnailUrl: "https://picsum.photos/280/157?random=14",
        videoId: "1y8aYd9CqZI",
        duration: "15:10",
      },
    ];
  } else {
    return [
      {
        id: "v6",
        title: "Sample Video 1",
        description: "Description for sample video",
        thumbnailUrl: "https://picsum.photos/280/157?random=15",
        videoId: "IyBwvNiqGdI",
        duration: "08:20",
      },
      {
        id: "v7",
        title: "Sample Video 2",
        description: "Another sample video description",
        thumbnailUrl: "https://picsum.photos/280/157?random=16",
        videoId: "0riHps91AzE",
        duration: "11:05",
      },
    ];
  }
};

const VideoList = ({ 
  playlistId, 
  activeVideoId, 
  onVideoSelect, 
  isLoading = false,
  className 
}: VideoListProps) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // This would be a Supabase query in production
    setVideos(getMockVideos(playlistId));
  }, [playlistId]);

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex space-x-3">
            <Skeleton className="h-[90px] w-[160px] rounded-md flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">No videos found in this playlist.</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isActive={activeVideoId === video.id}
          onClick={() => onVideoSelect?.(video)}
        />
      ))}
    </div>
  );
};

export default VideoList;
