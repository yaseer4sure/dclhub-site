import { Download, FileText, TrendingUp, Users, Award, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { impactStats, campaigns } from '../lib/mockData';
import { Progress } from './ui/progress';

interface ImpactPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function ImpactPage({ onNavigate }: ImpactPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <TrendingUp className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-4xl mb-4">Our Impact & Reports</h1>
          <p className="text-xl text-gray-600">
            Transparency matters. See exactly how we're making a difference and download our detailed reports.
          </p>
        </div>

        {/* Key Metrics */}
        <section className="mb-16">
          <h2 className="text-3xl text-center mb-8">Impact Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <div className="text-3xl mb-2">{impactStats.beneficiaries.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Lives Impacted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <div className="text-3xl mb-2">{impactStats.campaigns}</div>
                <div className="text-sm text-gray-600">Active Campaigns</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <div className="text-3xl mb-2">{impactStats.volunteers}</div>
                <div className="text-sm text-gray-600">Volunteers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <div className="text-3xl mb-2">{impactStats.partnersAndSponsors}</div>
                <div className="text-sm text-gray-600">Partners</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Campaign Progress */}
        <section className="mb-16">
          <h2 className="text-3xl text-center mb-8">Campaign Progress</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {campaigns.filter(c => c.status === 'active').map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl mb-2">{campaign.title}</h3>
                      <p className="text-sm text-gray-600">{campaign.impactGoal}</p>
                    </div>
                    <Button
                      onClick={() => onNavigate('campaign-details', campaign.id)}
                      variant="outline"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span>
                        ${campaign.currentAmount.toLocaleString()} of $
                        {campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(campaign.currentAmount / campaign.goal) * 100}
                      className="h-2"
                    />
                    <div className="mt-2 text-sm text-gray-600">
                      {Math.round((campaign.currentAmount / campaign.goal) * 100)}% completed
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Reports */}
        <section className="mb-16">
          <h2 className="text-3xl text-center mb-8">Downloadable Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <FileText className="w-10 h-10 text-red-500 mb-3" />
                <h3 className="text-lg mb-2">Annual Report 2025</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive overview of our activities, impact, and financials for 2025.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <FileText className="w-10 h-10 text-red-500 mb-3" />
                <h3 className="text-lg mb-2">Financial Statement 2025</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Detailed breakdown of income, expenses, and fund allocation.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <FileText className="w-10 h-10 text-red-500 mb-3" />
                <h3 className="text-lg mb-2">Impact Report Q4 2025</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Latest quarterly impact metrics and success stories.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl text-center mb-8">What People Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">
                  "DCL HUB gave me the opportunity I needed. Their scholarship program changed my life and my family's future."
                </p>
                <div>
                  <div>Grace M.</div>
                  <div className="text-sm text-gray-600">Scholarship Recipient</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">
                  "The skills training I received helped me start my own business. I'm now employing others in my community."
                </p>
                <div>
                  <div>James K.</div>
                  <div className="text-sm text-gray-600">Skills Program Graduate</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">
                  "Partnering with DCL HUB has been rewarding. They're transparent, professional, and truly impactful."
                </p>
                <div>
                  <div>Sarah T.</div>
                  <div className="text-sm text-gray-600">Corporate Partner</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="max-w-3xl mx-auto bg-red-50 border-red-200">
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Be Part of Our Impact Story</h2>
              <p className="text-gray-600 mb-6">
                Every donation, every volunteer hour, every partnership creates ripples of positive change.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => onNavigate('donate')}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Donate Now
                </Button>
                <Button onClick={() => onNavigate('volunteer')} variant="outline">
                  Volunteer
                </Button>
                <Button onClick={() => onNavigate('partner')} variant="outline">
                  Partner With Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
