import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  isSaved: boolean;
  onToggle: () => void;
  size?: 'sm' | 'default';
  className?: string;
}

const BookmarkButton = ({ isSaved, onToggle, size = 'default', className }: BookmarkButtonProps) => {
  return (
    <Button
      variant="ghost"
      size={size === 'sm' ? 'icon' : 'default'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        'transition-all',
        isSaved && 'text-primary',
        className
      )}
      title={isSaved ? 'Remover da biblioteca' : 'Salvar na biblioteca'}
    >
      <Bookmark className={cn('w-5 h-5', isSaved && 'fill-current')} />
    </Button>
  );
};

export default BookmarkButton;
