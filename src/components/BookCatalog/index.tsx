import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedBooks, type Book } from '@/api/books';
import booksData from '@/db/books.json';
import styles from './BookCatalog.module.css';

const slugToCover: Record<string, string> = Object.fromEntries(
  booksData.map((b) => [b.slug, b.cover_url]),
);

const fallbackBooks: Book[] = booksData.slice(0, 12).map((b) => ({
  slug: b.slug,
  title: b.title,
  autoria: b.author,
}));

function getCoverUrl(slug: string): string {
  const filename = slugToCover[slug];
  if (filename) return `/covers/${filename}`;
  return 'https://placehold.co/600x600';
}

export function BookCatalog() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedBooks()
      .then((res) => {
        setBooks(res.data.length > 0 ? res.data : fallbackBooks);
      })
      .catch(() => {
        setBooks(fallbackBooks);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section>
      <div className={styles.grid}>
        {books.map((book) => (
          <Link key={book.slug} to={`/catalogo/${book.slug}`} style={{ textDecoration: 'none' }}>
            <article className={styles.card}>
              <div className={styles.cover} aria-label={book.title}>
                <img
                  src={getCoverUrl(book.slug)}
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
