import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { useAboutUsQuery } from '@/queries/aboutUs';
import { blockText, splitAtHeading } from '@/utils/blocks';
import styles from './AboutUs.module.css';

export function AboutUs() {
  const { data, isLoading } = useAboutUsQuery();

  const [h1, ...rest] = (data?.content as unknown as BlocksContent) ?? [];
  const { before: aboutBlocks, heading: h2Block, after: creditsBlocks } = splitAtHeading(rest, 2);

  const heading = h1 ? blockText(h1) || 'Quem Somos' : 'Quem Somos';
  const creditsHeading = h2Block
    ? blockText(h2Block) || 'Créditos Institucionais'
    : 'Créditos Institucionais';

  return (
    <main className="container">
      <section className={styles.about}>
        <h1>
          <span className={styles.paper}>{heading}</span>
        </h1>
        {!isLoading && aboutBlocks.length > 0 && <BlocksRenderer content={aboutBlocks} />}
      </section>
      <section className={styles.about}>
        <h2>
          <span className={styles.paper}>{creditsHeading}</span>
        </h2>
        {!isLoading && creditsBlocks.length > 0 && (
          <div className={styles.creditBlocks}>
            <BlocksRenderer content={creditsBlocks} />
          </div>
        )}
      </section>
    </main>
  );
}
