import { useEffect, useId, useRef, useState } from 'react';
import styles from './FilterPill.module.css';

export interface FilterPillOption {
  value: string;
  label: string;
}

interface FilterPillProps {
  label: string;
  allLabel: string;
  options: FilterPillOption[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterPill({ label, allLabel, options, value, onChange }: FilterPillProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedLabel = options.find((option) => option.value === value)?.label ?? allLabel;

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.pill}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={popoverId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {label}: {selectedLabel}
        <span aria-hidden="true" className={styles.chevron}>
          ▾
        </span>
      </button>

      {isOpen && (
        <ul id={popoverId} className={styles.popover} role="listbox">
          <li>
            <button
              type="button"
              className={value === '' ? `${styles.option} ${styles.active}` : styles.option}
              onClick={() => handleSelect('')}
              role="option"
              aria-selected={value === ''}
            >
              {allLabel}
            </button>
          </li>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={
                  value === option.value ? `${styles.option} ${styles.active}` : styles.option
                }
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={value === option.value}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
