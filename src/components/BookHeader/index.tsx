import styles from './BookHeader.module.css';

interface BookHeaderProps {
  title: string;
  author: string;
  genres: string[];
}

export function BookHeader({ title, author, genres }: BookHeaderProps) {
  return (
    <section className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.author}>
        <span className="sr-only">Autoria:</span>
        {author}
      </h3>
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
