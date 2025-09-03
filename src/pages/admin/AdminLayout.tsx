import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Menu } from 'lucide-react';

export default function AdminLayout() {
  const { user, loading, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-loading-content">
          <Loader2 className="admin-loading-spinner" />
          <p className="admin-loading-text">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="admin-layout">
        <AdminSidebar />
        
        <div className="admin-main-container">
          {/* Header */}
          <header className="admin-main-header">
            <SidebarTrigger className="admin-sidebar-trigger">
              <Menu className="admin-sidebar-trigger-icon" />
            </SidebarTrigger>
            
            <div className="admin-header-content-main">
              <div className="admin-header-info">
                <h1 className="admin-header-title">
                  Painel Administrativo
                </h1>
                <p className="admin-header-subtitle">
                  Gerencie seu sistema DroneXag
                </p>
              </div>
              
              {profile && (
                <div className="admin-user-badge">
                  <div className="admin-user-badge-avatar">
                    <span className="admin-user-badge-initial">
                      {profile.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="admin-user-badge-info">
                    <p className="admin-user-badge-name">
                      {profile.full_name}
                    </p>
                    <p className="admin-user-badge-role">
                      {profile.role}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </header>
          
          {/* Main Content */}
          <main className="admin-main-content">
            <div className="admin-content-wrapper">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}