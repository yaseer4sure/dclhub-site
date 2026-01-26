import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import logo from '../assets/img-6.png';

interface NavigationProps {
  onNavigate: (page: string, id?: string) => void;
  currentPage: string;
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Campaigns', page: 'campaigns' },
    { label: 'Events', page: 'events' },
  ];

  const navItemsAfterImpact = [
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2"
          >
            <img 
              src={logo} 
              alt="DCL HUB Logo" 
              className="h-20 w-40"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`hover:text-orange-500 transition-colors ${
                  currentPage === item.page ? 'text-orange-500' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="relative group">
              <button
                onClick={() => handleNavClick('impact')}
                className={`hover:text-orange-500 transition-colors ${
                  currentPage === 'impact' || currentPage === 'gallery'
                    ? 'text-orange-500'
                    : ''
                }`}
              >
                Our Impacts
              </button>
              <div className="absolute left-0 top-full mt-3 w-48 rounded-lg border border-gray-100 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={() => handleNavClick('impact')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Impact report
                </button>
                <button
                  onClick={() => handleNavClick('gallery')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Gallery
                </button>
              </div>
            </div>
            {navItemsAfterImpact.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`hover:text-orange-500 transition-colors ${
                  currentPage === item.page ? 'text-orange-500' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => handleNavClick('donate')} className="bg-orange-500 hover:bg-orange-600 ml-20">
              Donate
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-15 h-10  " />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={`text-left p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                        currentPage === item.page ? 'bg-orange-50 text-orange-500' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="rounded-lg border border-gray-100">
                    <button
                      onClick={() => handleNavClick('impact')}
                      className={`w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                        currentPage === 'impact' ? 'bg-orange-50 text-orange-500' : ''
                      }`}
                    >
                      Our Impacts
                    </button>
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleNavClick('impact')}
                        className="text-left px-6 py-2 text-sm hover:bg-gray-50"
                      >
                        Impact report
                      </button>
                      <button
                        onClick={() => handleNavClick('gallery')}
                        className="text-left px-6 py-2 text-sm hover:bg-gray-50"
                      >
                        Gallery
                      </button>
                    </div>
                  </div>
                  {navItemsAfterImpact.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={`text-left p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                        currentPage === item.page ? 'bg-orange-50 text-orange-500' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => handleNavClick('donate')}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Donate
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
