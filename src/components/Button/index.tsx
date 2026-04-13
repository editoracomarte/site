import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export function Button({ children, variant = 'primary', onClick, className }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
}
