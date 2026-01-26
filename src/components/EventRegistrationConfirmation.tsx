import { CheckCircle, Calendar, Download, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { events } from '../lib/mockData';
import { useParams } from 'react-router-dom';

interface EventRegistrationConfirmationProps {
  onNavigate: (page: string, id?: string) => void;
}

export function EventRegistrationConfirmation({
  onNavigate,
}: EventRegistrationConfirmationProps) {
  const { id } = useParams();
  const event = id ? events.find((e) => e.id === id) : undefined;

  if (!event) {
    return null;
  }

  const eventDate = new Date(event.date);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>

            <h1 className="text-3xl mb-4">Registration Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8">
              You're all set for {event.name}
            </p>

            {/* Event Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg mb-4">Event Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Event:</span>
                  <span className="ml-2">{event.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <span className="ml-2">
                    {eventDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Time:</span>
                  <span className="ml-2">
                    {eventDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="ml-2">{event.location}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-8 text-left">
              <h3 className="text-lg mb-4">What's Next?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">-</span>
                  <span>Check your email for a confirmation and event details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">-</span>
                  <span>Add the event to your calendar using the button below</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">-</span>
                  <span>Join our WhatsApp group to stay updated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">-</span>
                  <span>Share the event with friends who might be interested</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>

              <Button variant="outline" className="w-full" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join WhatsApp Group
              </Button>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={() => onNavigate('gallery')}
                  variant="outline"
                >
                  View Gallery
                </Button>
                <Button
                  onClick={() => onNavigate('donate')}
                  variant="outline"
                >
                  Donate
                </Button>
              </div>

              <Button
                onClick={() => onNavigate('campaigns')}
                variant="ghost"
                className="w-full"
              >
                Explore Campaigns
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
