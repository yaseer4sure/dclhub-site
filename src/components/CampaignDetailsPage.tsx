import { ArrowLeft, Share2, Heart, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { campaigns } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';
import { useParams } from 'react-router-dom';

interface CampaignDetailsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function CampaignDetailsPage({
  onNavigate,
}: CampaignDetailsPageProps) {
  const { id } = useParams();
  const campaign = id ? campaigns.find((c) => c.id === id) : undefined;

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl mb-4">Campaign Not Found</h1>
          <Button onClick={() => onNavigate('campaigns')}>
            Back to Campaigns
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('campaigns')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <div className="relative h-96">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <Badge
                  className={`absolute top-4 right-4 ${
                    campaign.status === 'active'
                      ? 'bg-green-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {campaign.status === 'active' ? 'Active' : 'Completed'}
                </Badge>
              </div>

              <CardContent className="p-8">
                <div className="mb-4">
                  <Badge variant="outline">{campaign.category}</Badge>
                </div>

                <h1 className="text-4xl mb-4">{campaign.title}</h1>

                <div className="mb-8">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-600">Raised</span>
                    <span className="text-xl">
                      N{campaign.currentAmount.toLocaleString()} of N
                      {campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(campaign.currentAmount / campaign.goal) * 100}
                    className="h-3"
                  />
                  <div className="mt-3 text-gray-600">
                    {Math.round(
                      (campaign.currentAmount / campaign.goal) * 100
                    )}
                    % funded - {campaign.timeline}
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  <h2>About This Campaign</h2>
                  <p>{campaign.description}</p>

                  <h2>Impact Goal</h2>
                  <p>{campaign.impactGoal}</p>

                  <h2>Timeline</h2>
                  <p>{campaign.timeline}</p>

                  <h2>How You Can Help</h2>
                  <ul>
                    <li>Make a donation to support this initiative</li>
                    <li>Volunteer your time and skills</li>
                    <li>Share this campaign with your network</li>
                    <li>Partner with us for greater impact</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => onNavigate('donate')}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                    size="lg"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                  <Button
                    onClick={() => onNavigate('volunteer')}
                    variant="outline"
                    size="lg"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Volunteer
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="lg"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-xl mb-6">Quick Actions</h3>

                <div className="space-y-4">
                  <Button
                    onClick={() => onNavigate('donate')}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    size="lg"
                  >
                    Donate Now
                  </Button>

                  <Button
                    onClick={() => onNavigate('volunteer')}
                    variant="outline"
                    className="w-full"
                  >
                    Volunteer
                  </Button>

                  <Button
                    onClick={() => onNavigate('partner')}
                    variant="outline"
                    className="w-full"
                  >
                    Partner With Us
                  </Button>

                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Campaign
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h4 className="mb-4">Need More Info?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Have questions about this campaign? We're here to help.
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
