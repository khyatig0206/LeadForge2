import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Testimonial } from '@/lib/types/testimonialSchema.ts';
import { getAuthHeader } from '@/lib/auth';
import { toast } from 'react-toastify';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface TestimonialListProps {
  onEdit: (testimonial: Testimonial) => void;
}

const TestimonialList = ({ onEdit }: TestimonialListProps) => {
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  

  // Fetch testimonials
  const { data: testimonials = [], isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonial`);
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      return response.json();
    }
  });

  // Delete testimonial mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonial/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete testimonial');
      }
      
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast.success('Testimonial deleted successfully');
      setDeleteTargetId(null);
    },
    onError: (error) => {
      toast.error(error.message || 'Error deleting testimonial');
      setDeleteTargetId(null);
    },
  });

  // Toggle testimonial active status mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: number; active: boolean }) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonial/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update testimonial status');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
       toast.success('Testimonial status updated');
    },
    onError: (error) => {
       toast.error(error.message || 'Error updating status');
    },
  });

  // Format date helper with error handling
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: number) => {
    setDeleteTargetId(id);
  };

  // Handle delete action
  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteMutation.mutate(deleteTargetId);
    }
  };

  // Handle toggle active status
  const handleToggleActive = (id: number, currentActive: boolean) => {
    toggleActiveMutation.mutate({ id, active: !currentActive });
  };

  // Show loading state
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="w-full bg-red-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-red-800">Error Loading Testimonials</h3>
          <p className="text-red-600">
            There was a problem loading the testimonials. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {testimonials.length === 0 ? (
        <Card className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <i className="fas fa-comment-dots text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No testimonials yet</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Add your first testimonial by clicking the "Add Testimonial" button above.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial: Testimonial) => (
                <TableRow key={testimonial._id}>
                  <TableCell>
                    <img 
                      src={`${testimonial.imageUrl}`} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.position}</TableCell>
                  <TableCell>{testimonial.company}</TableCell>
                  <TableCell className="max-w-xs truncate" title={testimonial.quote}>{testimonial.quote}</TableCell>
                  <TableCell className="max-w-xs truncate" title={testimonial.result}>{testimonial.result}</TableCell>
                  <TableCell>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={i < testimonial.rating ? 'fas fa-star' : 'far fa-star'}
                        ></i>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`cursor-pointer ${testimonial.active ? 'bg-green-500' : 'bg-gray-500'}`}
                      onClick={() => handleToggleActive(testimonial._id, testimonial.active)}
                    >
                      {testimonial.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(testimonial.createdAt as string)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEdit(testimonial)}
                    >
                      <i className="fas fa-edit mr-1"></i> Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(testimonial._id)}
                    >
                      <i className="fas fa-trash-alt mr-1"></i> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTargetId} onOpenChange={() => setDeleteTargetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              testimonial and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestimonialList;
