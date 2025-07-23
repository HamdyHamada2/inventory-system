import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className
}: StatCardProps) {
  return (
    <Card className={cn(
      "bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {trend && trendValue && (
          <div className={cn(
            "flex items-center text-xs mt-2",
            trend === "up" && "text-success",
            trend === "down" && "text-destructive",
            trend === "neutral" && "text-muted-foreground"
          )}>
            <span className="font-medium">{trendValue}</span>
            <span className="mr-1">منذ الشهر الماضي</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}            