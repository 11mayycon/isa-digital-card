import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  ArrowUpDown,
  CreditCard,
  Bell,
  Target,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  Badge as BadgeIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', icon: Home, path: '/painel/:matricula' },
  { title: 'Transações', icon: ArrowUpDown, path: '/painel/:matricula/transacoes' },
  { title: 'Cartões de Crédito', icon: CreditCard, path: '/painel/:matricula/cartoes' },
  { title: 'Lembretes', icon: Bell, path: '/painel/:matricula/lembretes', badge: '3' },
  { title: 'Metas Financeiras', icon: Target, path: '/painel/:matricula/metas' },
  { title: 'Relatórios', icon: BarChart3, path: '/painel/:matricula/relatorios' },
  { title: 'Configurações', icon: Settings, path: '/painel/:matricula/configuracoes' },
  { title: 'Suporte', icon: HelpCircle, path: '/painel/:matricula/suporte' },
];

interface PainelSidebarProps {
  matricula: string;
}

const PainelSidebar = ({ matricula }: PainelSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    const actualPath = path.replace(':matricula', matricula);
    return location.pathname === actualPath || 
           (actualPath.includes('/painel/' + matricula) && location.pathname.startsWith('/painel/' + matricula));
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300",
          "lg:static lg:translate-x-0",
          isCollapsed ? "-translate-x-full lg:w-20" : "translate-x-0 w-72"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <Badge className="bg-gradient-primary text-lg px-3 py-1 font-bold">
                  ISA 2.0
                </Badge>
                <div className="text-sm">
                  <p className="font-medium">#{matricula}</p>
                  <p className="text-muted-foreground text-xs">Usuário Ativo</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-accent"
            >
              {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const path = item.path.replace(':matricula', matricula);
            const isActive = isActiveRoute(item.path);

            return (
              <NavLink
                key={item.title}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-primary text-primary-foreground shadow-glow"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive && "text-primary-foreground"
                )} />
                
                {!isCollapsed && (
                  <>
                    <span className="font-medium flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-secondary text-secondary-foreground"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          {!isCollapsed && (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <BadgeIcon className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">Plano Ativo</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Válido até 14/10/2025
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-60 lg:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="w-4 h-4" />
      </Button>
    </>
  );
};

export default PainelSidebar;