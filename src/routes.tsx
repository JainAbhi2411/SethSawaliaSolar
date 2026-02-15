import type { ReactNode } from 'react';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
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
  }
];

export default routes;
