import styles from "./BookHeader.module.css";

interface BookHeaderProps {
  title: string;
  author: string;
  genre: string;
}

export function BookHeader({ title, author, genre }: BookHeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>{author}</p>
      <div className={styles.tags}>
        <span className={styles.tag}>{genre}</span>
      </div>
    </div>
  );
}
