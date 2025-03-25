import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getPlaylists } from '@/lib/supabase'

export default function Home() {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english')

  const { data: playlists, isLoading } = useQuery({
    queryKey: ['playlists', language],
    queryFn: () => getPlaylists(language),
  })

  return (
    <div className="container py-8">
      <Tabs defaultValue="english" onValueChange={(value) => setLanguage(value as 'english' | 'hindi')}>
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="hindi">Hindi</TabsTrigger>
        </TabsList>
        <TabsContent value="english" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <p>Loading playlists...</p>
            ) : (
              playlists?.map((playlist) => (
                <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{playlist.title}</CardTitle>
                      <CardDescription>{playlist.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Created on {new Date(playlist.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="hindi" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <p>Loading playlists...</p>
            ) : (
              playlists?.map((playlist) => (
                <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{playlist.title}</CardTitle>
                      <CardDescription>{playlist.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Created on {new Date(playlist.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 