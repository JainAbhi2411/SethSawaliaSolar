import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const UsersAdmin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black mb-2">Users Management</h1>
        <p className="text-muted-foreground">Manage user accounts and roles</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Users management interface coming soon...</p>
          <p className="text-sm text-muted-foreground mt-2">
            This page will allow you to view users and manage their roles
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersAdmin;
