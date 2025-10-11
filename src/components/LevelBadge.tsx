import { Badge } from "@/components/ui/badge";

interface LevelBadgeProps {
  level: 'Básico' | 'Intermediário' | 'Avançado';
  variant?: 'default' | 'outline';
}

export const LevelBadge = ({ level, variant = 'default' }: LevelBadgeProps) => {
  const getLevelColor = () => {
    switch (level) {
      case 'Básico':
        return 'bg-success text-success-foreground';
      case 'Intermediário':
        return 'bg-primary text-primary-foreground';
      case 'Avançado':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelEmoji = () => {
    switch (level) {
      case 'Básico':
        return '🌱';
      case 'Intermediário':
        return '🚀';
      case 'Avançado':
        return '⭐';
      default:
        return '📚';
    }
  };

  if (variant === 'outline') {
    return (
      <Badge variant="outline" className="font-medium">
        {getLevelEmoji()} {level}
      </Badge>
    );
  }

  return (
    <Badge className={`${getLevelColor()} font-medium`}>
      {getLevelEmoji()} {level}
    </Badge>
  );
};
