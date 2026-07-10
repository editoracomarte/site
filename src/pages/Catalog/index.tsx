import { useBooksQuery } from '@/queries/books';
import styles from './Catalog.module.css';
import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';
import { Loading } from '@/components/Loading';
import type { Book } from '@/api/books';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from '@/components/Pagination';

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pagina = searchParams.get('pagina');
  const tamanho = searchParams.get('tamanho');

  const {
    data: books,
    isLoading,
    isError,
  } = useBooksQuery({
    page: Number(pagina) || 1,
    pageSize: Number(tamanho) || 24,
  });

  const handlePageChange = (page: number) => {
    searchParams.set('pagina', String(page));
    setSearchParams(searchParams);
    window?.scrollTo(0, 0);
  };

  return (
    <main className="container">
      <section className={styles.catalog}>
        <h1>
          <span className={styles.paper}>Catálogo</span>
        </h1>
        {isLoading && <Loading />}
        {isError && (
          <DefaultErrorMessage
            title="Erro ao buscar catálogo :("
            message="Não conseguimos buscar nossos livros no momento. Verifique se o link está correto ou tente novamente mais tarde!"
          />
        )}
        {books && <Books books={books.data} />}
        {books?.pagination && (
          <Pagination pagination={books.pagination} onPageChange={handlePageChange} />
        )}
      </section>
    </main>
  );
}

interface BooksProps {
  books: Book[];
}

function Books({ books }: BooksProps) {
  return (
    <ul className={styles['books-list']}>
      {books.map((book) => (
        <li className={styles['books-list-item']} key={book.slug}>
          <Book book={book} />
        </li>
      ))}
    </ul>
  );
}

interface BookProps {
  book: Book;
}

function Book({ book }: BookProps) {
  return (
    <article className={styles.book}>
      <Link to={`/catalogo/${book.slug}`} style={{ textDecoration: 'none' }}>
        <div className={styles['cover-wrapper']}>
          <img src="/covers/A_Galinha_dos_Ovos_Verdes-600x600.png" className={styles.cover} />
        </div>
        <h3 className={styles.title}>{book.title}</h3>
        <h4 className={styles.authors}>{book.autoria}</h4>
      </Link>
    </article>
  );
}
