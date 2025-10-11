import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

interface ProgressDataPoint {
  date: string;
  score: number;
  exercises: number;
}

interface ProgressChartProps {
  data: ProgressDataPoint[];
  title?: string;
}

export const ProgressChart = ({ data, title = "Seu Progresso" }: ProgressChartProps) => {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-success" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {data.length > 0 ? Math.round(data.reduce((acc, d) => acc + d.score, 0) / data.length) : 0}%
            </div>
            <div className="text-xs text-muted-foreground">Média Geral</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {data.length > 0 ? Math.max(...data.map(d => d.score)) : 0}%
            </div>
            <div className="text-xs text-muted-foreground">Melhor Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {data.reduce((acc, d) => acc + d.exercises, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total de Exercícios</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
