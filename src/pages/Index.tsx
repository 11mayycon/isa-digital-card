import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, BarChart3, CreditCard, Bell, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-primary text-lg px-6 py-2 font-bold mb-6">
            ISA 2.0
          </Badge>
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Sistema de Gestão Financeira
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Plataforma completa para controle financeiro pessoal com dashboard avançado, 
            gráficos interativos e gestão de cartões de crédito.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/usuarios">
              <Button size="lg" className="btn-glow bg-gradient-primary hover:bg-gradient-primary/90 text-lg px-8">
                <Users className="w-5 h-5 mr-2" />
                Acessar Painel de Usuários
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="card-glass animate-fade-up text-center">
            <CardHeader>
              <BarChart3 className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle>Dashboard Completo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visão geral das suas finanças com gráficos interativos e métricas em tempo real
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass animate-fade-up text-center" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CreditCard className="w-12 h-12 mx-auto text-secondary mb-4" />
              <CardTitle>Gestão de Cartões</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Controle completo dos seus cartões de crédito, limites e gastos mensais
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass animate-fade-up text-center" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <Bell className="w-12 h-12 mx-auto text-warning mb-4" />
              <CardTitle>Lembretes Inteligentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nunca mais perca um vencimento com nosso sistema de lembretes automáticos
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass animate-fade-up text-center" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <Target className="w-12 h-12 mx-auto text-success mb-4" />
              <CardTitle>Metas Financeiras</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Defina e acompanhe suas metas financeiras com progresso visual
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Info */}
        <div className="text-center bg-accent/30 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">🚀 Demo do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold mb-2">✅ Para testar o login:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Matrícula <code className="bg-primary/20 px-2 py-1 rounded">11111</code> → Acesso liberado</li>
                <li>• Matrícula <code className="bg-destructive/20 px-2 py-1 rounded">12345</code> → Matrícula inválida</li>
                <li>• Matrícula <code className="bg-warning/20 px-2 py-1 rounded">99999</code> → Sem assinatura ativa</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📊 Funcionalidades ativas:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Dashboard com dados mockados</li>
                <li>• Gráficos interativos (Recharts)</li>
                <li>• Sidebar responsiva com 8 abas</li>
                <li>• Design system completo</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm">
              💡 <strong>Próximo passo:</strong> Conecte ao Supabase para ativar o banco de dados real, 
              autenticação e todas as funcionalidades backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
