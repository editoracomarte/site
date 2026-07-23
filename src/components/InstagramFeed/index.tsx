import { useEffect, useState } from 'react';
import { useInstagramFeedQuery } from '@/queries/instagram';
import styles from './InstagramFeed.module.css';

const FALLBACK_POSTS: string[] = [
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
  const { data, isLoading, isError } = useInstagramFeedQuery();
  const posts = isError || !data?.length ? FALLBACK_POSTS : data.map((p) => p.url);

  const [showSkeleton, setShowSkeleton] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    const fadeTimer = setTimeout(() => setFadingOut(true), 700);
    return () => clearTimeout(fadeTimer);
  }, [isLoading]);

  useEffect(() => {
    if (!fadingOut) return;
    const removeTimer = setTimeout(() => setShowSkeleton(false), 400);
    return () => clearTimeout(removeTimer);
  }, [fadingOut]);

  useEffect(() => {
    if (!showSkeleton) window.instgrm?.Embeds?.process();
  }, [showSkeleton]);

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
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.post}>
            {showSkeleton ? (
              <div className={`${styles.skeleton} ${fadingOut ? styles.skeletonFadeOut : ''}`} />
            ) : (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={posts[i]}
                data-instgrm-version="14"
                style={{
                  justifySelf: 'center',
                  margin: '0 auto',
                  maxWidth: '500px',
                  width: '100%',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
