import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { boardMembers, teamMembersList } from "../lib/mockData";

interface TeamMembersPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function TeamMembersPage({ onNavigate }: TeamMembersPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-3">Our People</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            DCL HUB is led by a committed team of organisers, creatives, facilitators, and researchers. We work shoulder-to-shoulder with communities to deliver impact that matters and endures.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => onNavigate("about")}
              variant="outline"
              className="rounded-full px-6"
            >
              Back to About
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Board Members</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <div className="text-sm text-primary mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Team Members</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembersList.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <div className="text-sm text-primary mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
