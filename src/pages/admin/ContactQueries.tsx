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
import { contactQueriesAPI } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { ContactQuery } from '@/types/database';
import { Mail, Phone, Calendar, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

const ContactQueriesAdmin = () => {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);

  const loadQueries = async () => {
    try {
      const data = await contactQueriesAPI.getAll();
      setQueries(data);
    } catch (error) {
      console.error('Failed to load queries:', error);
      toast.error('Failed to load contact queries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueries();

    // Real-time subscription
    const channel = supabase
      .channel('contact-queries-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_queries' },
        (payload) => {
          console.log('Real-time update:', payload);
          loadQueries();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await contactQueriesAPI.updateStatus(id, status);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this query?')) return;

    try {
      await contactQueriesAPI.delete(id);
      toast.success('Query deleted successfully');
    } catch (error) {
      console.error('Failed to delete query:', error);
      toast.error('Failed to delete query');
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
          <h1 className="text-3xl font-black mb-2">Contact Queries</h1>
          <p className="text-muted-foreground">Manage customer inquiries and quote requests</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-bold text-foreground">{queries.length}</span> queries
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {queries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No contact queries yet</p>
            </CardContent>
          </Card>
        ) : (
          queries.map((query) => (
            <Card key={query.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{query.name}</CardTitle>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {query.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {query.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(query.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(query.status)}>
                    {query.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {query.property_type && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Property Type</div>
                      <div className="text-sm font-semibold capitalize">{query.property_type}</div>
                    </div>
                  )}
                  {query.system_size && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">System Size</div>
                      <div className="text-sm font-semibold">{query.system_size}</div>
                    </div>
                  )}
                  {query.budget && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Budget</div>
                      <div className="text-sm font-semibold">{query.budget}</div>
                    </div>
                  )}
                  {query.timeline && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                      <div className="text-sm font-semibold">{query.timeline}</div>
                    </div>
                  )}
                </div>

                {query.message && (
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Message</div>
                    <div className="text-sm">{query.message}</div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Select
                    value={query.status}
                    onValueChange={(value) => handleStatusChange(query.id, value)}
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
                    onClick={() => setSelectedQuery(query)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(query.id)}
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
      <Dialog open={selectedQuery !== null} onOpenChange={() => setSelectedQuery(null)}>
        <DialogContent className="max-w-2xl">
          {selectedQuery && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedQuery.name}</DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(selectedQuery.created_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold mb-1">Email</div>
                    <div className="text-sm text-muted-foreground">{selectedQuery.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Phone</div>
                    <div className="text-sm text-muted-foreground">{selectedQuery.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Property Type</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {selectedQuery.property_type || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">System Size</div>
                    <div className="text-sm text-muted-foreground">{selectedQuery.system_size || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Budget</div>
                    <div className="text-sm text-muted-foreground">{selectedQuery.budget || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Timeline</div>
                    <div className="text-sm text-muted-foreground">{selectedQuery.timeline || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Roof Type</div>
                    <div className="text-sm text-muted-foreground">{selectedQuery.roof_type || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Status</div>
                    <Badge className={getStatusColor(selectedQuery.status)}>
                      {selectedQuery.status}
                    </Badge>
                  </div>
                </div>
                {selectedQuery.message && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Message</div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">{selectedQuery.message}</div>
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

export default ContactQueriesAdmin;
