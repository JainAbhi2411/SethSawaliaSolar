import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { quoteRequestsAPI } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { QuoteRequest } from '@/types/database';
import { Mail, Phone, Calendar, Trash2, Eye, FileText, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const QuoteRequestsAdmin = () => {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);

  const loadRequests = async () => {
    try {
      const data = await quoteRequestsAPI.getAll();
      setRequests(data);
    } catch (error) {
      console.error('Failed to load quote requests:', error);
      toast.error('Failed to load quote requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();

    // Real-time subscription
    const channel = supabase
      .channel('quote-requests-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quote_requests' },
        (payload) => {
          console.log('Real-time update:', payload);
          loadRequests();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleStatusChange = async (id: string, status: QuoteRequest['status']) => {
    try {
      await quoteRequestsAPI.updateStatus(id, status);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;

    try {
      await quoteRequestsAPI.delete(id);
      toast.success('Quote request deleted successfully');
    } catch (error) {
      console.error('Failed to delete request:', error);
      toast.error('Failed to delete request');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-accent text-accent-foreground';
      case 'contacted':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-secondary text-secondary-foreground';
      case 'cancelled':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSourceBadge = (source: string) => {
    return source === 'chatbot' 
      ? <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <MessageSquare className="w-3 h-3 mr-1" />
          Chatbot
        </Badge>
      : <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
          <FileText className="w-3 h-3 mr-1" />
          Contact Form
        </Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2">Quote Requests</h1>
          <p className="text-muted-foreground">Manage detailed quote requests from contact form and chatbot</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-bold text-foreground">{requests.length}</span> requests
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No quote requests yet</p>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{request.name}</CardTitle>
                      {getSourceBadge(request.source)}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {request.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {request.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(request.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {request.property_type && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Property Type</div>
                      <div className="text-sm font-semibold capitalize">{request.property_type}</div>
                    </div>
                  )}
                  {request.system_size && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">System Size</div>
                      <div className="text-sm font-semibold">{request.system_size}</div>
                    </div>
                  )}
                  {request.budget && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Budget</div>
                      <div className="text-sm font-semibold">{request.budget}</div>
                    </div>
                  )}
                  {request.timeline && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                      <div className="text-sm font-semibold">{request.timeline}</div>
                    </div>
                  )}
                </div>

                {request.message && (
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Message</div>
                    <div className="text-sm">{request.message}</div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Select
                    value={request.status}
                    onValueChange={(value) => handleStatusChange(request.id, value as QuoteRequest['status'])}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(request.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={selectedRequest !== null} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedRequest.name}
                  {getSourceBadge(selectedRequest.source)}
                </DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(selectedRequest.created_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold mb-1">Email</div>
                    <div className="text-sm text-muted-foreground">{selectedRequest.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Phone</div>
                    <div className="text-sm text-muted-foreground">{selectedRequest.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Property Type</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {selectedRequest.property_type || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">System Size</div>
                    <div className="text-sm text-muted-foreground">{selectedRequest.system_size || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Budget</div>
                    <div className="text-sm text-muted-foreground">{selectedRequest.budget || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Timeline</div>
                    <div className="text-sm text-muted-foreground">{selectedRequest.timeline || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Roof Type</div>
                    <div className="text-sm text-muted-foreground">{selectedRequest.roof_type || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Status</div>
                    <Badge className={getStatusColor(selectedRequest.status)}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>
                {selectedRequest.message && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Message</div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">{selectedRequest.message}</div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuoteRequestsAdmin;