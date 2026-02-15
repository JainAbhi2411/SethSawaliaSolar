import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { RouteGuard } from '@/components/common/RouteGuard';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import MainLayout from './components/layouts/MainLayout';
import routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <RouteGuard>
          <IntersectObserver />
          <Routes>
            {routes.map((route, index) => {
              // Handle routes with children (like admin routes)
              if (route.children) {
                return (
                  <Route key={index} path={route.path} element={route.element}>
                    {route.children.map((child, childIndex) => (
                      <Route
                        key={childIndex}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                  </Route>
                );
              }
              
              // Handle routes without MainLayout (login, admin)
              if (route.path === '/login' || route.path.startsWith('/admin')) {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                );
              }
              
              // Regular routes with MainLayout
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<MainLayout>{route.element}</MainLayout>}
                />
              );
            })}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </RouteGuard>
      </AuthProvider>
    </Router>
  );
};

export default App;
