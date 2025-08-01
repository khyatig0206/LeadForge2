import { useLocation } from 'wouter';
import { isAuthenticated } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';
import ContactList from '@/components/admin/ContactList';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useEffect, useState } from 'react';

const AdminContacts = () => {
  const [, navigate] = useLocation();

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return null; // Don't render anything while redirecting
  }

  return (
     <HelmetProvider>
  <Helmet>
        <title>Manage Contacts - Admin Dashboard | Leadforgee</title>
      </Helmet>
    
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage all contact form submissions from your website.
                </p>
              </div>
              
              <ContactList />
            </div>
          </main>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AdminContacts;
