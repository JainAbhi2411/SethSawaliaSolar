# Seth Sawalia Solar - Admin Dashboard Documentation

## Overview
The admin dashboard provides a comprehensive management system for the Seth Sawalia Solar Company website. It includes real-time data management, user authentication, and full CRUD operations for services, projects, and contact queries.

## Features

### 1. Authentication System
- **Username + Password Login**: Secure authentication using Supabase Auth
- **Auto-registration**: First user is automatically assigned as admin
- **Role-based Access**: Admin and User roles with different permissions
- **Session Management**: Persistent login sessions across page refreshes

### 2. Admin Dashboard
- **Real-time Statistics**: Live updates for queries, services, projects, and users
- **Quick Actions**: Direct links to manage different sections
- **System Information**: Database status and connection monitoring

### 3. Contact Queries Management
- **View All Queries**: Real-time list of all customer inquiries
- **Status Management**: Update query status (New, Contacted, Completed, Cancelled)
- **Detailed View**: Modal with complete query information
- **Delete Queries**: Remove outdated or spam queries
- **Real-time Updates**: Automatic refresh when new queries arrive

### 4. Services Management (Placeholder)
- Full CRUD operations for service offerings
- Real-time synchronization
- Image upload support
- Display order management

### 5. Projects Management (Placeholder)
- Full CRUD operations for project portfolio
- Real-time synchronization
- Image upload support
- Display order management

### 6. Users Management (Placeholder)
- View all registered users
- Manage user roles
- User activity monitoring

## Getting Started

### First Time Setup

1. **Create Admin Account**:
   - Navigate to `/login`
   - Click on "Sign Up" tab
   - Enter username and password
   - The first user will automatically become admin

2. **Access Admin Dashboard**:
   - After login, click "Admin" in the navigation bar
   - Or navigate directly to `/admin`

### Admin Routes

- `/admin` - Dashboard overview
- `/admin/queries` - Contact queries management
- `/admin/services` - Services management
- `/admin/projects` - Projects management
- `/admin/users` - Users management

## Database Schema

### Profiles Table
```sql
- id: UUID (Primary Key, references auth.users)
- email: TEXT
- username: TEXT (Unique)
- role: user_role ENUM ('user', 'admin')
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### Contact Queries Table
```sql
- id: UUID (Primary Key)
- name: TEXT
- phone: TEXT
- email: TEXT
- property_type: TEXT
- system_size: TEXT
- budget: TEXT
- timeline: TEXT
- roof_type: TEXT
- message: TEXT
- status: TEXT (default: 'new')
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### Services Table
```sql
- id: UUID (Primary Key)
- title: TEXT
- description: TEXT
- full_description: TEXT
- icon_name: TEXT
- gradient: TEXT
- image_url: TEXT
- features: TEXT[]
- benefits: TEXT[]
- process_steps: TEXT[]
- pricing: TEXT
- timeline: TEXT
- display_order: INT
- is_active: BOOLEAN
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### Projects Table
```sql
- id: UUID (Primary Key)
- title: TEXT
- category: TEXT
- location: TEXT
- capacity: TEXT
- description: TEXT
- image_url: TEXT
- completion_date: TEXT
- panel_count: INT
- system_type: TEXT
- monthly_savings: TEXT
- co2_reduction: TEXT
- features: TEXT[]
- display_order: INT
- is_active: BOOLEAN
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

## Security

### Row Level Security (RLS)
All tables have RLS enabled with the following policies:

**Profiles**:
- Admins: Full access to all profiles
- Users: Can view and update their own profile (except role)

**Contact Queries**:
- Admins: Full CRUD access
- Public: Can insert new queries (for contact form)

**Services**:
- Admins: Full CRUD access
- Public: Can view active services

**Projects**:
- Admins: Full CRUD access
- Public: Can view active projects

### Authentication Guards
- **RouteGuard**: Protects routes requiring authentication
- **AdminGuard**: Ensures only admins can access admin routes

## Real-time Features

All admin pages use Supabase Realtime subscriptions for live updates:

```typescript
const channel = supabase
  .channel('table-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'table_name' },
    (payload) => {
      // Handle real-time update
      loadData();
    }
  )
  .subscribe();
```

## API Functions

Located in `/src/db/api.ts`:

### Contact Queries API
- `getAll()` - Fetch all queries
- `create(query)` - Create new query
- `updateStatus(id, status)` - Update query status
- `delete(id)` - Delete query

### Services API
- `getAll()` - Fetch all services
- `getById(id)` - Fetch single service
- `create(service)` - Create new service
- `update(id, updates)` - Update service
- `delete(id)` - Delete service

### Projects API
- `getAll()` - Fetch all projects
- `getById(id)` - Fetch single project
- `create(project)` - Create new project
- `update(id, updates)` - Update project
- `delete(id)` - Delete project

### Profiles API
- `getCurrentProfile()` - Get current user profile
- `getAll()` - Fetch all profiles (admin only)
- `updateRole(id, role)` - Update user role (admin only)

## Contact Form Integration

The public contact form (`/contact`) automatically saves submissions to the database:

```typescript
contactQueriesAPI.create({
  name: formData.name,
  phone: formData.phone,
  email: formData.email,
  property_type: formData.propertyType,
  system_size: formData.systemSize,
  budget: formData.budget,
  timeline: formData.timeline,
  roof_type: formData.roofType,
  message: formData.message
})
```

Admins can then view and manage these queries in real-time from the admin dashboard.

## User Roles

### Admin
- Full access to admin dashboard
- Manage all content (services, projects, queries)
- Manage user roles
- View all statistics

### User
- Can view public pages
- Can submit contact forms
- Can view their own profile

## Navigation

### Public Navigation
- Home, Services, Projects, About Us, Resources, Contact
- Login button (when not logged in)
- Logout button (when logged in)

### Admin Navigation (Admin users only)
- Dashboard
- Contact Queries
- Services
- Projects
- Users
- Logout

## Mobile Support

The admin dashboard is fully responsive with:
- Collapsible sidebar on mobile
- Touch-friendly controls
- Optimized layouts for small screens
- Mobile menu with all navigation options

## Future Enhancements

The following features are planned for future releases:

1. **Complete CRUD Interfaces**:
   - Services management with image upload
   - Projects management with image upload
   - Users management with role assignment

2. **Advanced Features**:
   - Email notifications for new queries
   - Export data to CSV/Excel
   - Analytics and reporting
   - Bulk operations
   - Search and filtering

3. **Additional Functionality**:
   - Activity logs
   - Backup and restore
   - API documentation
   - Webhook integrations

## Troubleshooting

### Cannot Access Admin Dashboard
- Ensure you're logged in
- Verify your account has admin role
- Check browser console for errors

### Real-time Updates Not Working
- Check internet connection
- Verify Supabase connection status
- Check browser console for subscription errors

### Login Issues
- Verify username format (letters, numbers, underscores only)
- Check password length (minimum 6 characters)
- Clear browser cache and try again

## Support

For technical support or questions:
- Email: enterprisessethsawaliya@gmail.com
- Phone: +91-7014235836
- Location: Jaipur, Rajasthan
