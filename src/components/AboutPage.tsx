import { useEffect, useState } from "react";
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { teamMembers, impactStats } from "../lib/mockData";
import heroBackground from '../assets/bg-img-1.jpg';
import eventPicture from '../assets/img-7.jpg';
import valueImage from '../assets/img-12.jpeg';


interface AboutPageProps {
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

export function AboutPage({ onNavigate }: AboutPageProps) {
  const countBeneficiaries = useCountUp(impactStats.beneficiaries);
  const countCampaigns = useCountUp(impactStats.campaigns);
  const countVolunteers = useCountUp(impactStats.volunteers);
  const countPartners = useCountUp(impactStats.partnersAndSponsors);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="bg-white py-8 md:py-12 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: framed image with “paint/brush” vibe */}
            <div className="relative">
              {/* soft brush background */}
              <div className="absolute -left-10 -top-10 h-72 w-72 bg-gray-200/70 rounded-full blur-2xl" />
              <div className="absolute left-8 top-10 h-56 w-56 bg-gray-200/60 rounded-full blur-2xl" />

              {/* frame */}
              <div className="relative rounded-[32px] border-[10px] border-emerald-700 bg-white p-5 shadow-sm max-w-[520px]">
                {/* “paint edge” overlay (simple approximation) */}
                <div className="absolute -right-10 -top-8 h-40 w-40 bg-white/80 rotate-12 rounded-[48px] blur-[1px]" />
                <div className="absolute -left-12 bottom-10 h-44 w-44 bg-white/80 -rotate-12 rounded-[56px] blur-[1px]" />

                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={eventPicture}
                    alt="Our story"
                    className="w-full h-[360px] md:h-[420px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: text content */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-emerald-700 mb-3">
                <Heart className="w-5 h-5" />
                <span className="italic font-semibold text-lg">
                  Our story
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
                An inclusive and fair future
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Dynamic Consulting and Learning Hub is a
                multidisciplinary firm focused on human capital
                development especially for children, youth, and
                women, through hands-on, unconventional learning
                that nurtures talent and builds real-world skills.<br className=" sm:block" /><br className=" sm:block" />
                We also specialize in institutional performance
                reengineering, data and digital services, and
                strategic investments in startups and SMEs.
                As a digital solutions provider, we’re committed to
                addressing Africa’s evolving social, economic, and
                political challenges, starting with Nigeria.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-white text-sm">
                    ✓
                  </span>
                  <span className="text-gray-800">
                    indegenous community-driven solutions
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
                    ✓
                  </span>
                  <span className="text-gray-800">
                    Youth empowerment and leadership
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white text-sm">
                    ✓
                  </span>
                  <span className="text-gray-800">
                    Open science for all
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-900 text-white text-sm">
                    ✓
                  </span>
                  <span className="text-gray-800">
                    Inclusive governance
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Mission & Vision */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-8 b">
                <div className="flex justify-center mb-4">
                  <Target className="w-12 h-12 text-orange-500" />
                </div>
                <h2 className="text-2xl text-center mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 text-center ">
                  To create lasting positive change in
                  underserved communities by providing access to
                  education, healthcare, skills development, and
                  opportunities that break cycles of poverty and
                  unlock human potential.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Eye className="w-12 h-12 text-orange-500" />
                </div>
                <h2 className="text-2xl text-center mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 text-center">
                  A world where every person, regardless of
                  background, has the resources, support, and
                  opportunities to thrive and contribute
                  meaningfully to society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12 mx-10 pb-1 border-b-6 border-amber-200">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3">
                Education & Skills
              </h3>
              <p className="text-gray-600">
                Providing scholarships, mentorship, and
                vocational training to empower youth and women
                with the skills they need to succeed.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3">
                Health & Wellness
              </h3>
              <p className="text-gray-600">
                Delivering health education, preventive care,
                and access to basic health services for
                communities in need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3">
                Community Development
              </h3>
              <p className="text-gray-600">
                Building infrastructure, creating opportunities,
                and fostering sustainable growth in underserved
                areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl text-center mb-8">
            Why DCL HUB Exists
          </h2>
          <div className="prose max-w-none text-gray-600 text-justify">
            <p>
              DCL HUB was founded in 2018 with a simple but
              powerful belief: that every person deserves the
              opportunity to reach their full potential. We saw
              communities struggling with limited access to
              education, healthcare, and economic opportunities,
              and we knew we had to act.
            </p>
            <p>
              Our founders, community leaders who grew up facing
              similar challenges, understood that sustainable
              change doesn't come from handouts—it comes from
              empowerment, education, and creating pathways to
              opportunity.
            </p>
            <p>
              Today, we work hand-in-hand with communities,
              listening to their needs, building on their
              strengths, and creating programs that deliver
              measurable, lasting impact. We don't just provide
              services; we build partnerships, unlock potential,
              and create ripples of positive change that extend
              far beyond our direct reach.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-4">
            Our Leadership
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Meet the passionate leaders driving our mission
            forward
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl mb-1">
                    {member.name}
                  </h3>
                  <div className="text-sm text-orange-500 mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
            <Button
                onClick={() => onNavigate("team-members")}
                className="bg-orange-500 hover:bg-orange-700 text-white rounded-full px-7 h-12"
              >
                View more <span className="ml-2">↗</span>
              </Button>
          </div>
        </div>
      </section>

      {/* Values */}
                  {/* Values (Image Left + Accordion Right) */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-2">
          {/* Left Image */}
          <div className="relative min-h-[420px] lg:min-h-[640px]">
            <img
              src={valueImage}
              alt="Our Values"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* subtle dark overlay like the reference */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Right Content */}
          <div className="bg-green-100 text-slate-900 py-16 lg:py-20">
            <div className="px-6 md:px-10 lg:px-14 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-semibold mb-10">
                Our Values
                <span className="block mt-2 h-1 w-50 bg-emerald-600 rounded-full" />
              </h2>

              <div className="divide-y divide-slate/20">
                {[
                  {
                    title: "Empathy",
                    content:
                      "The compass that guides our interactions and decisions. It is the foundation of our ability to understand and share the feelings and perspectives of others. Only through this value can we build meaningful relationships, foster collaboration, and make a positive impact on the world.",
                  },
                  {
                    title: "Resilience",
                    content:
                      "We stay strong in the face of setbacks. We adapt, learn, and keep moving forward with purpose—turning challenges into progress for the people and communities we serve.",
                  },
                  {
                    title: "Inclusivity",
                    content:
                      "We ensure everyone has a voice and a place at the table. Our work is built to include people of different backgrounds, experiences, and abilities—because lasting change must be shared.",
                  },
                  {
                    title: "Respect",
                    content:
                      "We honor the dignity of individuals and communities. We listen, value perspectives, protect rights, and treat people fairly—always.",
                  },
                  {
                    title: "Transversality",
                    content:
                      "We work across sectors, disciplines, and communities. Complex problems need connected solutions, and we collaborate beyond boundaries to deliver impact that lasts.",
                  },
                  {
                    title: "Community",
                    content:
                      "Community is our heartbeat. We co-create with people, strengthen local ownership, and build partnerships that sustain impact long after projects end.",
                  },
                ].map((item, idx) => (
                  <details
                    key={idx}
                    className="group py-5"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="uppercase tracking-wide font-semibold text-sm md:text-base">
                        {item.title}
                      </span>

                      {/* caret */}
                      <span className="flex items-center justify-center w-10 h-10 rounded-md border border-slate/20 bg-white/5 transition-all duration-300 group-open:bg-white/10">
                        <span className="transition-transform duration-300 group-open:rotate-180">
                          ▾
                        </span>
                      </span>
                    </summary>

                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {item.content}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you donate, volunteer, or partner with us,
            you become part of something bigger
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => onNavigate("campaigns")}
              className="bg-orange-500 hover:bg-orange-600"
              size="lg"
            >
              View Campaigns
            </Button>
            <Button
              onClick={() => onNavigate("volunteer")}
              variant="outline"
              size="lg"
            >
              Volunteer
            </Button>
            <Button
              onClick={() => onNavigate("partner")}
              variant="outline"
              size="lg"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
