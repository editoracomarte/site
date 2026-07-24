import { Link, useParams } from 'react-router-dom';
import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';
import { useAuthorQuery } from '@/queries/authors';
import { useBooksBySlugQueries } from '@/queries/books';
import { Loading } from '@/components/Loading';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import styles from './AuthorDetails.module.css';

export function AuthorDetails() {
  const { slug } = useParams<{ slug: string }>();

  const { data: author, isLoading, isError } = useAuthorQuery({ slug: slug ?? '' });

  const bookSlugs = author?.books?.map((b) => b.slug) ?? [];
  const bookQueries = useBooksBySlugQueries(bookSlugs);

  return (
    <main className="container">
      {isLoading && <Loading />}
      {isError && (
        <DefaultErrorMessage
          title="Autor não encontrado :("
          message="Desculpe, não conseguimos encontrar este autor em nosso catálogo."
        />
      )}
      {author && (
        <>
          <section>
            <h2>{author.name}</h2>
          </section>
          {author.description && (
            <section>
              <BlocksRenderer content={author.description} />
            </section>
          )}
          {author.books && author.books.length > 0 && (
            <section className={styles.books}>
              <h3>Livros</h3>
              <ul className={styles.booksList}>
                {author.books.map((book, i) => (
                  <li key={book.slug}>
                    <Link to={`/catalogo/${book.slug}`} className={styles.bookCard}>
                      <div className={styles.coverWrapper}>
                        <img
                          src={bookQueries[i]?.data?.coverUrl ?? 'https://placehold.co/600x600'}
                          alt={book.title}
                          className={styles.cover}
                        />
                      </div>
                      <p className={styles.bookTitle}>{book.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  );
}
