import { useBooksQuery } from '@/queries/books';
import styles from './Catalog.module.css';

export function Catalog() {
  const { data: books, isLoading, isError, error } = useBooksQuery();

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <main className="container">
      <section className={styles.catalog}>
        <h1>
          <span className={styles.paper}>Catálogo</span>
        </h1>
        {books && books.data.map((book) => <>{JSON.stringify(book)}</>)}
      </section>
    </main>
  );
}
