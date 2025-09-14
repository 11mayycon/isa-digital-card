import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  Bell,
  Plus,
  Eye
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PainelSidebar from '@/components/PainelSidebar';

// Mock data - será substituído pelo Supabase
const mockTransactions = [
  { categoria: 'Alimentação', valor: 850, tipo: 'gasto' },
  { categoria: 'Transporte', valor: 320, tipo: 'gasto' },
  { categoria: 'Lazer', valor: 450, tipo: 'gasto' },
  { categoria: 'Salário', valor: 3500, tipo: 'receita' },
  { categoria: 'Freelance', valor: 800, tipo: 'receita' },
];

const mockReminders = [
  { titulo: 'Cartão Nubank', data: '2024-09-18', valor: 1250 },
  { titulo: 'Aluguel', data: '2024-09-20', valor: 1800 },
  { titulo: 'Internet', data: '2024-09-25', valor: 89 },
];

const mockChartData = [
  { mes: 'Abr', receitas: 4200, gastos: 2800 },
  { mes: 'Mai', receitas: 3800, gastos: 3200 },
  { mes: 'Jun', receitas: 4500, gastos: 2900 },
  { mes: 'Jul', receitas: 4100, gastos: 3100 },
  { mes: 'Ago', receitas: 4300, gastos: 2750 },
  { mes: 'Set', receitas: 4300, gastos: 1620 },
];

const COLORS = ['hsl(217, 91%, 60%)', 'hsl(187, 85%, 53%)', 'hsl(32, 95%, 44%)', 'hsl(142, 76%, 36%)', 'hsl(0, 84%, 60%)'];

const PainelDashboard = () => {
  const { matricula } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Cálculos baseados nos dados mock
  const receitas = mockTransactions.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
  const gastos = mockTransactions.filter(t => t.tipo === 'gasto').reduce((sum, t) => sum + t.valor, 0);
  const saldo = receitas - gastos;

  const gastosData = mockTransactions
    .filter(t => t.tipo === 'gasto')
    .map(t => ({ name: t.categoria, value: t.valor }));

  if (loading) {
    return (
      <div className="flex h-screen">
        <PainelSidebar matricula={matricula || ''} />
        <main className="flex-1 p-6 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <PainelSidebar matricula={matricula || ''} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard Financeiro</h1>
            <p className="text-muted-foreground">Bem-vindo de volta! Aqui está um resumo das suas finanças.</p>
          </div>

          {/* Cards principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-glass animate-fade-up">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${saldo >= 0 ? 'text-success' : 'text-destructive'}`}>
                  R$ {saldo.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-muted-foreground">
                  {saldo >= 0 ? '+' : ''}R$ {(saldo * 0.15).toFixed(0)} vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receitas do Mês</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">R$ {receitas.toLocaleString('pt-BR')}</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gastos do Mês</CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">R$ {gastos.toLocaleString('pt-BR')}</div>
                <p className="text-xs text-muted-foreground">
                  -8.2% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cartão Mais Usado</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Nubank</div>
                <p className="text-xs text-muted-foreground">
                  R$ 850 gastos este mês
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Seção de Lembretes e Ações Rápidas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 card-glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Próximos Lembretes
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockReminders.map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <div>
                      <p className="font-medium">{reminder.titulo}</p>
                      <p className="text-sm text-muted-foreground">{reminder.data}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">R$ {reminder.valor.toLocaleString('pt-BR')}</p>
                      <Badge variant="outline" className="text-xs">
                        Pendente
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start btn-glow bg-gradient-primary hover:bg-gradient-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Transação
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Adicionar Cartão
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Relatório
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Distribuição de Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gastosData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {gastosData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Receita vs Despesa (últimos 6 meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']} />
                      <Line 
                        type="monotone" 
                        dataKey="receitas" 
                        stroke="hsl(142, 76%, 36%)" 
                        strokeWidth={3}
                        name="Receitas"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="gastos" 
                        stroke="hsl(0, 84%, 60%)" 
                        strokeWidth={3}
                        name="Gastos"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PainelDashboard;