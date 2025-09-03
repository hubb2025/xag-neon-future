import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Send, MessageSquare, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  message: string;
  is_internal: boolean;
  sender_id?: string;
  created_at: string;
  profiles?: { full_name: string; role: string };
}

interface TicketMessagesProps {
  ticketId: string;
  onClose: () => void;
}

export function TicketMessages({ ticketId, onClose }: TicketMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    fetchMessages();
    setupRealtimeSubscription();
  }, [ticketId]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select(`
          id,
          message,
          is_internal,
          sender_id,
          created_at,
          profiles (
            full_name,
            role
          )
        `)
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Erro ao carregar mensagens');
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel(`ticket-messages-${ticketId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'support_messages',
          filter: `ticket_id=eq.${ticketId}`
        },
        (payload) => {
          // Fetch the complete message with profile data
          supabase
            .from('support_messages')
            .select(`
              id,
              message,
              is_internal,
              sender_id,
              created_at,
              profiles (
                full_name,
                role
              )
            `)
            .eq('id', payload.new.id)
            .single()
            .then(({ data }) => {
              if (data) {
                setMessages(prev => [...prev, data]);
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !profile) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('support_messages')
        .insert([{
          ticket_id: ticketId,
          message: newMessage.trim(),
          is_internal: isInternal,
          sender_id: profile.id
        }]);

      if (error) throw error;

      setNewMessage('');
      toast.success('Mensagem enviada com sucesso');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erro ao enviar mensagem');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversas do Ticket
            </CardTitle>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversas do Ticket
          </CardTitle>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
        <CardDescription>
          Histórico de mensagens e comunicação interna
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Messages List */}
        <div className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma mensagem ainda</p>
              <p className="text-sm">Seja o primeiro a enviar uma mensagem</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.is_internal ? 'bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800' : ''}`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="text-xs">
                    {message.profiles?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {message.profiles?.full_name || 'Usuário'}
                    </span>
                    {message.profiles?.role && (
                      <Badge variant="outline" className="text-xs">
                        {message.profiles.role}
                      </Badge>
                    )}
                    {message.is_internal && (
                      <Badge variant="secondary" className="text-xs">
                        Interno
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                      <Clock className="h-3 w-3" />
                      {formatTime(message.created_at)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Message Form */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="internal"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="internal" className="text-sm">
              Mensagem interna (visível apenas para a equipe)
            </label>
          </div>
          
          <div className="flex gap-2">
            <Textarea
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSendMessage();
                }
              }}
              className="flex-1"
              rows={3}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Pressione Ctrl+Enter para enviar rapidamente
          </p>
        </div>
      </CardContent>
    </Card>
  );
}