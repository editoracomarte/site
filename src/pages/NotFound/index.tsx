import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <main className={styles['not-found']}>
      <h2>Não encontramos o que você procura :(</h2>
      <p>Verifique se o link que você digitou está correto ou tente novamente mais tarde.</p>
      <Link to="/">Voltar para início</Link>
    </main>
  );
}
