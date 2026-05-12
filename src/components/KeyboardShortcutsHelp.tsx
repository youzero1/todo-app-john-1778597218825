import styles from './KeyboardShortcutsHelp.module.css';
import { X } from 'lucide-react';

type Props = {
  onClose: () => void;
};

const SHORTCUTS = [
  { keys: ['N'], description: 'Focus new task input' },
  { keys: ['1'], description: 'Show all tasks' },
  { keys: ['2'], description: 'Show active tasks' },
  { keys: ['3'], description: 'Show completed tasks' },
  { keys: ['X'], description: 'Clear completed tasks' },
  { keys: ['Esc'], description: 'Focus new task input' },
  { keys: ['Enter'], description: 'Add / confirm task' },
  { keys: ['Esc'], description: 'Cancel editing' },
  { keys: ['?'], description: 'Toggle this help panel' },
];

export default function KeyboardShortcutsHelp({ onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Keyboard Shortcuts</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close help">
            <X size={18} />
          </button>
        </div>
        <ul className={styles.list}>
          {SHORTCUTS.map((s, i) => (
            <li key={i} className={styles.row}>
              <div className={styles.keys}>
                {s.keys.map((k) => (
                  <kbd key={k} className={styles.kbd}>{k}</kbd>
                ))}
              </div>
              <span className={styles.desc}>{s.description}</span>
            </li>
          ))}
        </ul>
        <p className={styles.hint}>Press <kbd className={styles.kbd}>?</kbd> to toggle this panel</p>
      </div>
    </div>
  );
}
