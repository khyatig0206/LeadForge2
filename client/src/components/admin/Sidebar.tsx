import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { logout } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/admin/contacts', label: 'Contacts', icon: 'fas fa-address-book' },
    { path: '/admin/testimonials', label: 'Testimonials', icon: 'fas fa-star' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">Leadforgee Admin</h1>
            </div>
            <nav className="mt-8 flex-1 px-4 space-y-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive(item.path) 
                      ? 'bg-primary text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <i className={`${item.icon} mr-3 flex-shrink-0 h-6 w-6`}></i>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
            <div className="flex-shrink-0 w-full">
              <Button
                className="w-full bg-gray-800 text-white hover:bg-gray-700"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden transition-opacity duration-300 ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-gray-900 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button 
              type="button" 
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <i className="fas fa-times text-white"></i>
            </button>
          </div>
          
          <div className="flex-1 flex flex-col min-h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">Leadforgee Admin</h1>
            </div>
            <nav className="mt-8 flex-1 px-4 space-y-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive(item.path) 
                      ? 'bg-primary text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className={`${item.icon} mr-3 flex-shrink-0 h-6 w-6`}></i>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
            <div className="flex-shrink-0 w-full">
              <Button
                className="w-full bg-gray-800 text-white hover:bg-gray-700"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content wrapper with padding for the sidebar */}
      <div className="md:pl-64">
        {/* Empty element to ensure proper spacing */}
      </div>
    </>
  );
};

export default Sidebar;
