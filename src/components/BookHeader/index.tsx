import { Link } from 'react-router-dom';
import styles from './BookHeader.module.css';

interface BookHeaderProps {
  title: string;
  authors: { name: string; slug: string }[];
  genres: string[];
}

export function BookHeader({ title, authors, genres }: BookHeaderProps) {
  return (
    <section className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {authors.length > 0 && (
        <h3 className={styles.author}>
          <span className="sr-only">Autoria:</span>
          {authors.map((a, i) => (
            <span key={a.slug}>
              {i > 0 && ', '}
              <Link to={`/autores/${a.slug}`} className={styles['author-link']}>
                {a.name}
              </Link>
            </span>
          ))}
        </h3>
      )}
      <ul className={styles.tags}>
        {genres.map((genre, index) => (
          <li key={index}>
            <span className={styles.tag}>{genre}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
