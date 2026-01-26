import { Calendar, MapPin, Users, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { events } from '../lib/mockData';

interface EventsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function EventsPage({ onNavigate }: EventsPageProps) {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'past');

  const EventCard = ({ event }: { event: typeof events[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-56">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        {event.virtual && (
          <Badge className="absolute top-3 right-3 bg-blue-500">
            <Video className="w-3 h-3 mr-1" />
            Virtual
          </Badge>
        )}
        {event.status === 'past' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge className="bg-gray-900">Past Event</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">
              {event.virtual ? 'Virtual' : event.location}
            </span>
          </div>
        </div>

        <h3 className="text-xl mb-3">{event.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          {event.registrationCount && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{event.registrationCount} registered</span>
            </div>
          )}
          <Button
            onClick={() => onNavigate('event-details', event.id)}
            className={
              event.status === 'upcoming'
                ? 'bg-orange-500 hover:bg-orange-600'
                : ''
            }
            variant={event.status === 'past' ? 'outline' : 'default'}
          >
            {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us at our upcoming events or explore highlights from past gatherings. Every event is an opportunity to connect, learn, and make a difference.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming Events ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Events ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-8">
            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No upcoming events at the moment. Check back soon!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-8">
            {pastEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No past events to display.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}