import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { NotificationBell } from '@/components/NotificationBell';
import { useAuth } from '@/hooks/useAuth';
import { Menu } from 'lucide-react';

export default function AdminLayout() {
  const { profile } = useAuth();

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
              
              <div className="flex items-center gap-4">
                <NotificationBell />
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