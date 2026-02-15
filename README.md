# Seth Sawalia Solar Company Website

A modern, full-featured solar company website with real-time admin dashboard built with React, TypeScript, Tailwind CSS, and Supabase.

![Seth Sawalia Solar](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-green)

## 🌟 Features

### Public Website
- **Modern Design**: Beautiful, responsive design with Tailwind CSS and shadcn/ui components
- **Service Showcase**: Detailed information about solar services with interactive modals
- **Project Portfolio**: Showcase of completed solar installations with detailed metrics
- **Interactive Calculator**: Solar savings calculator with real-time estimates
- **Contact Form**: Multi-step contact form with database integration
- **Resources Section**: FAQ, guides, and solar information
- **Mobile Responsive**: Optimized for all screen sizes

### Admin Dashboard
- **Real-time Management**: Live updates using Supabase Realtime
- **Contact Queries**: View and manage customer inquiries with status tracking
- **Services Management**: CRUD operations for service offerings (placeholder)
- **Projects Management**: CRUD operations for project portfolio (placeholder)
- **User Management**: Role-based access control
- **Statistics Dashboard**: Real-time metrics and analytics
- **Secure Authentication**: Username/password authentication with role-based access

## 🚀 Tech Stack

- **Frontend**: React 18.3 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Realtime + Auth)
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Context + Hooks
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js 18 or higher
- npm or pnpm
- Supabase account (free tier available)
- Netlify account (for deployment)

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd seth-sawalia-solar
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

The `.env` file is already configured with Supabase credentials:

```env
VITE_SUPABASE_URL=https://aiewsoqlfaobrcqtdezd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the website.

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

## 📦 Project Structure

```
seth-sawalia-solar/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layouts/         # Layout components (MainLayout, AdminLayout)
│   │   └── common/          # Common components (RouteGuard, AdminGuard)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   ├── Resources.tsx
│   │   ├── Contact.tsx
│   │   ├── Login.tsx
│   │   └── admin/           # Admin pages
│   │       ├── Dashboard.tsx
│   │       ├── ContactQueries.tsx
│   │       ├── Services.tsx
│   │       ├── Projects.tsx
│   │       └── Users.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication context
│   ├── db/
│   │   ├── supabase.ts      # Supabase client
│   │   └── api.ts           # API functions
│   ├── types/
│   │   └── database.ts      # TypeScript types
│   ├── routes.tsx           # Route configuration
│   └── App.tsx              # Main app component
├── supabase/
│   └── migrations/          # Database migrations
├── netlify.toml             # Netlify configuration
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
├── DEPLOYMENT_CHECKLIST.md  # Deployment checklist
└── ADMIN_DOCUMENTATION.md   # Admin system documentation
```

## 🔐 Authentication

### First User Setup

1. Navigate to `/login`
2. Click "Sign Up" tab
3. Create account (first user becomes admin automatically)
4. Login and access admin dashboard at `/admin`

### User Roles

- **Admin**: Full access to admin dashboard and all management features
- **User**: Access to public pages only

## 📊 Database Schema

### Tables

- **profiles**: User profiles with roles
- **contact_queries**: Customer inquiries from contact form
- **services**: Service offerings (for future CRUD)
- **projects**: Project portfolio (for future CRUD)

See `ADMIN_DOCUMENTATION.md` for detailed schema information.

## 🌐 Deployment

### Quick Deploy to Netlify

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select repository
   - Add environment variables (see below)
   - Deploy!

3. **Environment Variables** (Add in Netlify)
   ```
   VITE_SUPABASE_URL=https://aiewsoqlfaobrcqtdezd.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

For detailed deployment instructions, see `DEPLOYMENT_GUIDE.md`.

## 📱 Features Overview

### Public Pages

#### Home
- Hero section with call-to-action
- Services overview
- Project showcase
- Customer testimonials
- Solar calculator
- Contact information

#### Services
- 6 service offerings with detailed information
- Interactive modals with pricing and timelines
- Benefits and process steps
- Request quote functionality

#### Projects
- Portfolio of 6 completed installations
- Project details with metrics
- Before/after information
- Environmental impact data

#### Resources
- Solar energy guides
- FAQ section
- Solar calculator
- Educational content

#### Contact
- Multi-step contact form
- Property type selection
- System size calculator
- Budget and timeline options
- Direct database integration

### Admin Dashboard

#### Dashboard
- Real-time statistics
- Quick action links
- System information
- Activity monitoring

#### Contact Queries
- View all customer inquiries
- Status management (New, Contacted, Completed, Cancelled)
- Detailed query information
- Delete functionality
- Real-time updates

#### Services Management (Placeholder)
- Future: Full CRUD operations
- Image upload support
- Display order management

#### Projects Management (Placeholder)
- Future: Full CRUD operations
- Image upload support
- Display order management

#### Users Management (Placeholder)
- Future: View all users
- Role management
- Activity monitoring

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (via ESLint)
- Strict mode enabled

## 🎨 Design System

### Colors

- **Primary**: Blue (solar energy theme)
- **Secondary**: Orange (sun/energy theme)
- **Accent**: Green (eco-friendly theme)

### Components

All UI components use shadcn/ui for consistency:
- Buttons, Cards, Dialogs
- Forms, Inputs, Selects
- Tabs, Badges, Progress bars
- Sheets (mobile menus)

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Admin-only access to management features
- Secure authentication with Supabase Auth
- Environment variables for sensitive data
- HTTPS enforced (via Netlify)
- Security headers configured

## 📈 Performance

- Vite for fast builds and HMR
- Code splitting with React Router
- Lazy loading for images
- Optimized bundle size
- CDN delivery via Netlify

## 🐛 Troubleshooting

### Build Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run build
```

### Database Issues

- Check Supabase project status
- Verify environment variables
- Check RLS policies
- Review browser console for errors

### Authentication Issues

- Clear browser cache
- Check Supabase Auth settings
- Verify redirect URLs
- Check user role in database

## 📞 Support

- **Email**: enterprisessethsawaliya@gmail.com
- **Phone**: +91-7014235836
- **Location**: Jaipur, Rajasthan

## 📄 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Backend by [Supabase](https://supabase.com)
- Icons from [Lucide](https://lucide.dev)
- Deployed on [Netlify](https://netlify.com)

---

**Seth Sawalia Solar Company** - Powering Jaipur with Clean Energy ☀️
