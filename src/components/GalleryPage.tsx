import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { galleryAlbums, events, campaigns } from '../lib/mockData';
import { Image } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [filter, setFilter] = useState<'all' | 'events' | 'campaigns'>('all');

  const filteredAlbums = galleryAlbums.filter((album) => {
    if (filter === 'all') return true;
    if (filter === 'events') return album.eventId;
    if (filter === 'campaigns') return album.campaignId;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl mb-4">Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories, real faces, real impact. See the change we're creating together.
          </p>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Albums Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlbums.map((album) => (
            <Card
              key={album.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onNavigate('gallery-album', album.id)}
            >
              <div className="relative h-64">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-black/70">
                  {album.photos.length} photos
                </Badge>
              </div>

              <CardContent className="p-5">
                <h3 className="text-xl mb-2">{album.title}</h3>
                <div className="text-sm text-gray-600">{album.year}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlbums.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No albums found.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl mb-4">Want to Be Part of Our Story?</h2>
          <p className="text-gray-600 mb-6">
            Join us at our next event or support our campaigns
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => onNavigate('events')}
              className="bg-primary hover:bg-primary/90"
            >
              View Events
            </Button>
            <Button
              onClick={() => onNavigate('campaigns')}
              variant="outline"
            >
              View Campaigns
            </Button>
            <Button
              onClick={() => onNavigate('donate')}
              variant="outline"
            >
              Donate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
