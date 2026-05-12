import { useRef, useState, useCallback } from 'react';
import styles from './TodoPage.module.css';
import { useTodos } from '@/hooks/useTodos';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import KeyboardShortcutsHelp from '@/components/KeyboardShortcutsHelp';
import { CheckSquare, Keyboard } from 'lucide-react';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  const inputRef = useRef<HTMLInputElement>(null);
  const [showHelp, setShowHelp] = useState(false);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const toggleHelp = useCallback(() => {
    setShowHelp((v) => !v);
  }, []);

  useKeyboardShortcuts({
    onFocusInput: focusInput,
    onClearCompleted: clearCompleted,
    onFilterChange: setFilter,
    onToggleHelp: toggleHelp,
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <CheckSquare size={28} color="var(--color-accent)" />
          </div>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organized, get things done.</p>
          <button
            className={styles.helpBtn}
            onClick={toggleHelp}
            aria-label="Show keyboard shortcuts"
            title="Keyboard shortcuts (?)"
          >
            <Keyboard size={16} />
            <span>Shortcuts</span>
          </button>
        </header>

        <main className={styles.main}>
          <TodoInput onAdd={addTodo} inputRef={inputRef} />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
          {(activeCount > 0 || completedCount > 0) && (
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          )}
        </main>
      </div>

      {showHelp && <KeyboardShortcutsHelp onClose={() => setShowHelp(false)} />}
    </div>
  );
}
