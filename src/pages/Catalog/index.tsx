import { useBooksQuery } from '@/queries/books';
import styles from './Catalog.module.css';
import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';
import { Loading } from '@/components/Loading';
import type { Book } from '@/api/books';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { getCoverUrl } from '@/utils/covers';

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pagina = searchParams.get('pagina');
  const tamanho = searchParams.get('tamanho');
  const busca = searchParams.get('busca') ?? '';

  const { data, isLoading, isError, isPlaceholderData } = useBooksQuery({
    page: Number(pagina) || 1,
    pageSize: Number(tamanho) || 24,
    search: busca,
  });

  const books = data?.data ?? [];
  // `keepPreviousData` mantém os resultados do termo anterior na tela enquanto o novo
  // carrega; o estado vazio não pode ler desse snapshot velho.
  const isStale = isPlaceholderData;
  const showLoading = isLoading || (isStale && books.length === 0);
  const showEmpty = !!data && !isStale && !isError && books.length === 0;

  const handleSearch = (term: string) => {
    // Instância nova em vez de mutar a do hook: aqui é preciso remover chaves.
    const next = new URLSearchParams(searchParams);

    if (term) {
      next.set('busca', term);
    } else {
      next.delete('busca');
    }

    next.delete('pagina'); // termo novo sempre recomeça na página 1
    setSearchParams(next);
    window?.scrollTo(0, 0);
  };

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

        <SearchBar
          term={busca}
          onSearch={handleSearch}
          label="Buscar livros por título, autor ou coleção"
          placeholder="Busque por título, autor ou coleção"
        />

        {showLoading && <Loading />}
        {isError && (
          <DefaultErrorMessage
            title="Erro ao buscar catálogo :("
            message="Não conseguimos buscar nossos livros no momento. Verifique se o link está correto ou tente novamente mais tarde!"
          />
        )}
        {showEmpty && <EmptyState term={busca} />}
        {books.length > 0 && !isError && <Books books={books} isStale={isStale} />}
        {data?.pagination && (
          <Pagination pagination={data.pagination} onPageChange={handlePageChange} />
        )}
      </section>
    </main>
  );
}

interface BooksProps {
  books: Book[];
  isStale?: boolean;
}

function Books({ books, isStale }: BooksProps) {
  return (
    <ul aria-busy={isStale} className={`${styles['books-list']} ${isStale ? styles.stale : ''}`}>
      {books.map((book) => (
        <li className={styles['books-list-item']} key={book.slug}>
          <Book book={book} />
        </li>
      ))}
    </ul>
  );
}

interface EmptyStateProps {
  term: string;
}

function EmptyState({ term }: EmptyStateProps) {
  return (
    <p className={styles['empty-state']} role="status">
      {term ? `Nenhum livro encontrado para “${term}”.` : 'Nenhum livro disponível no momento.'}
    </p>
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
          <img
            src={getCoverUrl(book.slug, book.coverUrl)}
            alt={book.title}
            className={styles.cover}
            loading="lazy"
          />
        </div>
        <h3 className={styles.title}>{book.title}</h3>
        <h4 className={styles.authors}>{book.autoria}</h4>
      </Link>
    </article>
  );
}
