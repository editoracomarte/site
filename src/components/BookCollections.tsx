import booksData from "../db/books.json";
import styles from "./BookCollections.module.css";

const collections = [
  ...new Set(
    booksData
      .filter((book) => book.collection.length > 0)
      .map((book) => book.collection),
  ),
].slice(0, 3);

export function BookCollections() {
  return (
    <section className={styles.collections}>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <CollectionStrip
              name={collection}
              className={styles[`variant-${index + 1}`]}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CollectionStrip({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <section className={`${styles.collection} ${className}`}>
      <h3>{name}</h3>
    </section>
  );
}
