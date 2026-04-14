import styles from './Authors.module.css';

export function Authors() {
  return (
    <main className="container">
      <section className={styles.authors}>
        <h1>
          <span className={styles.paper}>Autores</span>
        </h1>
      </section>
    </main>
  );
}
