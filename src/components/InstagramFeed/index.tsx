import { useEffect } from 'react';
import styles from './InstagramFeed.module.css';

const POSTS: string[] = [
  'https://www.instagram.com/p/DV3TUC-Fcwf/?utm_source=ig_embed&amp;utm_campaign=loading',
  'https://www.instagram.com/p/DUdEoKWFW4s/?utm_source=ig_embed&amp;utm_campaign=loading',
  'https://www.instagram.com/p/DULDBzzCQuU/?utm_source=ig_embed&amp;utm_campaign=loading',
];

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export function InstagramFeed() {
  useEffect(() => {
    window.instgrm?.Embeds?.process();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="instagram-heading">
      <div className={styles.header}>
        <h2 id="instagram-heading" className={styles.title}>
          Siga-nos no <span className={styles.paper}>Instagram</span>!
        </h2>
        <p className={styles.subtitle}>
          Nosso canal oficial de comunição. Acompanhe novidades, lançamentos, bastidores editoriais
          e muito mais em{' '}
          <a
            href="https://www.instagram.com/editoracomarte"
            target="_blank"
            rel="noopener noreferrer"
          >
            @editoracomarte
          </a>
          .
        </p>
      </div>

      <div className={styles.feed} aria-label="Publicações no Instagram">
        {POSTS.map((url, index) => (
          <div className={styles.post}>
            <blockquote
              key={index}
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{
                justifySelf: 'center',
                margin: '0 auto',
                maxWidth: '500px',
                width: '100%',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
