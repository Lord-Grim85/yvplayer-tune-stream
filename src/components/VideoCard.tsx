
import { cn } from "@/lib/utils";
import { Video } from "./VideoList";
import { Play } from "lucide-react";

interface VideoCardProps {
  video: Video;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const VideoCard = ({ video, isActive = false, onClick, className }: VideoCardProps) => {
  return (
    <div 
      className={cn(
        "flex gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50",
        isActive ? "bg-muted" : "bg-transparent",
        className
      )}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-[160px] h-[90px] object-cover rounded-md"
          loading="lazy"
        />
        <div className="absolute right-1 bottom-1 bg-black/70 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity rounded-md",
          "hover:opacity-100"
        )}>
          <div className="bg-black/60 p-2 rounded-full">
            <Play size={16} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
