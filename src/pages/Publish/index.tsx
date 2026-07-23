import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { usePublishQuery } from '@/queries/publish';
import { blockText } from '@/utils/blocks';
import styles from './Publish.module.css';

export function Publish() {
  const { data, isLoading } = usePublishQuery();

  const [h1, ...body] = (data?.content as unknown as BlocksContent) ?? [];
  const heading = h1 ? blockText(h1) || 'Seleção de originais' : 'Seleção de originais';

  return (
    <main className="container">
      <section className={styles.publish}>
        <h1>
          <span className={styles.paper}>{heading}</span>
        </h1>
        {!isLoading && body.length > 0 && <BlocksRenderer content={body} />}
      </section>
    </main>
  );
}
