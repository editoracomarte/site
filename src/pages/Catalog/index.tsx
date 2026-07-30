import { Link, useSearchParams } from 'react-router-dom';
import { useBooksQuery } from '@/queries/books';
import { useCollectionsQuery } from '@/queries/collections';
import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';
import { Loading } from '@/components/Loading';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import type { Book } from '@/api/books';
import styles from './Catalog.module.css';
import { FilterPill } from '@/components/FilterPill';
import { getCoverUrl } from '@/utils/covers';

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pagina = searchParams.get('pagina');
  const tamanho = searchParams.get('tamanho');
  const busca = searchParams.get('busca') ?? '';
  const colecao = searchParams.get('colecao') ?? '';

  const { data, isLoading, isError, isPlaceholderData } = useBooksQuery({
    page: Number(pagina) || 1,
    pageSize: Number(tamanho) || 24,
    search: busca,
    collectionSlug: colecao,
  });
  const { data: collections } = useCollectionsQuery();
  const collectionName = collections?.find((c) => c.slug === colecao)?.name ?? '';

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

  const handleCollectionChange = (slug: string) => {
    const next = new URLSearchParams(searchParams);

    if (slug) {
      next.set('colecao', slug);
    } else {
      next.delete('colecao');
    }

    next.delete('pagina'); // filtro novo sempre recomeça na página 1
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

        <div className={styles['search-row']}>
          {collections && collections.length > 0 && (
            <FilterPill
              label="Coleção"
              allLabel="Todas"
              options={collections.map((c) => ({ value: c.slug, label: c.name }))}
              value={colecao}
              onChange={handleCollectionChange}
            />
          )}

          <SearchBar
            term={busca}
            onSearch={handleSearch}
            label="Buscar livros por título, autor ou coleção"
            placeholder="Busque por título, autor ou coleção"
          />
        </div>

        {showLoading && <Loading />}
        {isError && (
          <DefaultErrorMessage
            title="Erro ao buscar catálogo :("
            message="Não conseguimos buscar nossos livros no momento. Verifique se o link está correto ou tente novamente mais tarde!"
          />
        )}
        {showEmpty && <EmptyState term={busca} collectionName={collectionName} />}
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
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}

interface EmptyStateProps {
  term: string;
  collectionName?: string;
}

function EmptyState({ term, collectionName }: EmptyStateProps) {
  const message = getEmptyStateMessage(term, collectionName);

  return (
    <p className={styles['empty-state']} role="status">
      {message}
    </p>
  );
}

function getEmptyStateMessage(term: string, collectionName?: string) {
  if (term && collectionName) {
    return `Nenhum livro encontrado para “${term}” na coleção “${collectionName}”.`;
  }

  if (term) {
    return `Nenhum livro encontrado para “${term}”.`;
  }

  if (collectionName) {
    return `Nenhum livro encontrado na coleção “${collectionName}”.`;
  }

  return 'Nenhum livro disponível no momento.';
}

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
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
      </Link>
      {book.authors?.length ? (
        <h4 className={styles.authors}>
          {book.authors.map((author, i) => (
            <span key={author.slug}>
              {i > 0 && ', '}
              <Link to={`/autores/${author.slug}`} className={styles['author-link']}>
                {author.name}
              </Link>
            </span>
          ))}
        </h4>
      ) : null}
    </article>
  );
}
