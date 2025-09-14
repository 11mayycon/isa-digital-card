import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PainelSidebar from '@/components/PainelSidebar';
import { supabase } from '@/integrations/supabase/client';

const PainelTransacoes = () => {
  const { matricula } = useParams();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: '',
    type: ''
  });

  useEffect(() => {
    loadTransactions();
  }, [matricula]);

  const loadTransactions = async () => {
    if (!matricula) return;

    try {
      // Buscar usuário pela matrícula
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('matricula', matricula)
        .single();

      if (user) {
        // Buscar transações do usuário
        const { data: transactionData } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        setTransactions(transactionData || []);
      }
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async () => {
    if (!matricula || !newTransaction.amount || !newTransaction.type) return;

    try {
      // Buscar usuário
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('matricula', matricula)
        .single();

      if (user) {
        // Adicionar transação
        await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            amount: parseFloat(newTransaction.amount),
            description: newTransaction.description,
            category: newTransaction.category,
            type: newTransaction.type
          });

        // Resetar formulário e recarregar
        setNewTransaction({ amount: '', description: '', category: '', type: '' });
        setIsAddModalOpen(false);
        loadTransactions();
      }
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    const categoryMatch = !filterCategory || t.category === filterCategory;
    const typeMatch = !filterType || t.type === filterType;
    return categoryMatch && typeMatch;
  });

  const categories = [...new Set(transactions.map(t => t.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex h-screen">
        <PainelSidebar matricula={matricula || ''} />
        <main className="flex-1 p-6 animate-pulse">
          <div className="h-8 bg-muted rounded mb-6 w-1/3" />
          <div className="h-96 bg-muted rounded" />
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Transações</h1>
              <p className="text-muted-foreground">Gerencie suas receitas e despesas</p>
            </div>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="btn-glow bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Transação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Transação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Valor (R$)</Label>
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Tipo</Label>
                    <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receita">Receita</SelectItem>
                        <SelectItem value="gasto">Gasto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Categoria</Label>
                    <Input
                      placeholder="Ex: Alimentação, Transporte..."
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      placeholder="Descrição opcional..."
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleAddTransaction} className="w-full">
                    Adicionar Transação
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filtros */}
          <Card className="card-glass mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os tipos</SelectItem>
                    <SelectItem value="receita">Receitas</SelectItem>
                    <SelectItem value="gasto">Gastos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Transações */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="w-5 h-5" />
                Histórico de Transações
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length > 0 ? (
                <div className="space-y-3">
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${transaction.type === 'receita' ? 'bg-success' : 'bg-destructive'}`} />
                          <div>
                            <p className="font-medium">{transaction.description || 'Sem descrição'}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.category} • {new Date(transaction.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${transaction.type === 'receita' ? 'text-success' : 'text-destructive'}`}>
                          {transaction.type === 'receita' ? '+' : '-'}R$ {parseFloat(transaction.amount).toLocaleString('pt-BR')}
                        </p>
                        <Badge variant={transaction.type === 'receita' ? 'default' : 'destructive'} className="text-xs">
                          {transaction.type === 'receita' ? 'Receita' : 'Gasto'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ArrowUpDown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {transactions.length === 0 
                      ? 'Nenhuma transação registrada ainda.'
                      : 'Nenhuma transação encontrada com os filtros aplicados.'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PainelTransacoes;