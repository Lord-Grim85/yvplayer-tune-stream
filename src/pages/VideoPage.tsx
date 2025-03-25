
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/VideoPlayer";
import VideoList, { Video } from "@/components/VideoList";
import { Playlist } from "@/components/PlaylistGrid";

// Mock data - would be replaced with Supabase query
const getMockVideo = (id: string): Video | null => {
  const allVideos = [
    {
      id: "v1",
      title: "React Basics",
      description: "Learn the fundamentals of React including components, props, and state. This tutorial covers everything you need to know to get started with React development.",
      thumbnailUrl: "https://picsum.photos/280/157?random=10",
      videoId: "w7ejDZ8SWv8",
      duration: "10:15",
    },
    {
      id: "v4",
      title: "जावास्क्रिप्ट परिचय",
      description: "जावास्क्रिप्ट की मूल बातें एवं उपयोग। इस वीडियो में आप जावास्क्रिप्ट प्रोग्रामिंग के आधारभूत सिद्धांतों के बारे में जानेंगे।",
      thumbnailUrl: "https://picsum.photos/280/157?random=13",
      videoId: "hKB-YGF14SY",
      duration: "12:45",
    },
  ];
  
  return allVideos.find(v => v.id === id) || null;
};

// Mock data - would be replaced with Supabase query
const getMockPlaylist = (id: string): Playlist | null => {
  const playlists = [
    {
      id: "1",
      title: "Learning React",
      description: "Tutorials for React beginners",
      thumbnailUrl: "https://picsum.photos/800/450?random=1",
      videoCount: 12,
    },
    {
      id: "5",
      title: "हिंदी में प्रोग्रामिंग",
      description: "प्रोग्रामिंग की मूल बातें",
      thumbnailUrl: "https://picsum.photos/800/450?random=5",
      videoCount: 14,
    },
  ];
  
  return playlists.find(p => p.id === id) || null;
};

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get("playlist");
  const navigate = useNavigate();
  
  const [video, setVideo] = useState<Video | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // This would be Supabase queries in production
      const videoData = getMockVideo(id || "");
      setVideo(videoData);
      
      if (playlistId) {
        const playlistData = getMockPlaylist(playlistId);
        setPlaylist(playlistData);
      }
      
      setIsLoading(false);
    };

    loadData();
  }, [id, playlistId]);

  const handleVideoSelect = (newVideo: Video) => {
    navigate(`/video/${newVideo.id}?playlist=${playlistId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl page-transition-in">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate(playlistId ? `/playlist/${playlistId}` : "/")}
      >
        <ChevronLeft size={18} className="mr-1" /> 
        {playlistId ? "Back to playlist" : "Back to home"}
      </Button>
      
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-[450px] w-full rounded-lg" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ) : video ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer videoId={video.videoId} title={video.title} autoplay={true} />
            
            <div>
              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
              <p className="text-muted-foreground">{video.description}</p>
            </div>
          </div>
          
          {playlistId && (
            <div>
              <h2 className="text-xl font-semibold mb-4">More from this playlist</h2>
              <VideoList 
                playlistId={playlistId} 
                activeVideoId={video.id} 
                onVideoSelect={handleVideoSelect}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Video not found</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Go home
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
