import type { ReactNode } from 'react';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminLayout from './components/layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import ConsultationRequestsAdmin from './pages/admin/ConsultationRequests';
import QuoteRequestsAdmin from './pages/admin/QuoteRequests';
import ServicesAdmin from './pages/admin/Services';
import ProjectsAdmin from './pages/admin/Projects';
import UsersAdmin from './pages/admin/Users';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Services',
    path: '/services',
    element: <Services />
  },
  {
    name: 'Projects',
    path: '/projects',
    element: <Projects />
  },
  {
    name: 'About Us',
    path: '/about',
    element: <About />
  },
  {
    name: 'Resources',
    path: '/resources',
    element: <Resources />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <AdminLayout />,
    visible: false,
    children: [
      {
        name: 'Dashboard',
        path: '',
        element: <AdminDashboard />
      },
      {
        name: 'Consultation Requests',
        path: 'consultations',
        element: <ConsultationRequestsAdmin />
      },
      {
        name: 'Quote Requests',
        path: 'quotes',
        element: <QuoteRequestsAdmin />
      },
      {
        name: 'Services',
        path: 'services',
        element: <ServicesAdmin />
      },
      {
        name: 'Projects',
        path: 'projects',
        element: <ProjectsAdmin />
      },
      {
        name: 'Users',
        path: 'users',
        element: <UsersAdmin />
      }
    ]
  }
];

export default routes;