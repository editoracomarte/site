import { Link } from 'react-router-dom';
import booksData from '@/db/books.json';
import type { Collection } from '@/api/collections';
import { useCollectionsQuery } from '@/queries/collections';
import styles from './BookCollections.module.css';

const fallbackCollections: Collection[] = [
  ...new Set(booksData.filter((b) => b.collection.length > 0).map((b) => b.collection)),
]
  .slice(0, 3)
  .map((name) => ({ name, slug: '' }));

export function BookCollections() {
  const { data, isError } = useCollectionsQuery();

  const collections = isError || !data?.length ? fallbackCollections : data.slice(0, 3);

  return (
    <section className={styles.collections}>
      <ul>
        {collections.map((collection, index) => (
          <li key={collection.slug || collection.name} className={styles['collection-item']}>
            <CollectionStrip
              name={collection.name}
              slug={collection.slug}
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
  slug,
  className,
}: {
  name: string;
  slug: string;
  className: string;
}) {
  const to = slug
    ? `/catalogo?colecao=${encodeURIComponent(slug)}`
    : `/catalogo?busca=${encodeURIComponent(name)}`;

  return (
    <Link to={to} className={`${styles.collection} ${className}`}>
      <h3>{name}</h3>
    </Link>
  );
}
