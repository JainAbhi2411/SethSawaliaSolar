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
import { projectsAPI } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { Project } from '@/types/database';
import { Plus, Edit, Trash2, Eye, FolderKanban, Image as ImageIcon, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    capacity: '',
    description: '',
    image_url: '',
    completion_date: '',
    panel_count: 0,
    system_type: '',
    monthly_savings: '',
    co2_reduction: '',
    features: '',
    display_order: 0,
    is_active: true
  });

  const loadProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();

    // Real-time subscription
    const channel = supabase
      .channel('projects-admin-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          console.log('Real-time update:', payload);
          loadProjects();
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
      category: '',
      location: '',
      capacity: '',
      description: '',
      image_url: '',
      completion_date: '',
      panel_count: 0,
      system_type: '',
      monthly_savings: '',
      co2_reduction: '',
      features: '',
      display_order: 0,
      is_active: true
    });
    setEditingProject(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      location: project.location,
      capacity: project.capacity,
      description: project.description,
      image_url: project.image_url || '',
      completion_date: project.completion_date || '',
      panel_count: project.panel_count || 0,
      system_type: project.system_type || '',
      monthly_savings: project.monthly_savings || '',
      co2_reduction: project.co2_reduction || '',
      features: project.features?.join('\n') || '',
      display_order: project.display_order,
      is_active: project.is_active
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const projectData = {
        title: formData.title,
        category: formData.category,
        location: formData.location,
        capacity: formData.capacity,
        description: formData.description,
        image_url: formData.image_url || null,
        completion_date: formData.completion_date || null,
        panel_count: formData.panel_count || null,
        system_type: formData.system_type || null,
        monthly_savings: formData.monthly_savings || null,
        co2_reduction: formData.co2_reduction || null,
        features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : null,
        display_order: formData.display_order,
        is_active: formData.is_active
      };

      if (editingProject) {
        await projectsAPI.update(editingProject.id, projectData);
        toast.success('Project updated successfully');
      } else {
        await projectsAPI.create(projectData);
        toast.success('Project created successfully');
      }

      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Failed to save project:', error);
      toast.error(error?.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete project:', error);
      toast.error(error?.message || 'Failed to delete project');
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
          <h1 className="text-3xl font-black mb-2">Projects Management</h1>
          <p className="text-muted-foreground">Manage project portfolio with full CRUD operations</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FolderKanban className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No projects yet</p>
              <Button onClick={openCreateDialog} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant={project.is_active ? 'default' : 'secondary'}>
                        {project.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Order: {project.display_order}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Capacity</div>
                    <div className="text-sm font-semibold">{project.capacity}</div>
                  </div>
                  {project.system_type && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">System Type</div>
                      <div className="text-sm font-semibold">{project.system_type}</div>
                    </div>
                  )}
                  {project.monthly_savings && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Monthly Savings</div>
                      <div className="text-sm font-semibold">{project.monthly_savings}</div>
                    </div>
                  )}
                  {project.image_url && (
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
                      setViewingProject(project);
                      setViewDialogOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(project)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
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
            <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject ? 'Update project information' : 'Add a new project to your portfolio'}
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

              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Residential, Commercial"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Jaipur, Rajasthan"
                  required
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="e.g., 5 kW, 10 kW"
                  required
                />
              </div>

              <div>
                <Label htmlFor="system_type">System Type</Label>
                <Input
                  id="system_type"
                  value={formData.system_type}
                  onChange={(e) => setFormData({ ...formData, system_type: e.target.value })}
                  placeholder="e.g., On-Grid, Off-Grid"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
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

              <div>
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  type="date"
                  value={formData.completion_date}
                  onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="panel_count">Panel Count</Label>
                <Input
                  id="panel_count"
                  type="number"
                  value={formData.panel_count}
                  onChange={(e) => setFormData({ ...formData, panel_count: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div>
                <Label htmlFor="monthly_savings">Monthly Savings</Label>
                <Input
                  id="monthly_savings"
                  value={formData.monthly_savings}
                  onChange={(e) => setFormData({ ...formData, monthly_savings: e.target.value })}
                  placeholder="e.g., ₹5,000"
                />
              </div>

              <div>
                <Label htmlFor="co2_reduction">CO2 Reduction</Label>
                <Input
                  id="co2_reduction"
                  value={formData.co2_reduction}
                  onChange={(e) => setFormData({ ...formData, co2_reduction: e.target.value })}
                  placeholder="e.g., 2 tons/year"
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
                {submitting ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingProject && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {viewingProject.title}
                  <Badge variant={viewingProject.is_active ? 'default' : 'secondary'}>
                    {viewingProject.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant="outline">{viewingProject.category}</Badge>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {viewingProject.location}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold mb-1">Description</div>
                  <div className="text-sm text-muted-foreground">{viewingProject.description}</div>
                </div>

                {viewingProject.features && viewingProject.features.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Features</div>
                    <ul className="list-disc list-inside space-y-1">
                      {viewingProject.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm font-semibold mb-1">Capacity</div>
                    <div className="text-sm text-muted-foreground">{viewingProject.capacity}</div>
                  </div>
                  {viewingProject.system_type && (
                    <div>
                      <div className="text-sm font-semibold mb-1">System Type</div>
                      <div className="text-sm text-muted-foreground">{viewingProject.system_type}</div>
                    </div>
                  )}
                  {viewingProject.panel_count && (
                    <div>
                      <div className="text-sm font-semibold mb-1">Panel Count</div>
                      <div className="text-sm text-muted-foreground">{viewingProject.panel_count}</div>
                    </div>
                  )}
                  {viewingProject.completion_date && (
                    <div>
                      <div className="text-sm font-semibold mb-1">Completion Date</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(viewingProject.completion_date).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  {viewingProject.monthly_savings && (
                    <div>
                      <div className="text-sm font-semibold mb-1">Monthly Savings</div>
                      <div className="text-sm text-muted-foreground">{viewingProject.monthly_savings}</div>
                    </div>
                  )}
                  {viewingProject.co2_reduction && (
                    <div>
                      <div className="text-sm font-semibold mb-1">CO2 Reduction</div>
                      <div className="text-sm text-muted-foreground">{viewingProject.co2_reduction}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold mb-1">Display Order</div>
                    <div className="text-sm text-muted-foreground">{viewingProject.display_order}</div>
                  </div>
                </div>

                {viewingProject.image_url && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Image</div>
                    <img 
                      src={viewingProject.image_url} 
                      alt={viewingProject.title}
                      className="w-full h-64 object-cover rounded-lg"
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

export default ProjectsAdmin;
