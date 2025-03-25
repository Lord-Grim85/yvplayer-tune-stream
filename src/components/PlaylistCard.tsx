
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Playlist } from "./PlaylistGrid";

interface PlaylistCardProps {
  playlist: Playlist;
  className?: string;
}

const PlaylistCard = ({ playlist, className }: PlaylistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/playlist/${playlist.id}`}>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-md", 
          isHovered ? "transform scale-[1.02]" : "", 
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={playlist.thumbnailUrl} 
            alt={playlist.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500", 
              isHovered ? "scale-105" : ""
            )}
            loading="lazy"
          />
          <div className={cn(
            "absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 transition-opacity duration-300",
            isHovered ? "opacity-100" : ""
          )}>
            <div className="bg-white/90 dark:bg-black/80 p-3 rounded-full transform scale-90 transition-transform duration-300 hover:scale-100">
              <Play size={24} className="text-primary" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 text-xs rounded-md">
            {playlist.videoCount} videos
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium truncate mb-1">{playlist.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{playlist.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
