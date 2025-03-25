
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import VideoList, { Video } from "@/components/VideoList";
import { Playlist } from "@/components/PlaylistGrid";

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

const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlaylist = async () => {
      setIsLoading(true);
      // This would be a Supabase query in production
      const data = getMockPlaylist(id || "");
      setPlaylist(data);
      setIsLoading(false);
    };

    loadPlaylist();
  }, [id]);

  const handleVideoSelect = (video: Video) => {
    navigate(`/video/${video.id}?playlist=${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl page-transition-in">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={18} className="mr-1" /> Back
      </Button>
      
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-[450px] w-full rounded-lg" />
        </div>
      ) : playlist ? (
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{playlist.title}</h1>
            <p className="text-muted-foreground">{playlist.description}</p>
          </div>
          
          <div className="mb-8">
            <img 
              src={playlist.thumbnailUrl}
              alt={playlist.title}
              className="w-full h-auto rounded-lg max-h-[450px] object-cover"
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Videos in this playlist</h2>
          <VideoList 
            playlistId={playlist.id} 
            onVideoSelect={handleVideoSelect}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Playlist not found</p>
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

export default PlaylistPage;
