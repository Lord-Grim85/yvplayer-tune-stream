
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
}

const VideoPlayer = ({ videoId, title, autoplay = false, className }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [videoId]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${
    autoplay ? "1" : "0"
  }&rel=0&modestbranding=1`;

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="animate-pulse flex space-x-2">
            <div className="h-3 w-3 bg-primary rounded-full"></div>
            <div className="h-3 w-3 bg-primary rounded-full"></div>
            <div className="h-3 w-3 bg-primary rounded-full"></div>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center p-4">
            <p className="text-destructive font-medium">Failed to load video</p>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                if (iframeRef.current) {
                  iframeRef.current.src = embedUrl;
                }
              }}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}
      
      <div className="aspect-video">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title || `YouTube video ${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleLoad}
          onError={handleError}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
