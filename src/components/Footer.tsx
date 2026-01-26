import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/img-6.png';

interface FooterProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="DCL HUB Logo" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm mb-4">
              Empowering communities through education, health, and sustainable development initiatives.
            </p>
            <div className="flex gap-3">
              <button className="hover:text-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="hover:text-orange-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="hover:text-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="hover:text-orange-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-orange-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('campaigns')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Campaigns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-white mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('donate')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Donate
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('volunteer')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Volunteer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partner')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('impact')}
                  className="hover:text-orange-500 transition-colors"
                >
                  Impact Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>official.dclhub@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span> +2349121709466 </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>No 6 Surame road, Yahya Hub, Ungwan Rimi, Kaduna</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} DCL HUB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
