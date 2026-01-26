import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { TeamMembersPage } from './components/teamMembers';
import { CampaignsPage } from './components/CampaignsPage';
import { CampaignDetailsPage } from './components/CampaignDetailsPage';
import { EventsPage } from './components/EventsPage';
import { EventDetailsPage } from './components/EventDetailsPage';
import { EventRegistrationConfirmation } from './components/EventRegistrationConfirmation';
import { GalleryPage } from './components/GalleryPage';
import { GalleryAlbumPage } from './components/GalleryAlbumPage';
import { DonatePage } from './components/DonatePage';
import { DonationConfirmation } from './components/DonationConfirmation';
import { VolunteerPage } from './components/VolunteerPage';
import { VolunteerConfirmation } from './components/VolunteerConfirmation';
import { PartnerPage } from './components/PartnerPage';
import { PartnerConfirmation } from './components/PartnerConfirmation';
import { ImpactPage } from './components/ImpactPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleNavigate = (page: string, id?: string) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'team-members':
        navigate('/team-members');
        break;
      case 'campaigns':
        navigate('/campaigns');
        break;
      case 'campaign-details':
        navigate(id ? `/campaigns/${id}` : '/campaigns');
        break;
      case 'events':
        navigate('/events');
        break;
      case 'event-details':
        navigate(id ? `/events/${id}` : '/events');
        break;
      case 'event-registration-confirmation':
        navigate(id ? `/events/${id}/confirmation` : '/events');
        break;
      case 'gallery':
        navigate('/gallery');
        break;
      case 'gallery-album':
        navigate(id ? `/gallery/${id}` : '/gallery');
        break;
      case 'donate':
        navigate('/donate');
        break;
      case 'donation-confirmation':
        navigate('/donate/confirmation');
        break;
      case 'volunteer':
        navigate('/volunteer');
        break;
      case 'volunteer-confirmation':
        navigate('/volunteer/confirmation');
        break;
      case 'partner':
        navigate('/partner');
        break;
      case 'partner-confirmation':
        navigate('/partner/confirmation');
        break;
      case 'impact':
        navigate('/impact');
        break;
      case 'blog':
        navigate('/blog');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        navigate('/');
        break;
    }
  };

  const currentPage = (() => {
    const { pathname } = location;

    if (pathname === '/') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/team-members')) return 'about';
    if (pathname.startsWith('/campaigns')) return 'campaigns';
    if (pathname.startsWith('/events')) return 'events';
    if (pathname.startsWith('/gallery')) return 'gallery';
    if (pathname.startsWith('/donate')) return 'donate';
    if (pathname.startsWith('/volunteer')) return 'volunteer';
    if (pathname.startsWith('/partner')) return 'partner';
    if (pathname.startsWith('/impact')) return 'impact';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/contact')) return 'contact';

    return 'home';
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
          <Route
            path="/team-members"
            element={<TeamMembersPage onNavigate={handleNavigate} />}
          />
          <Route path="/campaigns" element={<CampaignsPage onNavigate={handleNavigate} />} />
          <Route
            path="/campaigns/:id"
            element={<CampaignDetailsPage onNavigate={handleNavigate} />}
          />
          <Route path="/events" element={<EventsPage onNavigate={handleNavigate} />} />
          <Route path="/events/:id" element={<EventDetailsPage onNavigate={handleNavigate} />} />
          <Route
            path="/events/:id/confirmation"
            element={<EventRegistrationConfirmation onNavigate={handleNavigate} />}
          />
          <Route path="/gallery" element={<GalleryPage onNavigate={handleNavigate} />} />
          <Route
            path="/gallery/:id"
            element={<GalleryAlbumPage onNavigate={handleNavigate} />}
          />
          <Route path="/donate" element={<DonatePage onNavigate={handleNavigate} />} />
          <Route
            path="/donate/confirmation"
            element={<DonationConfirmation onNavigate={handleNavigate} />}
          />
          <Route path="/volunteer" element={<VolunteerPage onNavigate={handleNavigate} />} />
          <Route
            path="/volunteer/confirmation"
            element={<VolunteerConfirmation onNavigate={handleNavigate} />}
          />
          <Route path="/partner" element={<PartnerPage onNavigate={handleNavigate} />} />
          <Route
            path="/partner/confirmation"
            element={<PartnerConfirmation onNavigate={handleNavigate} />}
          />
          <Route path="/impact" element={<ImpactPage onNavigate={handleNavigate} />} />
          <Route path="/blog" element={<BlogPage onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigate} />
      <Toaster />
    </div>
  );
}
