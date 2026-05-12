import { useEffect } from 'react';
import { FilterType } from '@/types';

type UseKeyboardShortcutsOptions = {
  onFocusInput: () => void;
  onClearCompleted: () => void;
  onFilterChange: (filter: FilterType) => void;
  onToggleHelp: () => void;
};

export function useKeyboardShortcuts({
  onFocusInput,
  onClearCompleted,
  onFilterChange,
  onToggleHelp,
}: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

      // ? — toggle help (always)
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        if (!isTyping) {
          e.preventDefault();
          onToggleHelp();
        }
        return;
      }

      // Escape — focus input (always)
      if (e.key === 'Escape') {
        onFocusInput();
        return;
      }

      if (isTyping) return;

      switch (e.key) {
        case 'n':
        case 'N':
          e.preventDefault();
          onFocusInput();
          break;
        case '1':
          e.preventDefault();
          onFilterChange('all');
          break;
        case '2':
          e.preventDefault();
          onFilterChange('active');
          break;
        case '3':
          e.preventDefault();
          onFilterChange('completed');
          break;
        case 'x':
        case 'X':
          e.preventDefault();
          onClearCompleted();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onFocusInput, onClearCompleted, onFilterChange, onToggleHelp]);
}
