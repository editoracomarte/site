import styles from "./BookTechnicalInfo.module.css";

interface BookTechnicalInfoProps {
  isbn: string;
  genre: string;
  pages: number | null;
  format: string;
  publishingYear: number;
  collection?: string;
}

export function BookTechnicalInfo({
  isbn,
  genre,
  pages,
  format,
  publishingYear,
  collection,
}: BookTechnicalInfoProps) {
  return (
    <section className={styles.technicalSection}>
      <h2 className={styles.sectionTitle}>Informações Técnicas</h2>
      <div className={styles.metadata}>
        {collection && (
          <div className={styles.metadata__item}>
            <span className={styles.metaLabel}>Coleção</span>
            <span className={styles.metadata__value}>{collection}</span>
          </div>
        )}
        <div className={styles.metadata__item}>
          <span className={styles.metaLabel}>ISBN</span>
          <span className={styles.metadata__value}>{isbn}</span>
        </div>
        <div className={styles.metadata__item}>
          <span className={styles.metaLabel}>Gênero</span>
          <span className={styles.metadata__value}>{genre}</span>
        </div>
        <div className={styles.metadata__item}>
          <span className={styles.metaLabel}>Páginas</span>
          <span className={styles.metadata__value}>{pages}</span>
        </div>
        <div className={styles.metadata__item}>
          <span className={styles.metaLabel}>Formato</span>
          <span className={styles.metadata__value}>{format}</span>
        </div>
        <div className={styles.metadata__item}>
          <span className={styles.metaLabel}>Ano de Publicação</span>
          <span className={styles.metadata__value}>{publishingYear}</span>
        </div>
      </div>
    </section>
  );
}
