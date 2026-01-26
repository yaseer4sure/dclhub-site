import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, CheckCircle, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { events } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';
import { submitEventRegistration } from '../lib/api';
import { useParams } from 'react-router-dom';

interface EventDetailsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function EventDetailsPage({
  onNavigate,
}: EventDetailsPageProps) {
  const { id } = useParams();
  const eventId = id ?? '';
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attendanceType: '',
    organization: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const event = eventId ? events.find((e) => e.id === eventId) : undefined;

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl mb-4">Event Not Found</h1>
          <Button onClick={() => onNavigate('events')}>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitEventRegistration({
        eventId,
        ...formData,
      });
      
      toast.success('Registration submitted successfully!');
      // Navigate to confirmation page
      onNavigate('event-registration-confirmation', eventId);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
  };

  const eventDate = new Date(event.date);
  const eventEndDate = event.endDate ? new Date(event.endDate) : null;

  // Calculate countdown for upcoming events
  const timeUntilEvent = event.status === 'upcoming' 
    ? Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('events')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <div className="relative h-96">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                {event.virtual && (
                  <Badge className="absolute top-4 right-4 bg-blue-500">
                    <Video className="w-3 h-3 mr-1" />
                    Virtual Event
                  </Badge>
                )}
                {event.status === 'past' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Badge className="bg-gray-900 text-lg px-6 py-2">
                      Past Event
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-8">
                <h1 className="text-4xl mb-6">{event.name}</h1>

                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Date</div>
                      <div>
                        {eventDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Time</div>
                      <div>
                        {eventDate.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                        {eventEndDate && (
                          <> - {eventEndDate.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}</>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Location</div>
                      <div>{event.location}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Target Audience</div>
                      <div>{event.targetAudience}</div>
                    </div>
                  </div>
                </div>

                {/* Countdown */}
                {timeUntilEvent !== null && timeUntilEvent > 0 && (
                  <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
                    <div className="text-2xl mb-1">{timeUntilEvent} days</div>
                    <div className="text-sm text-gray-600">until the event</div>
                  </div>
                )}

                {/* Description */}
                <div className="prose max-w-none mb-8">
                  <h2>About This Event</h2>
                  <p>{event.description}</p>

                  <h2>Who Should Attend</h2>
                  <p>{event.targetAudience}</p>

                  <h2>What to Expect</h2>
                  <ul>
                    <li>Inspiring speakers and panel discussions</li>
                    <li>Networking opportunities with like-minded individuals</li>
                    <li>Interactive workshops and activities</li>
                    <li>Refreshments and materials provided</li>
                  </ul>
                </div>

                {event.registrationCount && (
                  <div className="mb-8 flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>{event.registrationCount} people have registered</span>
                  </div>
                )}

                {/* Registration Form */}
                {event.status === 'upcoming' && !showRegistrationForm && (
                  <Button
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    size="lg"
                  >
                    Register for This Event
                  </Button>
                )}

                {showRegistrationForm && (
                  <div className="mt-8 p-6 border rounded-lg bg-white">
                    <h3 className="text-2xl mb-6">Event Registration</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="attendanceType">Attendance Type *</Label>
                        <Select
                          value={formData.attendanceType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, attendanceType: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select attendance type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in-person">In Person</SelectItem>
                            {event.virtual && (
                              <SelectItem value="virtual">Virtual</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="organization">
                          Organization (Optional)
                        </Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organization: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowRegistrationForm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-orange-500 hover:bg-orange-600"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-xl mb-6">Quick Actions</h3>

                <div className="space-y-4">
                  {event.status === 'upcoming' && (
                    <Button
                      onClick={() => setShowRegistrationForm(true)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="lg"
                    >
                      Register Now
                    </Button>
                  )}

                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Event
                  </Button>

                  <Button
                    onClick={() => onNavigate('gallery')}
                    variant="outline"
                    className="w-full"
                  >
                    View Gallery
                  </Button>

                  <Button
                    onClick={() => onNavigate('donate')}
                    variant="outline"
                    className="w-full"
                  >
                    Support Our Work
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h4 className="mb-4">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Have questions about this event? Contact us for more information.
                  </p>
                  <Button
                    onClick={() => onNavigate('contact')}
                    variant="outline"
                    className="w-full"
                  >
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
