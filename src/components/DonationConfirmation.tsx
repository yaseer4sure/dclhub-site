import { CheckCircle, Download, Share2, ArrowRight, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface DonationConfirmationProps {
  onNavigate: (page: string, id?: string) => void;
}

export function DonationConfirmation({ onNavigate }: DonationConfirmationProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart className="w-20 h-20 text-red-500 fill-red-500" />
                <CheckCircle className="w-8 h-8 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
              </div>
            </div>

            <h1 className="text-3xl mb-4">Thank You for Your Generosity!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your donation will make a real difference in the lives of those we serve.
            </p>

            {/* Donation Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg mb-4">Donation Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span>$100.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span>One-Time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="text-sm">DCL-{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
            </div>

            {/* Impact Statement */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg mb-2">Your Impact</h3>
              <p className="text-gray-600">
                Your $100 donation will sponsor a month of mentorship for 10 girls in our education program.
              </p>
            </div>

            {/* Next Steps */}
            <div className="mb-8 text-left">
              <h3 className="text-lg mb-4">What Happens Next?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>You'll receive a receipt and tax documentation via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>We'll send you regular updates on how your donation is making a difference</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>You'll be added to our community of supporters</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-red-500 hover:bg-red-600" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>

              <Button variant="outline" className="w-full" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share Your Impact
              </Button>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  onClick={() => onNavigate('gallery')}
                  variant="outline"
                >
                  View Gallery
                </Button>
                <Button
                  onClick={() => onNavigate('volunteer')}
                  variant="outline"
                >
                  Volunteer
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
