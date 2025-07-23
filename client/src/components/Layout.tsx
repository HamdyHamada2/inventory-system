import { useState } from "react";
import { Outlet } from "react-router-dom";
import { 
  Package, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  Home,
  Menu,
  Bell,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "لوحة التحكم", path: "/" },
  { icon: Package, label: "المنتجات", path: "/products" },
  { icon: BarChart3, label: "التقارير", path: "/reports" },
  { icon: AlertTriangle, label: "التنبيهات", path: "/alerts", badge: 3 },
  { icon: Settings, label: "الإعدادات", path: "/settings" },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Sidebar */}
      <div className={cn(
        "bg-white border-l border-border transition-all duration-300 shadow-card",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          {sidebarOpen && (
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              نظام المخزون
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-accent"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start text-right gap-3 hover:bg-accent hover:text-accent-foreground transition-colors",
                !sidebarOpen && "justify-center px-2"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.badge && sidebarOpen && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -left-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              {sidebarOpen && <span className="flex-1">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-border shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-foreground">
                مرحباً بك في نظام إدارة المخزون
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs p-0"
                >
                  3
                </Badge>
              </Button>
              
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-muted/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}                                            