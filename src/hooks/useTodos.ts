import { useState, useCallback } from 'react';
import { Todo, FilterType } from '@/types';

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem('todos');
    if (!raw) return [];
    return JSON.parse(raw) as Todo[];
  } catch {
    return [];
  }
}

function saveToStorage(todos: Todo[]): void {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadFromStorage());
  const [filter, setFilter] = useState<FilterType>('all');

  const persistAndSet = useCallback((updater: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => {
      const next = updater(prev);
      saveToStorage(next);
      return next;
    });
  }, []);

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: generateId(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    persistAndSet((prev) => [newTodo, ...prev]);
  }, [persistAndSet]);

  const toggleTodo = useCallback((id: string) => {
    persistAndSet((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [persistAndSet]);

  const deleteTodo = useCallback((id: string) => {
    persistAndSet((prev) => prev.filter((t) => t.id !== id));
  }, [persistAndSet]);

  const editTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    persistAndSet((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  }, [persistAndSet]);

  const clearCompleted = useCallback(() => {
    persistAndSet((prev) => prev.filter((t) => !t.completed));
  }, [persistAndSet]);

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return {
    todos,
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
  };
}
