import type { Collection } from '@/api/collections';
import styles from './CollectionFilter.module.css';

interface CollectionFilterProps {
  collections: Collection[];
  value: string;
  onChange: (slug: string) => void;
  label: string;
  id?: string;
}

export function CollectionFilter({
  collections,
  value,
  onChange,
  label,
  id = 'colecao',
}: CollectionFilterProps) {
  return (
    <div className={styles.filter}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <select
        className={styles.select}
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Todas as coleções</option>
        {collections.map((collection) => (
          <option key={collection.slug} value={collection.slug}>
            {collection.name}
          </option>
        ))}
      </select>
    </div>
  );
}
