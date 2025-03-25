import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getVideos } from '@/lib/supabase'

export default function Playlist() {
  const { id } = useParams<{ id: string }>()

  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos', id],
    queryFn: () => getVideos(id!),
    enabled: !!id,
  })

  return (
    <div className="container py-8">
      <div className="grid gap-4">
        {isLoading ? (
          <p>Loading videos...</p>
        ) : (
          videos?.map((video) => (
            <Card key={video.id}>
              <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 