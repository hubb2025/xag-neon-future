import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Package, AlertCircle } from 'lucide-react';

interface Drone {
  id: string;
  name: string;
  model: string;
  category_id?: string;
  description?: string;
  price: number;
  image_url?: string;
  specifications?: any;
  status: 'available' | 'maintenance' | 'sold' | 'reserved';
  stock_quantity: number;
  created_at: string;
  drone_categories?: { name: string };
}

interface DroneCategory {
  id: string;
  name: string;
  description?: string;
}

export default function Drones() {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [categories, setCategories] = useState<DroneCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDrone, setEditingDrone] = useState<Drone | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    category_id: '',
    description: '',
    price: '',
    image_url: '',
    status: 'available' as 'available' | 'maintenance' | 'sold' | 'reserved',
    stock_quantity: '',
    specifications: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDrones();
    fetchCategories();
  }, []);

  const fetchDrones = async () => {
    try {
      const { data, error } = await supabase
        .from('drones')
        .select(`
          *,
          drone_categories (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDrones(data || []);
    } catch (error) {
      console.error('Error fetching drones:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os drones.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('drone_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const droneData = {
        name: formData.name,
        model: formData.model,
        category_id: formData.category_id || null,
        description: formData.description || null,
        price: parseFloat(formData.price),
        image_url: formData.image_url || null,
        status: formData.status,
        stock_quantity: parseInt(formData.stock_quantity),
        specifications: formData.specifications ? JSON.parse(formData.specifications) : null,
      };

      if (editingDrone) {
        const { error } = await supabase
          .from('drones')
          .update(droneData)
          .eq('id', editingDrone.id);

        if (error) throw error;
        toast({
          title: "Drone atualizado",
          description: "As informações do drone foram atualizadas com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('drones')
          .insert([droneData]);

        if (error) throw error;
        toast({
          title: "Drone criado",
          description: "Novo drone foi adicionado com sucesso.",
        });
      }

      setIsDialogOpen(false);
      setEditingDrone(null);
      resetForm();
      fetchDrones();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o drone.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      model: '',
      category_id: '',
      description: '',
      price: '',
      image_url: '',
      status: 'available',
      stock_quantity: '',
      specifications: '',
    });
  };

  const handleEdit = (drone: Drone) => {
    setEditingDrone(drone);
    setFormData({
      name: drone.name,
      model: drone.model,
      category_id: drone.category_id || '',
      description: drone.description || '',
      price: drone.price.toString(),
      image_url: drone.image_url || '',
      status: drone.status,
      stock_quantity: drone.stock_quantity.toString(),
      specifications: drone.specifications ? JSON.stringify(drone.specifications, null, 2) : '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (droneId: string) => {
    if (!confirm('Tem certeza que deseja excluir este drone?')) return;

    try {
      const { error } = await supabase
        .from('drones')
        .delete()
        .eq('id', droneId);

      if (error) throw error;
      
      toast({
        title: "Drone excluído",
        description: "Drone foi removido com sucesso.",
      });
      fetchDrones();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o drone.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      available: { label: 'Disponível', variant: 'default' as const },
      maintenance: { label: 'Manutenção', variant: 'secondary' as const },
      sold: { label: 'Vendido', variant: 'destructive' as const },
      reserved: { label: 'Reservado', variant: 'outline' as const },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const filteredDrones = drones.filter((drone) =>
    drone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drone.drone_categories?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockDrones = drones.filter(drone => drone.stock_quantity < 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Drones</h2>
          <p className="text-muted-foreground">
            Gerencie todos os drones do sistema
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingDrone(null);
              resetForm();
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Drone
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDrone ? 'Editar Drone' : 'Novo Drone'}
              </DialogTitle>
              <DialogDescription>
                {editingDrone 
                  ? 'Atualize as informações do drone.' 
                  : 'Adicione um novo drone ao sistema.'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">Modelo *</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category_id">Categoria</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock_quantity">Estoque *</Label>
                    <Input
                      id="stock_quantity"
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponível</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                      <SelectItem value="sold">Vendido</SelectItem>
                      <SelectItem value="reserved">Reservado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image_url">URL da Imagem</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="specifications">Especificações (JSON)</Label>
                  <Textarea
                    id="specifications"
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    placeholder='{"camera": "4K", "autonomia": "30min", "alcance": "5km"}'
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {editingDrone ? 'Atualizar' : 'Criar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {lowStockDrones.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Atenção: Estoque Baixo
            </CardTitle>
            <CardDescription className="text-orange-700">
              {lowStockDrones.length} drone(s) com estoque baixo (menos de 5 unidades):
              {lowStockDrones.map(drone => ` ${drone.name} (${drone.stock_quantity})`).join(',')}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de Drones</CardTitle>
          <CardDescription>
            Total de {drones.length} drones cadastrados
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar drones..."
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
                <TableHead>Nome/Modelo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrones.map((drone) => (
                <TableRow key={drone.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{drone.name}</div>
                      <div className="text-sm text-muted-foreground">{drone.model}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {drone.drone_categories?.name || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(drone.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className={drone.stock_quantity < 5 ? 'text-orange-600 font-medium' : ''}>
                        {drone.stock_quantity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(drone.status)}
                  </TableCell>
                  <TableCell>
                    {new Date(drone.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(drone)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(drone.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}