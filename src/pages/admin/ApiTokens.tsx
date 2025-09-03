import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Plus, Search, Copy, Trash2, Key, CalendarIcon, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ApiToken {
  id: string;
  name: string;
  token_hash: string;
  created_by: string;
  permissions?: any;
  expires_at?: string;
  is_active: boolean;
  last_used_at?: string;
  created_at: string;
  profiles?: { full_name: string };
}

export default function ApiTokens() {
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showToken, setShowToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    expires_at: null as Date | null,
  });
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const { toast } = useToast();
  const { profile } = useAuth();

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('api_tokens')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTokens(data || []);
    } catch (error) {
      console.error('Error fetching tokens:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os tokens.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateRandomToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'dxg_';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const hashToken = async (token: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setLoading(true);

    try {
      const token = generateRandomToken();
      const tokenHash = await hashToken(token);

      const tokenData = {
        name: formData.name,
        token_hash: tokenHash,
        created_by: profile.id,
        expires_at: formData.expires_at?.toISOString() || null,
        permissions: {},
        is_active: true,
      };

      const { error } = await supabase
        .from('api_tokens')
        .insert([tokenData]);

      if (error) throw error;

      setGeneratedToken(token);
      toast({
        title: "Token criado",
        description: "Novo token de API foi criado com sucesso.",
      });
      
      setFormData({
        name: '',
        expires_at: null,
      });
      fetchTokens();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar o token.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tokenId: string) => {
    if (!confirm('Tem certeza que deseja excluir este token? Esta ação não pode ser desfeita.')) return;

    try {
      const { error } = await supabase
        .from('api_tokens')
        .delete()
        .eq('id', tokenId);

      if (error) throw error;
      
      toast({
        title: "Token excluído",
        description: "Token foi removido com sucesso.",
      });
      fetchTokens();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o token.",
        variant: "destructive",
      });
    }
  };

  const toggleTokenStatus = async (tokenId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('api_tokens')
        .update({ is_active: !currentStatus })
        .eq('id', tokenId);

      if (error) throw error;
      
      toast({
        title: "Status atualizado",
        description: `Token foi ${!currentStatus ? 'ativado' : 'desativado'} com sucesso.`,
      });
      fetchTokens();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível atualizar o status.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Token copiado para a área de transferência.",
    });
  };

  const maskToken = (token: string) => {
    if (token.length <= 8) return token;
    return token.substring(0, 4) + '•'.repeat(token.length - 8) + token.substring(token.length - 4);
  };

  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTokensCount = tokens.filter(t => t.is_active).length;
  const expiredTokensCount = tokens.filter(t => 
    t.expires_at && new Date(t.expires_at) < new Date()
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tokens API</h2>
          <p className="text-muted-foreground">
            Gerencie tokens de acesso à API
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setFormData({
                name: '',
                expires_at: null,
              });
              setGeneratedToken(null);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Token
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Token</DialogTitle>
              <DialogDescription>
                Crie um novo token de acesso à API. Guarde-o em local seguro pois não será possível visualizá-lo novamente.
              </DialogDescription>
            </DialogHeader>
            
            {generatedToken ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">Seu novo token:</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="flex-1 p-2 bg-background rounded text-sm font-mono break-all">
                      {generatedToken}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generatedToken)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    ⚠️ Copie este token agora. Por segurança, ele não será exibido novamente.
                  </p>
                </div>
                <DialogFooter>
                  <Button onClick={() => {
                    setIsDialogOpen(false);
                    setGeneratedToken(null);
                  }}>
                    Fechar
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome do Token *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: API Produção, Integração Mobile"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Data de Expiração (opcional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !formData.expires_at && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.expires_at ? (
                            format(formData.expires_at, "dd/MM/yyyy")
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.expires_at || undefined}
                          onSelect={(date) => setFormData({ ...formData, expires_at: date || null })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    Criar Token
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tokens</CardTitle>
            <Key className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tokens.length}</div>
            <p className="text-xs text-muted-foreground">Tokens criados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Ativos</CardTitle>
            <Key className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeTokensCount}</div>
            <p className="text-xs text-muted-foreground">Em uso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Expirados</CardTitle>
            <Key className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredTokensCount}</div>
            <p className="text-xs text-muted-foreground">Necessitam renovação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Tokens</CardTitle>
          <CardDescription>
            Gerencie todos os tokens de acesso à API
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado por</TableHead>
                <TableHead>Expira em</TableHead>
                <TableHead>Último uso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTokens.map((token) => {
                const isExpired = token.expires_at && new Date(token.expires_at) < new Date();
                const isVisible = showToken === token.id;
                
                return (
                  <TableRow key={token.id}>
                    <TableCell className="font-medium">
                      {token.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono">
                          {isVisible ? token.token_hash.substring(0, 16) + '...' : maskToken(token.token_hash)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowToken(isVisible ? null : token.id)}
                        >
                          {isVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(token.token_hash)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={token.is_active ? "default" : "secondary"}>
                          {token.is_active ? "Ativo" : "Inativo"}
                        </Badge>
                        {isExpired && (
                          <Badge variant="destructive">Expirado</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {token.profiles?.full_name || 'Usuário removido'}
                    </TableCell>
                    <TableCell>
                      {token.expires_at ? (
                        <span className={isExpired ? 'text-red-600' : ''}>
                          {new Date(token.expires_at).toLocaleDateString('pt-BR')}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Nunca</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {token.last_used_at ? (
                        new Date(token.last_used_at).toLocaleDateString('pt-BR')
                      ) : (
                        <span className="text-muted-foreground">Nunca usado</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTokenStatus(token.id, token.is_active)}
                        >
                          {token.is_active ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(token.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}