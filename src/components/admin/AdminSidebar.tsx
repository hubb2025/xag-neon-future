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
      ? "bg-white/20 text-white font-medium border-r-4 border-white shadow-lg" 
      : "hover:bg-white/10 text-white/90 hover:text-white transition-all duration-200";

  return (
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-64"} bg-gradient-to-b from-green-600 to-green-700 border-r-0 shadow-xl animate-slide-in-right`} 
      collapsible="icon"
    >
      <SidebarContent className="bg-transparent">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div className="animate-fade-in">
                <h2 className="font-bold text-xl text-white">DroneXag</h2>
                <p className="text-xs text-white/80">Painel Administrativo</p>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        {!collapsed && profile && (
          <div className="p-4 border-b border-white/20 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                <span className="text-lg font-semibold text-white">
                  {profile.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{profile.full_name}</p>
                <p className="text-xs text-white/80 capitalize bg-white/10 px-2 py-1 rounded-full inline-block">
                  {profile.role}
                </p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup className="px-0">
          {!collapsed && (
            <SidebarGroupLabel className="text-white/80 font-semibold px-4 text-xs uppercase tracking-wider">
              Menu Principal
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className={`animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 hover-scale ${getNavCls(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t border-white/20">
          <Button
            variant="ghost"
            onClick={signOut}
            className={`w-full justify-start gap-3 text-white hover:text-white hover:bg-red-500/20 hover:border-red-400/50 border border-transparent transition-all duration-300 rounded-xl py-3 ${
              collapsed ? "px-3" : ""
            } hover-scale`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">Sair</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}