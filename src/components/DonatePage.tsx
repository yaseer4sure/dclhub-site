import { useState } from 'react';
import { Heart, DollarSign, CreditCard, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { submitDonation } from '../lib/api';
import { campaigns } from '../lib/mockData';
import { toast } from 'sonner';

interface DonatePageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function DonatePage({ onNavigate }: DonatePageProps) {
  const [selectedAmount, setSelectedAmount] = useState<string>('50');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedAmounts = ['25', '50', '100', '250', '500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentAmount = selectedAmount === 'custom' ? customAmount : selectedAmount;

    const campaignId =
      selectedCampaignId === 'general' ? undefined : selectedCampaignId;

    try {
      await submitDonation({
        amount: currentAmount,
        frequency,
        paymentMethod,
        campaignId,
      });

      toast.success('Donation processed successfully!');
      onNavigate('donation-confirmation');
    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Failed to process donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentAmount = selectedAmount === 'custom' ? customAmount : selectedAmount;
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === 'active');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-primary fill-primary" />
          </div>
          <h1 className="text-4xl mb-4">Make a Donation</h1>
          <p className="text-xl text-gray-600">
            Your generosity fuels our mission. Every dollar makes a real difference in the lives of those we serve.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Campaign Selection */}
                  <div>
                    <Label htmlFor="donationCampaign" className="text-lg mb-4 block">
                      What do you want to donate for
                    </Label>
                    <Select
                      value={selectedCampaignId}
                      onValueChange={setSelectedCampaignId}
                    >
                      <SelectTrigger id="donationCampaign">
                        <SelectValue placeholder="Select a campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeCampaigns.map((campaign) => (
                          <SelectItem key={campaign.id} value={campaign.id}>
                            {campaign.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Frequency */}
                  <div>
                    <Label className="text-lg mb-4 block">Donation Frequency</Label>
                    <RadioGroup
                      value={frequency}
                      onValueChange={(v) => setFrequency(v as any)}
                      className="grid grid-cols-2 gap-4"
                    >
                      <label
                        htmlFor="one-time"
                        className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          frequency === 'one-time'
                            ? 'border-primary bg-secondary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <RadioGroupItem value="one-time" id="one-time" />
                        <span>One-Time</span>
                      </label>
                      <label
                        htmlFor="monthly"
                        className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          frequency === 'monthly'
                            ? 'border-primary bg-secondary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <RadioGroupItem value="monthly" id="monthly" />
                        <span>Monthly</span>
                      </label>
                    </RadioGroup>
                  </div>

                  {/* Amount */}
                  <div>
                    <Label className="text-lg mb-4 block">Donation Amount</Label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setSelectedAmount(amount)}
                          className={`p-4 border-2 rounded-lg transition-colors ${
                            selectedAmount === amount
                              ? 'border-primary bg-secondary/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setSelectedAmount('custom')}
                        className={`p-4 border-2 rounded-lg transition-colors ${
                          selectedAmount === 'custom'
                            ? 'border-primary bg-secondary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Custom
                      </button>
                    </div>

                    {selectedAmount === 'custom' && (
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="pl-10"
                          min="1"
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label htmlFor="paymentMethod" className="text-lg mb-4 block">
                      Payment Method
                    </Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Credit/Debit Card</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="mpesa">M-Pesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input id="cardName" placeholder="John Doe" required />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Donate ${currentAmount || '0'}
                    {frequency === 'monthly' && '/month'}
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    Your donation is secure and tax-deductible. You'll receive a receipt via email.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Impact Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-xl mb-6">Your Impact</h3>

                <div className="space-y-6">
                  <div className="pb-6 border-b">
                    <div className="text-2xl mb-2">$25</div>
                    <p className="text-sm text-gray-600">
                      Provides school supplies for one child for a month
                    </p>
                  </div>

                  <div className="pb-6 border-b">
                    <div className="text-2xl mb-2">$50</div>
                    <p className="text-sm text-gray-600">
                      Funds a skills training workshop for 5 youth
                    </p>
                  </div>

                  <div className="pb-6 border-b">
                    <div className="text-2xl mb-2">$100</div>
                    <p className="text-sm text-gray-600">
                      Sponsors a month of mentorship for 10 girls
                    </p>
                  </div>

                  <div>
                    <div className="text-2xl mb-2">$250</div>
                    <p className="text-sm text-gray-600">
                      Provides health services for an entire family
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h4 className="mb-4">Why Donate?</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span>100% transparency on fund usage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Regular impact reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Tax-deductible receipts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Direct community impact</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
