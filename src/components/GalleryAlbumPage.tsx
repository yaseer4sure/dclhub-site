import { useState } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { galleryAlbums } from '../lib/mockData';
import { Dialog, DialogContent } from './ui/dialog';
import { useParams } from 'react-router-dom';

interface GalleryAlbumPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function GalleryAlbumPage({
  onNavigate,
}: GalleryAlbumPageProps) {
  const { id } = useParams();
  const albumId = id ?? '';
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const album = albumId ? galleryAlbums.find((a) => a.id === albumId) : undefined;

  if (!album) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl mb-4">Album Not Found</h1>
          <Button onClick={() => onNavigate('gallery')}>
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === album.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? album.photos.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('gallery')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Button>

        {/* Album Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">{album.title}</h1>
          <p className="text-gray-600">
            {album.photos.length} photos - {album.year}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {album.photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
            >
              <img
                src={photo}
                alt={`${album.title} ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center p-8 bg-white rounded-lg">
          <h2 className="text-2xl mb-4">Inspired by What You See?</h2>
          <p className="text-gray-600 mb-6">
            Help us create more moments like these
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => onNavigate('donate')}
              className="bg-red-500 hover:bg-red-600"
            >
              Donate
            </Button>
            <Button
              onClick={() => onNavigate('volunteer')}
              variant="outline"
            >
              Volunteer
            </Button>
            {album.eventId && (
              <Button
                onClick={() => onNavigate('event-details', album.eventId)}
                variant="outline"
              >
                View Event Details
              </Button>
            )}
          </div>
        </div>

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-7xl h-[90vh] p-0 bg-black">
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <img
                src={album.photos[currentImageIndex]}
                alt={`${album.title} ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
                {currentImageIndex + 1} / {album.photos.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
