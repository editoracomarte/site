import { Link } from 'react-router-dom';
import { useRelatedBooksQuery } from '@/queries/books';
import { getCoverUrl } from '@/utils/covers';
import styles from './RelatedBooks.module.css';

type RelatedBooksProps = {
  slug: string;
};

export function RelatedBooks({ slug }: RelatedBooksProps) {
  const { data, isLoading, isError } = useRelatedBooksQuery({ slug });

  if (isLoading || isError || !data?.length) return null;

  return (
    <section>
      <h3>Livros Relacionados</h3>
      <div className={styles.grid}>
        {data.map((book) => (
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
