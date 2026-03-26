import { Link } from "react-router-dom";
import booksData from "../db/books.json";
import styles from "./BookCatalog.module.css";

export function BookCatalog() {
  function getCoverUrl(coverUrl: string) {
    return `/covers/${coverUrl}`;
  }

  return (
    <section>
      <div className={styles.grid}>
        {booksData.slice(0, 12).map((book) => (
          <Link
            key={book.slug}
            to={`/catalogo/${book.slug}`}
            style={{ textDecoration: "none" }}
          >
            <article className={styles.card}>
              <div className={styles.cover} aria-label={book.title}>
                <img
                  src={getCoverUrl(book.cover_url)}
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
