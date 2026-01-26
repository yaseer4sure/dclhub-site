import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PartnerConfirmationProps {
  onNavigate: (page: string, id?: string) => void;
}

export function PartnerConfirmation({ onNavigate }: PartnerConfirmationProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>

            <h1 className="text-3xl mb-4">Thank You for Your Interest!</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're excited about the possibility of partnering with you
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg mb-4">What's Next?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Our partnerships team will review your inquiry within 3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>We'll schedule a call to discuss partnership opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>You'll receive our partnership prospectus and impact reports</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => onNavigate('impact')} variant="outline">
                  View Impact Reports
                </Button>
                <Button onClick={() => onNavigate('campaigns')} variant="outline">
                  View Campaigns
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
