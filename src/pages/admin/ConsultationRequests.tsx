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
import { consultationRequestsAPI } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { ConsultationRequest } from '@/types/database';
import { Mail, Phone, Calendar, Trash2, Eye, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const ConsultationRequestsAdmin = () => {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);

  const loadRequests = async () => {
    try {
      const data = await consultationRequestsAPI.getAll();
      setRequests(data);
    } catch (error) {
      console.error('Failed to load consultation requests:', error);
      toast.error('Failed to load consultation requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();

    // Real-time subscription
    const channel = supabase
      .channel('consultation-requests-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'consultation_requests' },
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

  const handleStatusChange = async (id: string, status: ConsultationRequest['status']) => {
    try {
      await consultationRequestsAPI.updateStatus(id, status);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consultation request?')) return;

    try {
      await consultationRequestsAPI.delete(id);
      toast.success('Consultation request deleted successfully');
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
          <h1 className="text-3xl font-black mb-2">Consultation Requests</h1>
          <p className="text-muted-foreground">Manage free consultation requests from homepage</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-bold text-foreground">{requests.length}</span> requests
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No consultation requests yet</p>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{request.name}</CardTitle>
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
                <div className="flex flex-wrap gap-3">
                  <Select
                    value={request.status}
                    onValueChange={(value) => handleStatusChange(request.id, value as ConsultationRequest['status'])}
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
                <DialogTitle>{selectedRequest.name}</DialogTitle>
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
                    <div className="text-sm font-semibold mb-1">Status</div>
                    <Badge className={getStatusColor(selectedRequest.status)}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Request Type</div>
                    <div className="text-sm text-muted-foreground">Free Consultation</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultationRequestsAdmin;