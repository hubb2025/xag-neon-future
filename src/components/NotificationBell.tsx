import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'new_ticket' | 'ticket_update' | 'system';
  created_at: string;
  read: boolean;
  ticket_id?: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    setupRealtimeSubscription();
  }, []);

  const fetchNotifications = async () => {
    // Fetch recent support tickets as notifications
    const { data: tickets } = await supabase
      .from('support_tickets')
      .select('id, ticket_number, subject, created_at, status, customers(full_name)')
      .order('created_at', { ascending: false })
      .limit(10);

    if (tickets) {
      const notificationData = tickets.map(ticket => ({
        id: ticket.id,
        title: 'Novo Ticket de Suporte',
        message: `${ticket.ticket_number} - ${ticket.customers?.full_name || 'Cliente'}: ${ticket.subject}`,
        type: 'new_ticket' as const,
        created_at: ticket.created_at,
        read: false,
        ticket_id: ticket.id
      }));

      setNotifications(notificationData);
      setUnreadCount(notificationData.length);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('support-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'support_tickets'
        },
        (payload) => {
          const newNotification = {
            id: payload.new.id,
            title: 'Novo Ticket de Suporte',
            message: `${payload.new.ticket_number} - ${payload.new.subject}`,
            type: 'new_ticket' as const,
            created_at: payload.new.created_at,
            read: false,
            ticket_id: payload.new.id
          };

          setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
          setUnreadCount(prev => prev + 1);
          
          toast.success('Novo ticket de suporte recebido!', {
            description: `${payload.new.ticket_number} - ${payload.new.subject}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m atrás`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h atrás`;
    } else {
      return `${Math.floor(diffInHours / 24)}d atrás`;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden z-50 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Notificações</CardTitle>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      Marcar todas como lidas
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {unreadCount > 0 && (
                <CardDescription>
                  Você tem {unreadCount} notificação{unreadCount !== 1 ? 'ões' : ''} não lida{unreadCount !== 1 ? 's' : ''}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    Nenhuma notificação
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        !notification.read ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {notification.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notification.created_at)}
                          </span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}