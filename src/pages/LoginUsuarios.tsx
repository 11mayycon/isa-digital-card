import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, AlertTriangle } from 'lucide-react';

const LoginUsuarios = () => {
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricula.trim()) {
      setError('Digite sua matrícula');
      return;
    }

    setLoading(true);
    setError('');
    setBlocked(false);

    try {
      // Simular validação - conectar com Supabase depois
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock: Simular diferentes cenários
      if (matricula === '12345') {
        setError('Matrícula inválida. Verifique seus dados.');
      } else if (matricula === '99999') {
        setBlocked(true);
      } else {
        // Sucesso - redirecionar para o painel
        navigate(`/painel/${matricula}`);
      }
    } catch (err) {
      setError('Erro ao validar matrícula. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (blocked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-glass">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">🚫 Acesso Negado</h1>
              <p className="text-muted-foreground">
                Para usar a ISA 2.0, você precisa ter um plano ativo.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full btn-glow bg-gradient-primary hover:bg-gradient-primary/90"
              onClick={() => window.open('https://stripe.com', '_blank')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              🔗 Assine Agora
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setBlocked(false)}
            >
              Voltar ao Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <Card className="w-full max-w-md card-glass relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">
            <Badge className="bg-gradient-primary text-lg px-4 py-2 font-bold">
              ISA 2.0
            </Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold gradient-text">
              Painel de Usuários
            </h1>
            <p className="text-muted-foreground">
              Entre com sua matrícula para acessar
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Matrícula</label>
              <Input
                type="text"
                placeholder="Digite sua matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="text-center text-lg font-mono tracking-wider"
                disabled={loading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full btn-glow bg-gradient-primary hover:bg-gradient-primary/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validando...
                </>
              ) : (
                'Acessar Painel 🚀'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>💳 Cartão digital de acesso</p>
            <p className="mt-1">Apenas usuários com plano ativo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginUsuarios;