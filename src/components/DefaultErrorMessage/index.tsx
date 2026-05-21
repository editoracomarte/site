import { Link } from 'react-router-dom';

import styles from './DefaultErrorMessage.module.css';

export interface DefaultErrorMessageProps {
  title: string;
  message: string;
}

export function DefaultErrorMessage({ title, message }: DefaultErrorMessageProps) {
  return (
    <section className={styles['error-message']}>
      <h2>{title}</h2>
      <p>{message}</p>
      <Link to="/" className={styles.backlink}>
        Voltar para início
      </Link>
    </section>
  );
}
