import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  DialogFooter,
} from '@/components/ui/dialog';
import { quoteRequestsAPI } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { QuoteRequest } from '@/types/database';
import { Mail, Phone, Calendar, Trash2, Eye, FileText, MessageSquare, Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';

const QuoteRequestsAdmin = () => {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<QuoteRequest | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property_type: '',
    system_size: '',
    budget: '',
    timeline: '',
    roof_type: '',
    message: '',
    source: 'contact_form' as QuoteRequest['source'],
    status: 'new' as QuoteRequest['status']
  });

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

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      property_type: '',
      system_size: '',
      budget: '',
      timeline: '',
      roof_type: '',
      message: '',
      source: 'contact_form',
      status: 'new'
    });
    setEditingRequest(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setCreateDialogOpen(true);
  };

  const openEditDialog = (request: QuoteRequest) => {
    setEditingRequest(request);
    setFormData({
      name: request.name,
      phone: request.phone,
      email: request.email,
      property_type: request.property_type || '',
      system_size: request.system_size || '',
      budget: request.budget || '',
      timeline: request.timeline || '',
      roof_type: request.roof_type || '',
      message: request.message || '',
      source: request.source,
      status: request.status
    });
    setEditDialogOpen(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await quoteRequestsAPI.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        property_type: formData.property_type || null,
        system_size: formData.system_size || null,
        budget: formData.budget || null,
        timeline: formData.timeline || null,
        roof_type: formData.roof_type || null,
        message: formData.message || null,
        source: formData.source
      });
      toast.success('Quote request created successfully');
      setCreateDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Failed to create quote request:', error);
      toast.error(error?.message || 'Failed to create quote request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;

    setSubmitting(true);

    try {
      await quoteRequestsAPI.updateStatus(editingRequest.id, formData.status);
      toast.success('Quote request updated successfully');
      setEditDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Failed to update quote request:', error);
      toast.error(error?.message || 'Failed to update quote request');
    } finally {
      setSubmitting(false);
    }
  };

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
    } catch (error: any) {
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
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Total: <span className="font-bold text-foreground">{requests.length}</span> requests
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Add Request
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No quote requests yet</p>
              <Button onClick={openCreateDialog} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Request
              </Button>
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
                    onClick={() => {
                      setSelectedRequest(request);
                      setViewDialogOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(request)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
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

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={(open) => {
        setCreateDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Quote Request</DialogTitle>
            <DialogDescription>
              Add a new quote request manually
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="create-name">Full Name *</Label>
                <Input
                  id="create-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="create-phone">Phone Number *</Label>
                <Input
                  id="create-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="create-email">Email Address *</Label>
                <Input
                  id="create-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="create-property-type">Property Type</Label>
                <Input
                  id="create-property-type"
                  value={formData.property_type}
                  onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                  placeholder="e.g., Residential, Commercial"
                />
              </div>

              <div>
                <Label htmlFor="create-system-size">System Size</Label>
                <Input
                  id="create-system-size"
                  value={formData.system_size}
                  onChange={(e) => setFormData({ ...formData, system_size: e.target.value })}
                  placeholder="e.g., 5 kW"
                />
              </div>

              <div>
                <Label htmlFor="create-budget">Budget</Label>
                <Input
                  id="create-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g., ₹2-3 Lakhs"
                />
              </div>

              <div>
                <Label htmlFor="create-timeline">Timeline</Label>
                <Input
                  id="create-timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g., 1-3 months"
                />
              </div>

              <div>
                <Label htmlFor="create-roof-type">Roof Type</Label>
                <Input
                  id="create-roof-type"
                  value={formData.roof_type}
                  onChange={(e) => setFormData({ ...formData, roof_type: e.target.value })}
                  placeholder="e.g., Flat roof"
                />
              </div>

              <div>
                <Label htmlFor="create-source">Source *</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => setFormData({ ...formData, source: value as QuoteRequest['source'] })}
                >
                  <SelectTrigger id="create-source">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contact_form">Contact Form</SelectItem>
                    <SelectItem value="chatbot">Chatbot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="create-message">Message</Label>
                <Textarea
                  id="create-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Request'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => {
        setEditDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Quote Request</DialogTitle>
            <DialogDescription>
              Update quote request status
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Name</Label>
                <Input value={formData.name} disabled />
              </div>

              <div>
                <Label>Phone</Label>
                <Input value={formData.phone} disabled />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={formData.email} disabled />
              </div>

              <div>
                <Label>Property Type</Label>
                <Input value={formData.property_type} disabled />
              </div>

              <div>
                <Label>System Size</Label>
                <Input value={formData.system_size} disabled />
              </div>

              <div>
                <Label>Budget</Label>
                <Input value={formData.budget} disabled />
              </div>

              <div>
                <Label>Timeline</Label>
                <Input value={formData.timeline} disabled />
              </div>

              <div>
                <Label>Roof Type</Label>
                <Input value={formData.roof_type} disabled />
              </div>

              <div>
                <Label>Source</Label>
                <Input value={formData.source} disabled />
              </div>

              <div className="col-span-2">
                <Label>Message</Label>
                <Textarea value={formData.message} disabled rows={3} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="edit-status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as QuoteRequest['status'] })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Request'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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