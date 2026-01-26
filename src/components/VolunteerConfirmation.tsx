import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface VolunteerConfirmationProps {
  onNavigate: (page: string, id?: string) => void;
}

export function VolunteerConfirmation({ onNavigate }: VolunteerConfirmationProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>

            <h1 className="text-3xl mb-4">Welcome to the Team!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for stepping up to make a difference
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg mb-4">What Happens Next?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>We'll review your application within 48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>You'll receive an email with next steps and orientation details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Join our volunteer WhatsApp group to connect with the community</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>We'll match you with opportunities that fit your skills and availability</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-red-500 hover:bg-red-600" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join WhatsApp Group
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => onNavigate('events')} variant="outline">
                  View Events
                </Button>
                <Button onClick={() => onNavigate('gallery')} variant="outline">
                  View Gallery
                </Button>
              </div>

              <Button
                onClick={() => onNavigate('home')}
                variant="ghost"
                className="w-full"
              >
                Return to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
