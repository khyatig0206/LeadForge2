import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { isAuthenticated } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';
import TestimonialList from '@/components/admin/TestimonialList';
import TestimonialForm from '@/components/admin/TestimonialForm';
import { Button } from '@/components/ui/button';
import { Testimonial } from '@/lib/types/testimonialSchema.ts';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AdminTestimonials = () => {
  const [, navigate] = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | undefined>(undefined);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Function to handle editing a testimonial
  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to reset the form state
  const handleFormClose = () => {
    setEditingTestimonial(undefined);
    setShowForm(false);
  };

  // Function to toggle the form visibility
  const toggleForm = () => {
    if (showForm && editingTestimonial) {
      // If we're editing, just reset the form
      setEditingTestimonial(undefined);
    } else {
      // Otherwise toggle the form visibility
      setShowForm(!showForm);
    }
  };

  if (!isAuthenticated()) {
    return null; // Don't render anything while redirecting
  }

  return (
     <HelmetProvider>
  <Helmet>
        <title>Manage Testimonials - Admin Dashboard | Leadforgee</title>
      </Helmet>
    
      <div className="min-h-screen bg-gray-100 dark:bg-gray-700 ">
        <Sidebar />
        
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Testimonials</h1>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Manage testimonials that appear on your website.
                  </p>
                </div>
                
                <Button 
                  onClick={toggleForm}
                  className={showForm ? "bg-gray-500" : "gradient-bg"}
                >
                  {showForm ? (
                    <>
                      <i className="fas fa-times mr-2"></i>
                      Cancel
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus mr-2"></i>
                      Add Testimonial
                    </>
                  )}
                </Button>
              </div>
              
              {/* Testimonial Form - conditionally rendered */}
              {showForm && (
                <div className="mb-6">
                  <TestimonialForm 
                    testimonial={editingTestimonial} 
                    onSuccess={handleFormClose} 
                  />
                </div>
              )}
              
              {/* Testimonial List */}
              <TestimonialList onEdit={handleEdit} />
            </div>
          </main>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AdminTestimonials;
