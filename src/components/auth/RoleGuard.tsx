import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'support' | 'it';
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export function RoleGuard({ 
  children, 
  requiredRole, 
  requireAuth = false, 
  fallback 
}: RoleGuardProps) {
  const { user, profile, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !user) {
    return fallback || (
      <Alert className="max-w-md mx-auto mt-8">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          You must be logged in to access this content.
        </AlertDescription>
      </Alert>
    );
  }

  // Check role requirement
  if (requiredRole && (!profile || !hasRole(requiredRole))) {
    return fallback || (
      <Alert className="max-w-md mx-auto mt-8">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          You don't have the required permissions to access this content.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}