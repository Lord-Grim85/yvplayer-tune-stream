import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getVideo } from '@/lib/supabase'

export default function Video() {
  const { id } = useParams<{ id: string }>()

  const { data: video, isLoading } = useQuery({
    queryKey: ['video', id],
    queryFn: () => getVideo(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return <p>Loading video...</p>
  }

  if (!video) {
    return <p>Video not found</p>
  }

  return (
    <div className="container py-8">
      <Card>
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
    </div>
  )
} 