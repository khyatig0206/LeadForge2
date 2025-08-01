import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Contact } from '@/lib/types/contactTypes';
import { getAuthHeader } from '@/lib/auth';
import { format } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ContactList = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const queryClient = useQueryClient();

    // Fetch contacts
  const { data: contacts = [], isLoading, error } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/contacts`);
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data = await res.json();
      console.log(data); // <-- See the structure
      return data.data; // Adjust as needed
    }
  });

  // Mark contact as viewed mutation
  const markAsViewedMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/contact/${id}/viewed`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        }
      );
      if (!res.ok) throw new Error('Failed to mark as viewed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
  });
  // Handle opening contact details
  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    
    // If contact is not viewed, mark it as viewed
    if (!contact.viewed) {
      markAsViewedMutation.mutate(contact.id);
    }
  };

  // Format date helper function
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
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
          <h3 className="text-lg font-medium text-red-800">Error Loading Contacts</h3>
          <p className="text-red-600">
            There was a problem loading the contact list. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>
      
      {contacts.length === 0 ? (
        <Card className="w-full">
          <CardContent className="p-6 text-center">
            <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900">No contacts yet</h3>
            <p className="text-gray-500">
              New contact form submissions will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact: Contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{formatDate(contact.createdAt)}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell className="max-w-xs truncate">{contact.subject}</TableCell>
                  <TableCell>
                    {!contact.viewed ? (
                      <Badge className="bg-primary">New</Badge>
                    ) : (
                      <Badge variant="outline">Viewed</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" onClick={() => handleViewContact(contact)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Contact Details Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedContact ? formatDate(selectedContact.createdAt) : ''}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Name</h4>
                  <p>{selectedContact.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p>{selectedContact.email}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Company</h4>
                <p>{selectedContact.company}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                <p>{selectedContact.subject}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <p className="whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactList;
