import { useState } from 'react';
import { Users, Heart, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { submitVolunteerApplication } from '../lib/api';
import { toast } from 'sonner';

interface VolunteerPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function VolunteerPage({ onNavigate }: VolunteerPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitVolunteerApplication(formData);
      toast.success('Application submitted successfully!');
      onNavigate('volunteer-confirmation');
    } catch (error) {
      console.error('Volunteer application error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Users className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl mb-4">Become a Volunteer</h1>
          <p className="text-xl text-gray-600">
            Join our community of changemakers. Your time and skills can transform lives.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills/Interests *</Label>
                    <Input
                      id="skills"
                      placeholder="e.g., Teaching, Event Planning, Social Media"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability *</Label>
                    <Select
                      value={formData.availability}
                      onValueChange={(value) =>
                        setFormData({ ...formData, availability: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                        <SelectItem value="occasional">Occasional Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell Us About Yourself</Label>
                    <Textarea
                      id="message"
                      placeholder="Why do you want to volunteer with DCL HUB?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl mb-6">Why Volunteer?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Make a direct impact in your community</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Develop new skills and experiences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Connect with like-minded people</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Be part of meaningful change</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl mb-4">Volunteer Opportunities</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="mb-1">Event Support</div>
                    <div className="text-gray-600">Help organize and run community events</div>
                  </div>
                  <div>
                    <div className="mb-1">Mentorship</div>
                    <div className="text-gray-600">Guide youth and provide career advice</div>
                  </div>
                  <div>
                    <div className="mb-1">Teaching & Training</div>
                    <div className="text-gray-600">Share your expertise in workshops</div>
                  </div>
                  <div>
                    <div className="mb-1">Administration</div>
                    <div className="text-gray-600">Support with operations and coordination</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
