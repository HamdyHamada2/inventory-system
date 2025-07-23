import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock data
const statsData = [
  {
    title: "إجمالي المنتجات",
    value: "1,234",
    icon: <Package className="h-4 w-4" />,
    description: "منتج متاح",
    trend: "up" as const,
    trendValue: "+12%"
  },
  {
    title: "قيمة المخزون",
    value: "₪ 45,678",
    icon: <DollarSign className="h-4 w-4" />,
    description: "إجمالي القيمة",
    trend: "up" as const,
    trendValue: "+8%"
  },
  {
    title: "منتجات قليلة",
    value: "23",
    icon: <AlertTriangle className="h-4 w-4" />,
    description: "تحتاج إعادة تموين",
    trend: "down" as const,
    trendValue: "-5%"
  },
    {
    title: "معدل الدوران",
    value: "2.3x",
    icon: <TrendingUp className="h-4 w-4" />,
    description: "مرة في السنة",
    trend: "up" as const,
    trendValue: "+15%"
  }
];

const lowStockProducts = [
  { name: "لابتوب ديل", stock: 5, minStock: 10, category: "إلكترونيات" },
  { name: "طابعة كانون", stock: 2, minStock: 8, category: "مكتبية" },
  { name: "ماوس لوجيتك", stock: 8, minStock: 15, category: "إكسسوارات" },
  { name: "شاشة سامسونج", stock: 3, minStock: 6, category: "إلكترونيات" },
];

const recentActivity = [
  { action: "إضافة منتج جديد", product: "كيبورد ميكانيكي", time: "منذ 5 دقائق" },
  { action: "تحديث المخزون", product: "لابتوب ديل", time: "منذ 15 دقيقة" },
  { action: "بيع منتج", product: "ماوس لوجيتك", time: "منذ 30 دقيقة" },
  { action: "تنبيه مخزون قليل", product: "طابعة كانون", time: "منذ ساعة" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-warning" />
              تنبيهات المخزون القليل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>المخزون الحالي: {product.stock}</span>
                      <span>الحد الأدنى: {product.minStock}</span>
                    </div>
                    <Progress 
                      value={(product.stock / product.minStock) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
                <Badge variant="destructive" className="mr-3">
                  قليل
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-primary">{activity.product}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-primary text-white shadow-elevated">
        <CardHeader>
          <CardTitle className="text-white">إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center">
              <Package className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm">إضافة منتج</span>
            </button>
            <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm">عرض التقارير</span>
            </button>
            <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm">إدارة التنبيهات</span>
            </button>
            <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center">
              <DollarSign className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm">تقرير المبيعات</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}