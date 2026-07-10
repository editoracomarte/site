import styles from './BookTechnicalInfo.module.css';

interface BookTechnicalInfoProps {
  isbn: string;
  genres: string[];
  pages: number | null;
  format: string;
  publishingYear: number;
  collection?: string;
}

export function BookTechnicalInfo({
  isbn,
  genres,
  pages,
  format,
  publishingYear,
  collection,
}: BookTechnicalInfoProps) {
  return (
    <section className={styles['technical-section']}>
      <h3>Informações Técnicas</h3>
      <ul className={styles.metadata}>
        <li className={styles['metadata-item']}>
          <h4 className={styles.label}>Coleção</h4>
          <p className={styles.value}>{collection || '-'}</p>
        </li>
        <li className={styles['metadata-item']}>
          <h4 className={styles.label}>ISBN</h4>
          <p className={styles.value}>{isbn || '-'}</p>
        </li>
        <li className={styles['metadata-item']}>
          <h4 className={styles.label}>Gênero</h4>
          <p className={styles.value}>{genres.length > 0 ? genres.join(', ') : '-'}</p>
        </li>
        <li className={styles['metadata-item']}>
          <h4 className={styles.label}>Páginas</h4>
          <p className={styles.value}>{pages ?? '-'}</p>
        </li>
        <li className={styles['metadata-item']}>
          <h4 className={styles.label}>Formato</h4>
          <p className={styles.value}>{format || '-'}</p>
        </li>
        <li className={styles['metadata-item']}>
          <h4 className={styles.label}>Ano de Publicação</h4>
          <p className={styles.value}>{publishingYear ?? '-'}</p>
        </li>
      </ul>
    </section>
  );
}
