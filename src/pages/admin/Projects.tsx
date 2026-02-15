import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProjectsAdmin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black mb-2">Projects Management</h1>
        <p className="text-muted-foreground">Manage project portfolio with full CRUD operations</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Projects CRUD interface coming soon...</p>
          <p className="text-sm text-muted-foreground mt-2">
            This page will allow you to create, read, update, and delete projects in real-time
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsAdmin;
