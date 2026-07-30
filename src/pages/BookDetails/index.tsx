import { useParams } from 'react-router-dom';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useBookQuery } from '@/queries/books';
import { Loading } from '@/components/Loading';
import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';
import { BookHeader } from '@/components/BookHeader';
import { BookTechnicalInfo } from '@/components/BookTechnicalInfo';
import { RelatedBooks } from '@/components/RelatedBooks';
import { CartIcon } from '@/components/CartIcon';
import { getCoverUrl } from '@/utils/covers';
import styles from './BookDetails.module.css';

export function BookDetails() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useBookQuery({ slug: slug ?? '' });

  if (isLoading) {
    return (
      <main className="container">
        <Loading />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="container">
        <DefaultErrorMessage
          title="Livro não encontrado :("
          message="Desculpe, não conseguimos encontrar este livro em nosso catálogo."
        />
      </main>
    );
  }

  const book = data;

  return (
    <main className="container">
      <article className={styles.details}>
        <section className={styles['cover-section']}>
          <img src={getCoverUrl(book.slug, book.coverUrl)} alt={book.title} />
          {book.storeUrl && (
            <a
              className={styles.buy}
              href={book.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Comprar ${book.title}`}
            >
              <span className={styles.text}>Comprar</span>
              <span className={styles.icon} aria-hidden="true">
                <CartIcon />
              </span>
            </a>
          )}
        </section>

        <BookHeader title={book.title} authors={book.authors} genres={book.genres} />

        {book.description.length > 0 && (
          <section className={styles['synopsis-section']}>
            <h3>Sinopse</h3>
            <BlocksRenderer content={book.description} />
          </section>
        )}

        <section className={styles.info}>
          <BookTechnicalInfo
            isbn={book.isbn}
            genres={book.genres}
            pages={book.pages}
            format={book.format}
            publishingYear={book.publishingYear}
            collection={book.collection}
          />
          <div className={styles.sample}>
            {book.sampleUrl && (
              <a
                className={styles['sample-link']}
                href={book.sampleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ler amostra
              </a>
            )}
          </div>
        </section>

        <RelatedBooks slug={book.slug} />
      </article>
    </main>
  );
}
