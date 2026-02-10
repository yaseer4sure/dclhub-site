import { useEffect, useState } from "react";
import {
  ArrowRight,
  Users,
  Target,
  Eye,
  Award,
  TrendingUp,
  Heart,
  GraduationCap,
  Briefcase,
  Activity,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  campaigns,
  events,
  impactStats,
  partners,
} from "../lib/mockData";
import { Progress } from "./ui/progress";
import heroImage from "../assets/img-4.png";
import padUpGirlImage from "../assets/img-2.png";
import galleryImage1 from "../assets/img-3.png";
import galleryImage2 from "../assets/img-5.png";
import aboutImage from "../assets/img-1.jpg";
import digitalSkillsImage from "../assets/digitalSkills.jpeg";
import entrepreneurshipImage from "../assets/entrepreneurship.jpg";
import girlsEmpowermentImage from "../assets/girlsEmpowerment.png";
import vocationalTrainingImage from "../assets/vocationalTraining.jpg";
import consultingImage from "../assets/consulting.jpg";

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
}

const COUNT_DURATION_MS = 1600;

const formatCount = (value: number) => value.toLocaleString();

const useCountUp = (target: number, durationMs = COUNT_DURATION_MS) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.floor(target * progress));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, durationMs]);

  return value;
};

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredCampaign = campaigns[0];
  const upcomingEvents = events
    .filter((e) => e.status === "upcoming")
    .slice(0, 3);

  const countBeneficiaries = useCountUp(impactStats.beneficiaries);
  const countCampaigns = useCountUp(impactStats.campaigns);
  const countVolunteers = useCountUp(impactStats.volunteers);
  const countPartners = useCountUp(impactStats.partnersAndSponsors);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="DCL HUB Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto px-4 pt-20 pb-36 md:pt-32 md:pb-44 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl mb-6">
              Empowering Communities, Transforming Lives
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Join us in creating lasting change through
              education, health, and community development
              initiatives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => onNavigate("donate")}
                size="lg"
                variant="outline"
                className="bg-primary/90 border-white text-white-600 hover:bg-white/20 hover:text-white"
              >
                Donate Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => onNavigate("campaigns")}
                size="lg"
                variant="outline"
                className="border-white text-primary hover:bg-white/10 hover:text-white"
              >
                View Campaigns
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Impact Stats */}
      <section className="relative -mt-16 md:-mt-20 pb-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="my-10 mx-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center bg-white border-t-10 shadow-lg rounded-xl px-6 py-8 border-primary">
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl mb-1">
                {formatCount(countBeneficiaries)}
                </div>
                <div className="text-gray-600 text-sm">
                  Lives Impacted
                </div>
              </div>

              <div className="text-center bg-white border-t-10 shadow-lg rounded-xl px-6 py-8 border-secondary">
                <div className="flex justify-center mb-2">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl mb-1">
                {formatCount(countCampaigns)}
                </div>
                <div className="text-gray-600 text-sm">
                  Active Campaigns
                </div>
              </div>

              <div className="text-center bg-white border-t-10 shadow-lg rounded-xl px-6 py-8 border-secondary">
                <div className="flex justify-center mb-2">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl mb-1">
                {formatCount(countVolunteers)}
                </div>
                <div className="text-gray-600 text-sm">
                  Volunteers
                </div>
              </div>

              <div className="text-center bg-white border-t-10 shadow-lg rounded-xl px-6 py-8 border-primary">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl mb-1">
                {formatCount(countPartners)}
                </div>
                <div className="text-gray-600 text-sm">
                  Partners
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Campaign */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-3 mx-10 pb-1 border-b-6 border-secondary/40">Featured Campaign</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Help us reach our goal and make a real difference
              in the lives of those who need it most.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img
                  src={padUpGirlImage}
                  alt={featuredCampaign.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-secondary/100">
                  {featuredCampaign.status === "active"
                    ? "Active"
                    : "Completed"}
                </Badge>
              </div>
              <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl mb-3">
                  {featuredCampaign.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {featuredCampaign.shortDescription}
                </p>

                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <div className="text-2xl mb-1 text-primary">
                        1000+
                      </div>
                      <div className="text-sm text-gray-600">
                        Girls Supported
                      </div>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <div className="text-2xl mb-1 text-primary">
                        12
                      </div>
                      <div className="text-sm text-gray-600">
                        Schools Reached
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 text-center">
                    <span className="font-medium text-primary">
                      Ongoing Campaign
                    </span>{" "}
                    • {featuredCampaign.timeline}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      onNavigate(
                        "campaign-details",
                        featuredCampaign.id,
                      )
                    }
                    className="flex-1"
                    variant="outline"
                  >
                    Learn More
                  </Button>
                  <Button
                    onClick={() => onNavigate("donate")}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Donate
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl mb-4 mx-10 text-center border-b-6 border-secondary/40">About DCL HUB</h2>
              <p className="text-gray-600 text-lg mb-4">
                DCL HUB is a community organization dedicated to
                empowering youth, women, and girls through
                sustainable development initiatives. 
              </p>
              <p className="text-gray-600 mb-6">
                Since our inception, we've been working at the
                grassroots level to create lasting change in our
                communities. Through education, health programs,
                skills development, and advocacy, we're building
                a future where everyone can thrive.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <Target className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">
                    Our Mission
                  </h3>
                  <p className="text-sm text-gray-600">
                    To empower Africa’s growth by delivering
                    cutting edge training and consulting services
                    driven by seasoned experts, powered by
                    adaptable technology, and designed to meet
                    real-world challenges with lasting impact.
                  </p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <Eye className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">
                    Our Vision
                  </h3>
                  <p className="text-sm text-gray-600">
                    To become a trusted center of excellence for
                    care, support, and transformative learning
                    nurturing individuals to reach their full
                    potential and lead meaningful lives.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onNavigate("about")}
                className="bg-primary hover:bg-primary/90"
              >
                Learn More About Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
                <img
                  src={aboutImage}
                  alt="DCL HUB Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Things We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-3 mx-10 pb-1 border-b-6 border-secondary/40">What We Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive programs address the most
              pressing needs in our communities, creating
              pathways to empowerment and sustainable
              development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Digital Skills Training */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={digitalSkillsImage}
                  alt="Digital Skills Training"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl mb-2">
                  Digital Skills Training
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Equipping young people with practical,
                  in-demand digital skills that open doors to
                  employment, freelancing, and entrepreneurship.
                  From foundational digital literacy to advanced
                  tech skills, our trainings are hands-on,
                  relevant, and built for today’s digital
                  economy.
                </p>
                <Button
                  onClick={() => onNavigate("gallery")}
                  variant="link"
                  className="text-primary p-0 h-auto"
                >
                  Learn More{" "}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Entrepreneurship Programs */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={entrepreneurshipImage}
                  alt="Entrepreneurship Programs"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl mb-2">
                  Entrepreneurship Programs
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Supporting aspiring entrepreneurs with the
                  mindset, skills, and guidance needed to build
                  sustainable businesses. From idea validation
                  to execution, our programs turn ambition into
                   action and impact.
                </p>
                <Button
                  onClick={() => onNavigate("campaigns")}
                  variant="link"
                  className="text-primary p-0 h-auto"
                >
                  Learn More{" "}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Girls Empowerment */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={girlsEmpowermentImage}
                  alt="Girls Empowerment"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl mb-2">
                  Girls Empowerment
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Ensuring girls access education, menstrual
                  health resources, mentorship, and safe spaces
                  to grow, learn, and dream big.
                </p>
                <Button
                  onClick={() => onNavigate("campaigns")}
                  variant="link"
                  className="text-primary p-0 h-auto"
                >
                  Learn More{" "}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Vocational Training */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={vocationalTrainingImage}
                  alt="Vocational Training"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl mb-2">
                  Vocational Training
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Providing practical vocational training that
                  empowers individuals to earn, grow, and become
                  self-reliant. Our programs focus on real-world
                  skills that translate directly into income and
                  long-term economic stability.
                </p>
                <Button
                  onClick={() => onNavigate("campaigns")}
                  variant="link"
                  className="text-primary p-0 h-auto"
                >
                  Learn More{" "}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Consulting & CSR Programs */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={consultingImage}
                  alt="Community Health"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl mb-2">
                  Consulting & CSR Programs
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Partnering with organizations to design and
                  implement impactful CSR and community
                  development programs. Our consulting services
                  ensure initiatives are strategic, measurable,
                  and aligned with both business goals and
                  sustainable development priorities.
                </p>
                <Button
                  onClick={() => onNavigate("campaigns")}
                  variant="link"
                  className="text-primary p-0 h-auto"
                >
                  Learn More{" "}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl mb-3">Upcoming Events</h2>
              <p className="text-gray-600">
                Join us and be part of the change
              </p>
            </div>
            <Button
              onClick={() => onNavigate("events")}
              variant="outline"
            >
              View All Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  {event.virtual && (
                    <Badge className="absolute top-3 right-3 bg-accent">
                      Virtual
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="text-sm text-gray-600 mb-2">
                    {new Date(event.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </div>
                  <h3 className="text-lg mb-2 line-clamp-2">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <Button
                    onClick={() =>
                      onNavigate("event-details", event.id)
                    }
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-3">See Our Impact</h2>
            <p className="text-gray-600">
              Real stories, real change, real people
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={galleryImage1}
                alt="Gallery"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={galleryImage2}
                alt="Gallery"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={entrepreneurshipImage}
                alt="Gallery"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={girlsEmpowermentImage}
                alt="Gallery"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate("gallery")}
              variant="outline"
              size="lg"
            >
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-3">Our Partners</h2>
            <p className="text-gray-600">
              Working together to create meaningful impact
            </p>
          </div>

          <div className="relative">
            {/* Scrolling container */}
            <div className="flex gap-8 animate-scroll">
              {/* First set of logos */}
              {partners.map((partner, index) => (
                <div
                  key={`original-${index}`}
                  className="logo-card flex-shrink-0 w-48 h-32 flex items-center justify-center p-6 bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:z-10 group cursor-pointer"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="logo-card flex-shrink-0 w-48 h-32 flex items-center justify-center p-6 bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:z-10 group cursor-pointer"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Every contribution counts. Whether you donate,
            volunteer, or partner with us, you're helping build
            a better future.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => onNavigate("donate")}
              size="lg"
              className="bg-white text-primary hover:bg-gray-300"
            >
              Donate Now
            </Button>

            <Button
              onClick={() => onNavigate("partner")}
              size="lg"
              variant="outline"
              className="bg-orange border-white text-white hover:bg-white/10 hover:text-white"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
