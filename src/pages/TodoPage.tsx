import styles from './TodoPage.module.css';
import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import { CheckSquare } from 'lucide-react';

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

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <CheckSquare size={28} color="var(--color-accent)" />
          </div>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organized, get things done.</p>
        </header>

        <main className={styles.main}>
          <TodoInput onAdd={addTodo} />
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
    </div>
  );
}
