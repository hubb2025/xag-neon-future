import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Package, ShoppingCart, MessageSquare, TrendingUp, AlertCircle, Activity, Zap, Bell } from 'lucide-react';

interface DashboardStats {
  totalCustomers: number;
  totalDrones: number;
  totalOrders: number;
  openTickets: number;
  totalRevenue: number;
  lowStockDrones: number;
  criticalTickets: number;
  recentTickets: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalDrones: 0,
    totalOrders: 0,
    openTickets: 0,
    totalRevenue: 0,
    lowStockDrones: 0,
    criticalTickets: 0,
    recentTickets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
    setupRealtimeSubscription();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [
        { count: customersCount },
        { count: dronesCount },
        { count: ordersCount },
        { count: ticketsCount },
        { count: criticalTicketsCount },
        { data: ordersData },
        { data: lowStockData },
        { data: recentTicketsData }
      ] = await Promise.all([
        supabase.from('customers').select('*', { count: 'exact', head: true }),
        supabase.from('drones').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('support_tickets').select('*', { count: 'exact', head: true }).eq('status', 'open'),
        supabase.from('support_tickets').select('*', { count: 'exact', head: true }).eq('priority', 'critical'),
        supabase.from('orders').select('total_amount'),
        supabase.from('drones').select('name, stock_quantity').lt('stock_quantity', 5),
        supabase.from('support_tickets')
          .select('id, ticket_number, subject, created_at, status, priority, customers(full_name)')
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      setStats({
        totalCustomers: customersCount || 0,
        totalDrones: dronesCount || 0,
        totalOrders: ordersCount || 0,
        openTickets: ticketsCount || 0,
        criticalTickets: criticalTicketsCount || 0,
        totalRevenue,
        lowStockDrones: lowStockData?.length || 0,
        recentTickets: recentTicketsData || [],
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('dashboard-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_tickets'
        },
        () => {
          fetchDashboardStats();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',  
          table: 'orders'
        },
        () => {
          fetchDashboardStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  const statCards = [
    {
      title: 'Clientes Ativos',
      value: stats.totalCustomers,
      description: 'Total de clientes cadastrados',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      title: 'Drones Disponíveis',
      value: stats.totalDrones,
      description: 'Produtos em estoque',
      icon: Package,
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      title: 'Vendas Realizadas',
      value: stats.totalOrders,
      description: 'Total de pedidos',
      icon: ShoppingCart,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      title: 'Tickets Críticos',
      value: stats.criticalTickets,
      description: 'Prioridade crítica',
      icon: Bell,
      gradient: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
    {
      title: 'Suporte Ativo',
      value: stats.openTickets,
      description: 'Tickets em aberto',
      icon: MessageSquare,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
    {
      title: 'Receita Total',
      value: formatCurrency(stats.totalRevenue),
      description: 'Faturamento acumulado',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600 animate-pulse" />
            <span className="text-sm text-gray-500">Atualizando dados...</span>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="admin-card animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Visão geral do sistema DroneXag em tempo real
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Zap className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">Sistema Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <Card
            key={index}
            className="border border-green-500 rounded-xl bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-white">
                {card.title}
              </CardTitle>
              <div className="p-2 rounded-lg border border-green-500 bg-gray-800">
                <card.icon className="h-4 w-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {card.value}
              </div>
              <p className="text-xs text-gray-300">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Support Tickets */}
      {stats.recentTickets.length > 0 && (
        <Card className="border-green-500 bg-gray-900/50 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-400" />
              Tickets Recentes
            </CardTitle>
            <CardDescription className="text-gray-300">
              Últimos tickets de suporte recebidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentTickets.map((ticket: any) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">{ticket.ticket_number}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        ticket.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 truncate">{ticket.subject}</p>
                    <p className="text-xs text-gray-400">
                      {ticket.customers?.full_name || 'Cliente'} • {new Date(ticket.created_at).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Low Stock Alert */}
      {stats.lowStockDrones > 0 && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 animate-pulse" />
              Atenção: Estoque Crítico Detectado
            </CardTitle>
            <CardDescription className="text-orange-700">
              <strong>{stats.lowStockDrones}</strong> produto(s) com estoque baixo (menos de 5 unidades).
              <br />
              <span className="text-sm">Recomendamos reposição imediata para evitar ruptura de estoque.</span>
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center hover-scale">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Clientes</span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center hover-scale">
              <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Produtos</span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center hover-scale">
              <ShoppingCart className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Vendas</span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center hover-scale">
              <MessageSquare className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Suporte</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}