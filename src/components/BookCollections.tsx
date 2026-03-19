import booksData from "../db/books.json";
import styles from "./BookCollections.module.css";

const collections = [...new Set(
  booksData
    .filter(book => book.collection.length > 0)
    .map(book => book.collection)
)];

export function BookCollections() {
  return <section className={styles.collections}>
    <ul>
      {collections.map(collection => (
        <li key={collection}>
          <CollectionStrip name={collection} />
        </li>
      ))}
    </ul>
  </section>;
}

export function CollectionStrip({ name }: { name: string }) {
  return <section className={styles.collection}>
    <h3>{name}</h3>
  </section>;
}
