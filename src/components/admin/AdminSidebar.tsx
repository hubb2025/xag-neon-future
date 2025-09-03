import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  MessageSquare,
  MapPin,
  Settings,
  Key,
  Plane,
  LogOut,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Clientes", url: "/admin/customers", icon: Users },
  { title: "Drones", url: "/admin/drones", icon: Plane },
  { title: "Vendas", url: "/admin/orders", icon: ShoppingCart },
  { title: "Suporte", url: "/admin/support", icon: MessageSquare },
  { title: "Tokens API", url: "/admin/tokens", icon: Key },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { signOut, profile } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/admin") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) =>
    isActive(path) 
      ? "admin-nav-active" 
      : "admin-nav-item";

  return (
    <Sidebar 
      className={`admin-sidebar ${collapsed ? "admin-sidebar-collapsed" : "admin-sidebar-expanded"}`} 
      collapsible="icon"
    >
      <SidebarContent className="admin-sidebar-content">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <div className="admin-logo">
              <Plane className="admin-logo-icon" />
            </div>
            {!collapsed && (
              <div className="admin-brand">
                <h2 className="admin-brand-title">DroneXag</h2>
                <p className="admin-brand-subtitle">Painel Administrativo</p>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        {!collapsed && profile && (
          <div className="admin-user-section">
            <div className="admin-user-info">
              <div className="admin-avatar">
                <span className="admin-avatar-text">
                  {profile.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="admin-user-details">
                <p className="admin-user-name">{profile.full_name}</p>
                <span className="admin-user-role">{profile.role}</span>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup className="admin-menu-group">
          {!collapsed && (
            <SidebarGroupLabel className="admin-menu-label">
              Menu Principal
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="admin-menu">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="admin-menu-item-wrapper" style={{ animationDelay: `${index * 0.05}s` }}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`admin-menu-link ${getNavCls(item.url)}`}
                    >
                      <item.icon className="admin-menu-icon" />
                      {!collapsed && <span className="admin-menu-text">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="admin-logout-section">
          <Button
            variant="ghost"
            onClick={signOut}
            className={`admin-logout-btn ${collapsed ? "admin-logout-collapsed" : ""}`}
          >
            <LogOut className="admin-logout-icon" />
            {!collapsed && <span className="admin-logout-text">Sair</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}