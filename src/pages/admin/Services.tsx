import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { servicesAPI } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { Service } from '@/types/database';
import { Plus, Edit, Trash2, Eye, Briefcase, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_description: '',
    icon_name: '',
    gradient: '',
    image_url: '',
    features: '',
    benefits: '',
    process_steps: '',
    pricing: '',
    timeline: '',
    display_order: 0,
    is_active: true
  });

  const loadServices = async () => {
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
    } catch (error) {
      console.error('Failed to load services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();

    // Real-time subscription
    const channel = supabase
      .channel('services-admin-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'services' },
        (payload) => {
          console.log('Real-time update:', payload);
          loadServices();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      full_description: '',
      icon_name: '',
      gradient: '',
      image_url: '',
      features: '',
      benefits: '',
      process_steps: '',
      pricing: '',
      timeline: '',
      display_order: 0,
      is_active: true
    });
    setEditingService(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      full_description: service.full_description || '',
      icon_name: service.icon_name || '',
      gradient: service.gradient || '',
      image_url: service.image_url || '',
      features: service.features?.join('\n') || '',
      benefits: service.benefits?.join('\n') || '',
      process_steps: service.process_steps?.join('\n') || '',
      pricing: service.pricing || '',
      timeline: service.timeline || '',
      display_order: service.display_order,
      is_active: service.is_active
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const serviceData = {
        title: formData.title,
        description: formData.description,
        full_description: formData.full_description || null,
        icon_name: formData.icon_name || null,
        gradient: formData.gradient || null,
        image_url: formData.image_url || null,
        features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : null,
        benefits: formData.benefits ? formData.benefits.split('\n').filter(b => b.trim()) : null,
        process_steps: formData.process_steps ? formData.process_steps.split('\n').filter(p => p.trim()) : null,
        pricing: formData.pricing || null,
        timeline: formData.timeline || null,
        display_order: formData.display_order,
        is_active: formData.is_active
      };

      if (editingService) {
        await servicesAPI.update(editingService.id, serviceData);
        toast.success('Service updated successfully');
      } else {
        await servicesAPI.create(serviceData);
        toast.success('Service created successfully');
      }

      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Failed to save service:', error);
      toast.error(error?.message || 'Failed to save service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await servicesAPI.delete(id);
      toast.success('Service deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete service:', error);
      toast.error(error?.message || 'Failed to delete service');
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
          <h1 className="text-3xl font-black mb-2">Services Management</h1>
          <p className="text-muted-foreground">Manage service offerings with full CRUD operations</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No services yet</p>
              <Button onClick={openCreateDialog} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Service
              </Button>
            </CardContent>
          </Card>
        ) : (
          services.map((service) => (
            <Card key={service.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <Badge variant={service.is_active ? 'default' : 'secondary'}>
                        {service.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Order: {service.display_order}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {service.icon_name && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Icon</div>
                      <div className="text-sm font-semibold">{service.icon_name}</div>
                    </div>
                  )}
                  {service.pricing && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Pricing</div>
                      <div className="text-sm font-semibold">{service.pricing}</div>
                    </div>
                  )}
                  {service.timeline && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                      <div className="text-sm font-semibold">{service.timeline}</div>
                    </div>
                  )}
                  {service.image_url && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Image</div>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        <ImageIcon className="w-3 h-3" />
                        <span>Available</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setViewingService(service);
                      setViewDialogOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(service)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
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

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Create New Service'}</DialogTitle>
            <DialogDescription>
              {editingService ? 'Update service information' : 'Add a new service to your offerings'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="full_description">Full Description</Label>
                <Textarea
                  id="full_description"
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="icon_name">Icon Name</Label>
                <Input
                  id="icon_name"
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  placeholder="e.g., Sun, Zap, Home"
                />
              </div>

              <div>
                <Label htmlFor="gradient">Gradient</Label>
                <Input
                  id="gradient"
                  value={formData.gradient}
                  onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                  placeholder="e.g., from-primary to-secondary"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  rows={3}
                  placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="process_steps">Process Steps (one per line)</Label>
                <Textarea
                  id="process_steps"
                  value={formData.process_steps}
                  onChange={(e) => setFormData({ ...formData, process_steps: e.target.value })}
                  rows={3}
                  placeholder="Step 1&#10;Step 2&#10;Step 3"
                />
              </div>

              <div>
                <Label htmlFor="pricing">Pricing</Label>
                <Input
                  id="pricing"
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                  placeholder="e.g., Starting from ₹50,000"
                />
              </div>

              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g., 2-3 weeks"
                />
              </div>

              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {viewingService.title}
                  <Badge variant={viewingService.is_active ? 'default' : 'secondary'}>
                    {viewingService.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </DialogTitle>
                <DialogDescription>Service Details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold mb-1">Description</div>
                  <div className="text-sm text-muted-foreground">{viewingService.description}</div>
                </div>

                {viewingService.full_description && (
                  <div>
                    <div className="text-sm font-semibold mb-1">Full Description</div>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">{viewingService.full_description}</div>
                  </div>
                )}

                {viewingService.features && viewingService.features.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Features</div>
                    <ul className="list-disc list-inside space-y-1">
                      {viewingService.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {viewingService.benefits && viewingService.benefits.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Benefits</div>
                    <ul className="list-disc list-inside space-y-1">
                      {viewingService.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {viewingService.process_steps && viewingService.process_steps.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Process Steps</div>
                    <ol className="list-decimal list-inside space-y-1">
                      {viewingService.process_steps.map((step, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  {viewingService.pricing && (
                    <div>
                      <div className="text-sm font-semibold mb-1">Pricing</div>
                      <div className="text-sm text-muted-foreground">{viewingService.pricing}</div>
                    </div>
                  )}
                  {viewingService.timeline && (
                    <div>
                      <div className="text-sm font-semibold mb-1">Timeline</div>
                      <div className="text-sm text-muted-foreground">{viewingService.timeline}</div>
                    </div>
                  )}
                  {viewingService.icon_name && (
                    <div>
                      <div className="text-sm font-semibold mb-1">Icon</div>
                      <div className="text-sm text-muted-foreground">{viewingService.icon_name}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold mb-1">Display Order</div>
                    <div className="text-sm text-muted-foreground">{viewingService.display_order}</div>
                  </div>
                </div>

                {viewingService.image_url && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Image</div>
                    <img 
                      src={viewingService.image_url} 
                      alt={viewingService.title}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
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

export default ServicesAdmin;
