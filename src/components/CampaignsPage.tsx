import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { campaigns } from '../lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CampaignsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function CampaignsPage({ onNavigate }: CampaignsPageProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredCampaigns =
    filter === 'all'
      ? campaigns
      : campaigns.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Our Campaigns</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our initiatives and be part of the change. Every campaign represents hope, progress, and real impact.
          </p>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    campaign.status === 'active'
                      ? 'bg-green-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {campaign.status === 'active' ? 'Active' : 'Completed'}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {campaign.category}
                  </Badge>
                </div>

                <h3 className="text-xl mb-3">{campaign.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {campaign.shortDescription}
                </p>

                <div className="mb-6">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Raised</span>
                    <span>
                      N{campaign.currentAmount.toLocaleString()} of N
                      {campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(campaign.currentAmount / campaign.goal) * 100}
                    className="h-2 "
                  />
                  <div className="mt-2 text-sm text-gray-600">
                    {Math.round(
                      (campaign.currentAmount / campaign.goal) * 100
                    )}
                    % funded
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      onNavigate('campaign-details', campaign.id)
                    }
                    variant="outline"
                    className="flex-1"
                  >
                    Learn More
                  </Button>
                  <Button
                    onClick={() => onNavigate('donate')}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    Donate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No campaigns found.</p>
          </div>
        )}
      </div>
    </div>
  );
}