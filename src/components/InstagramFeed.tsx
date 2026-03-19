import styles from "./InstagramFeed.module.css";

const INSTAGRAM_HANDLE = "editoracomarte";
const POSTS: string[] = [
  "https://www.instagram.com/editoracomarte/p/DV3TUC-Fcwf/",
  "https://www.instagram.com/editoracomarte/p/DUdEoKWFW4s/",
  "https://www.instagram.com/editoracomarte/p/DULDBzzCQuU/",
];

export function InstagramFeed() {
  return (
    <section className={styles.section} aria-labelledby="instagram-heading">
      <div className={styles.headerRow}>
        <div className={styles.textBlock}>
          <h2 id="instagram-heading" className={styles.title}>
            Siga-nos no Instagram
          </h2>
          <p className={styles.subtitle}>
            Acompanhe novidades, lançamentos e bastidores editoriais.
          </p>
        </div>
      </div>

      <div className={styles.feed} aria-label="Publicações no Instagram">
        {POSTS.map((url) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noreferrer"
            className={styles.postLink}
            aria-label={`Abrir publicação no Instagram (${INSTAGRAM_HANDLE})`}
          >
            <div className={styles.postPlaceholder}>
              <span className={styles.postIcon} aria-hidden="true">
                📸
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
