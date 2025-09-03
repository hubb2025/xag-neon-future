import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Package, ShoppingCart, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

interface DashboardStats {
  totalCustomers: number;
  totalDrones: number;
  totalOrders: number;
  openTickets: number;
  totalRevenue: number;
  lowStockDrones: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalDrones: 0,
    totalOrders: 0,
    openTickets: 0,
    totalRevenue: 0,
    lowStockDrones: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [
        { count: customersCount },
        { count: dronesCount },
        { count: ordersCount },
        { count: ticketsCount },
        { data: ordersData },
        { data: lowStockData }
      ] = await Promise.all([
        supabase.from('customers').select('*', { count: 'exact', head: true }),
        supabase.from('drones').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('support_tickets').select('*', { count: 'exact', head: true }).eq('status', 'open'),
        supabase.from('orders').select('total_amount'),
        supabase.from('drones').select('name, stock_quantity').lt('stock_quantity', 5)
      ]);

      const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      setStats({
        totalCustomers: customersCount || 0,
        totalDrones: dronesCount || 0,
        totalOrders: ordersCount || 0,
        openTickets: ticketsCount || 0,
        totalRevenue,
        lowStockDrones: lowStockData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const statCards = [
    {
      title: 'Total de Clientes',
      value: stats.totalCustomers,
      description: 'Clientes cadastrados',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Drones em Estoque',
      value: stats.totalDrones,
      description: 'Produtos disponíveis',
      icon: Package,
      color: 'text-green-600',
    },
    {
      title: 'Total de Vendas',
      value: stats.totalOrders,
      description: 'Pedidos realizados',
      icon: ShoppingCart,
      color: 'text-purple-600',
    },
    {
      title: 'Tickets Abertos',
      value: stats.openTickets,
      description: 'Suporte pendente',
      icon: MessageSquare,
      color: 'text-orange-600',
    },
    {
      title: 'Receita Total',
      value: formatCurrency(stats.totalRevenue),
      description: 'Faturamento total',
      icon: TrendingUp,
      color: 'text-emerald-600',
    },
    {
      title: 'Estoque Baixo',
      value: stats.lowStockDrones,
      description: 'Produtos com estoque < 5',
      icon: AlertCircle,
      color: 'text-red-600',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Visão geral do sistema DroneXag
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carregando...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">--</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do sistema DroneXag
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {stats.lowStockDrones > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Atenção: Estoque Baixo
            </CardTitle>
            <CardDescription className="text-orange-700">
              {stats.lowStockDrones} drone(s) com estoque baixo (menos de 5 unidades).
              Verifique a seção de produtos para mais detalhes.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}