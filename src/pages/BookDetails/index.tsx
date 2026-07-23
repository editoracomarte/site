import { useParams, Link } from 'react-router-dom';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { useBookQuery } from '@/queries/books';
import { Loading } from '@/components/Loading';
import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';
import { BookHeader } from '@/components/BookHeader';
import { BookTechnicalInfo } from '@/components/BookTechnicalInfo';
import { CartIcon } from '@/components/CartIcon';
import booksData from '@/db/books.json';
import styles from './BookDetails.module.css';

const slugToCover: Record<string, string> = Object.fromEntries(
  booksData.map((b) => [b.slug, b.cover_url]),
);

function getCoverUrl(slug: string, apiUrl?: string): string {
  if (apiUrl) return apiUrl;
  const filename = slugToCover[slug];
  if (filename) return `/covers/${filename}`;
  return 'https://placehold.co/600x600';
}

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
          <Link className={styles.buy} to="#">
            <span className={styles.text}>Comprar</span>
            <span className={styles.icon} aria-hidden="true">
              <CartIcon />
            </span>
          </Link>
        </section>

        <BookHeader title={book.title} author={book.autoria} genres={book.genres} />

        {book.description.length > 0 && (
          <section className={styles['synopsis-section']}>
            <h3>Sinopse</h3>
            <BlocksRenderer content={book.description as unknown as BlocksContent} />
          </section>
        )}

        <BookTechnicalInfo
          isbn={book.isbn}
          genres={book.genres}
          pages={book.pages}
          format={book.format}
          publishingYear={book.publishingYear}
          collection={book.collection}
        />

        <section>
          <h3>Livros Relacionados</h3>
          <div className={styles['related-books-placeholder']}>
            <p>Espaço reservado para livros relacionados</p>
          </div>
        </section>
      </article>
    </main>
  );
}
