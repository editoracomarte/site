import styles from './Loading.module.css';

export function Loading() {
  return (
    <span className={styles.message}>
      Carregando<span className={styles.dot1}>.</span>
      <span className={styles.dot2}>.</span>
      <span className={styles.dot3}>.</span>
    </span>
  );
}
