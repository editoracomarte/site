import styles from './Catalog.module.css';

export function Catalog() {
  return (
    <main className="container">
      <section className={styles.catalog}>
        <h1>
          <span className={styles.paper}>Catálogo</span>
        </h1>
      </section>
    </main>
  );
}
