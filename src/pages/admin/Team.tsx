import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, Users, Mail, Shield, Trash2, Edit, UserX, UserCheck, MoreVertical, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { teamInvitationSchema, generateInvitationToken, type TeamInvitationData } from '@/lib/validation';
import { z } from 'zod';

type MemberStatus = 'pendente' | 'ativo' | 'suspenso';

interface TeamMember {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'support' | 'it';
  status: MemberStatus;
  created_at: string;
  user_id: string | null; // Null if they haven't created their account yet
}

const roleLabels = {
  admin: 'Administrador',
  support: 'Suporte', 
  it: 'TI'
};

const roleColors = {
  admin: 'bg-red-100 text-red-800 border-red-200',
  support: 'bg-blue-100 text-blue-800 border-blue-200',
  it: 'bg-purple-100 text-purple-800 border-purple-200'
};

const statusLabels = {
  pendente: 'Pendente',
  ativo: 'Ativo',
  suspenso: 'Suspenso'
};

const statusColors = {
  pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  ativo: 'bg-green-100 text-green-800 border-green-200',
  suspenso: 'bg-red-100 text-red-800 border-red-200'
};

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<string, string>>>({});
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    description: string;
    variant: "default" | "destructive";
    confirmText: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    description: '',
    variant: "default",
    confirmText: 'Confirmar',
    onConfirm: () => {}
  });
  const [newMember, setNewMember] = useState({
    email: '',
    full_name: '',
    role: 'support' as 'admin' | 'support' | 'it',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, status, created_at, user_id')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Erro ao buscar membros da equipe:', error);
      toast.error('Erro ao carregar membros da equipe');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async () => {
    setValidationErrors({});

    try {
      // Validate required fields
      if (!newMember.email || !newMember.full_name || !newMember.role || !newMember.password) {
        toast.error('Todos os campos são obrigatórios');
        return;
      }

      if (newMember.password.length < 6) {
        toast.error('A senha deve ter pelo menos 6 caracteres');
        return;
      }

      if (newMember.password !== newMember.confirmPassword) {
        toast.error('As senhas não coincidem');
        return;
      }

      // Check if email already exists in profiles
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', newMember.email)
        .maybeSingle();

      if (existingProfile) {
        toast.error('Este email já está cadastrado na equipe');
        return;
      }

      // Create user account directly using Supabase Auth with emailRedirectTo
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: newMember.email,
        password: newMember.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            full_name: newMember.full_name,
            role: newMember.role
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      toast.success(`Usuário ${newMember.full_name} cadastrado com sucesso! Um email de confirmação foi enviado para ${newMember.email}. O usuário deve confirmar o email antes de fazer login.`);
      
      setIsDialogOpen(false);
      setNewMember({ 
        email: '', 
        full_name: '', 
        role: 'support', 
        password: '', 
        confirmPassword: '' 
      });
      setValidationErrors({});
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Erro ao cadastrar usuário:', error);
      toast.error(error.message || 'Erro ao cadastrar usuário');
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: 'admin' | 'support' | 'it') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', memberId);

      if (error) throw error;
      
      toast.success('Função atualizada com sucesso!');
      fetchTeamMembers();
    } catch (error) {
      console.error('Erro ao atualizar função:', error);
      toast.error('Erro ao atualizar função do membro');
    }
  };

  const handleUpdateStatus = async (memberId: string, newStatus: MemberStatus) => {    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', memberId);

      if (error) throw error;
      
      toast.success(`Status atualizado para ${statusLabels[newStatus]}!`);
      fetchTeamMembers();
      setConfirmModal(prev => ({ ...prev, open: false }));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status do membro');
    }
  };

  const handleDeleteMember = async (memberId: string) => {    
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', memberId);

      if (error) throw error;
      
      toast.success('Membro removido da equipe!');
      fetchTeamMembers();
      setConfirmModal(prev => ({ ...prev, open: false }));
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      toast.error('Erro ao remover membro da equipe');
    }
  };

  const openConfirmModal = (config: Omit<typeof confirmModal, 'open'>) => {
    setConfirmModal({
      ...config,
      open: true
    });
  };

  const handleMemberChange = (field: string, value: string) => {
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
    
    setNewMember(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gerenciar Equipe
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Convide e gerencie membros da equipe DroneXag
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Cadastrar Membro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Membro</DialogTitle>
              <DialogDescription>
                Adicione um novo membro à equipe DroneXag. Um email de confirmação será enviado automaticamente.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={newMember.email}
                  onChange={(e) => handleMemberChange('email', e.target.value)}
                  className={validationErrors.email ? "border-destructive" : ""}
                />
                {validationErrors.email && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.email}
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Nome do membro"
                  value={newMember.full_name}
                  onChange={(e) => handleMemberChange('full_name', e.target.value)}
                  className={validationErrors.full_name ? "border-destructive" : ""}
                />
                {validationErrors.full_name && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.full_name}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={newMember.password}
                    onChange={(e) => handleMemberChange('password', e.target.value)}
                    className={validationErrors.password ? "border-destructive" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {validationErrors.password && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.password}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme a senha"
                    value={newMember.confirmPassword}
                    onChange={(e) => handleMemberChange('confirmPassword', e.target.value)}
                    className={validationErrors.confirmPassword ? "border-destructive" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {validationErrors.confirmPassword && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.confirmPassword}
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="role">Função</Label>
                <Select 
                  value={newMember.role} 
                  onValueChange={(value: any) => handleMemberChange('role', value)}
                >
                  <SelectTrigger className={validationErrors.role ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Suporte</SelectItem>
                    <SelectItem value="it">TI</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.role && (
                  <div className="flex items-center mt-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.role}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleInviteMember}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastrar Usuário
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Membros</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.role === 'admin').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suporte</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.role === 'support').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outros</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.role !== 'admin' && m.role !== 'support').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Membros da Equipe</CardTitle>
          <CardDescription>
            Gerencie as funções e permissões dos membros da equipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      {member.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{member.full_name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[member.status]}>
                    {statusLabels[member.status]}
                  </Badge>
                  <Badge className={roleColors[member.role]}>
                    {roleLabels[member.role]}
                  </Badge>
                  <Select
                    value={member.role}
                    onValueChange={(newRole: 'admin' | 'support' | 'it') => handleUpdateRole(member.id, newRole)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Suporte</SelectItem>
                      <SelectItem value="it">TI</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {member.status === 'ativo' ? (
                        <DropdownMenuItem
                          onClick={() => openConfirmModal({
                            title: 'Suspender Membro',
                            description: `Tem certeza que deseja suspender ${member.full_name}? Eles não poderão mais acessar o sistema.`,
                            variant: 'destructive',
                            confirmText: 'Suspender',
                            onConfirm: () => handleUpdateStatus(member.id, 'suspenso')
                          })}
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          Suspender
                        </DropdownMenuItem>
                      ) : member.status === 'suspenso' ? (
                        <DropdownMenuItem
                          onClick={() => openConfirmModal({
                            title: 'Ativar Membro',
                            description: `Tem certeza que deseja ativar ${member.full_name}? Eles poderão acessar o sistema novamente.`,
                            variant: 'default',
                            confirmText: 'Ativar',
                            onConfirm: () => handleUpdateStatus(member.id, 'ativo')
                          })}
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Ativar
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => openConfirmModal({
                            title: 'Ativar Membro',
                            description: `Tem certeza que deseja ativar ${member.full_name}?`,
                            variant: 'default',
                            confirmText: 'Ativar',
                            onConfirm: () => handleUpdateStatus(member.id, 'ativo')
                          })}
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Ativar
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem
                        onClick={() => openConfirmModal({
                          title: 'Remover Membro',
                          description: `Tem certeza que deseja remover ${member.full_name} da equipe? Esta ação não pode ser desfeita.`,
                          variant: 'destructive',
                          confirmText: 'Remover',
                          onConfirm: () => handleDeleteMember(member.id)
                        })}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal(prev => ({ ...prev, open }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        description={confirmModal.description}
        variant={confirmModal.variant}
        confirmText={confirmModal.confirmText}
      />
    </div>
  );
}