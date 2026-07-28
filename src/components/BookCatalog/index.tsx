import { Link } from 'react-router-dom';
import { useFeaturedBooksQuery } from '@/queries/books';
import booksData from '@/db/books.json';
import type { Book } from '@/api/books';
import { getCoverUrl } from '@/utils/covers';
import styles from './BookCatalog.module.css';

const fallbackBooks: Book[] = [...booksData]
  .slice(0, 12)
  .map((b) => ({ slug: b.slug, title: b.title, autoria: b.author }));

export function BookCatalog() {
  const { data, isLoading, isError } = useFeaturedBooksQuery();

  if (isLoading) return null;

  const books = isError || !data?.data.length ? fallbackBooks : data.data;

  return (
    <section>
      <div className={styles.grid}>
        {books.map((book) => (
          <Link key={book.slug} to={`/catalogo/${book.slug}`} style={{ textDecoration: 'none' }}>
            <article className={styles.card}>
              <div className={styles.cover} aria-label={book.title}>
                <img
                  src={getCoverUrl(book.slug, book.coverUrl)}
                  alt={book.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayText}>{book.title}</div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
