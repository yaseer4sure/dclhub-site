import { useState } from 'react';
import { Handshake } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { submitPartnershipInquiry } from '../lib/api';
import { toast } from 'sonner';

interface PartnerPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function PartnerPage({ onNavigate }: PartnerPageProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitPartnershipInquiry(formData);
      toast.success('Partnership inquiry submitted successfully!');
      onNavigate('partner-confirmation');
    } catch (error) {
      console.error('Partnership inquiry error:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Handshake className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl mb-4">Partner With Us</h1>
          <p className="text-xl text-gray-600">
            Together, we can create greater impact. Let's explore how we can collaborate.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) =>
                        setFormData({ ...formData, organizationName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        setFormData({ ...formData, contactPerson: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>

                  <div>
                    <Label htmlFor="partnershipType">Partnership Interest *</Label>
                    <Select
                      value={formData.partnershipType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, partnershipType: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select partnership type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate Sponsorship</SelectItem>
                        <SelectItem value="ngo">NGO Collaboration</SelectItem>
                        <SelectItem value="grant">Grant Making</SelectItem>
                        <SelectItem value="inkind">In-Kind Donation</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your organization and partnership goals"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl mb-6">Partnership Types</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="mb-1">Corporate Sponsors</div>
                    <div className="text-gray-600">Brand visibility and CSR impact</div>
                  </div>
                  <div>
                    <div className="mb-1">NGO Partners</div>
                    <div className="text-gray-600">Collaborative program delivery</div>
                  </div>
                  <div>
                    <div className="mb-1">Grant Makers</div>
                    <div className="text-gray-600">Funding specific initiatives</div>
                  </div>
                  <div>
                    <div className="mb-1">Technical Partners</div>
                    <div className="text-gray-600">Expertise and capacity building</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl mb-4">Benefits</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Measurable social impact</li>
                  <li>• Brand visibility and recognition</li>
                  <li>• Regular progress reports</li>
                  <li>• Employee engagement opportunities</li>
                  <li>• Tax deductions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
