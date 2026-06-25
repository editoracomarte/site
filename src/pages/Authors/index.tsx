import { Link, useSearchParams } from 'react-router-dom';
import { Loading } from '@/components/Loading';
import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';
import { useAuthorsQuery } from '@/queries/authors';

import styles from './Authors.module.css';
import type { Author } from '@/api/authors';
import { Pagination } from '@/components/Pagination';
import { useMemo } from 'react';

export function Authors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pagina = searchParams.get('pagina');
  const tamanho = searchParams.get('tamanho');

  const {
    data: authors,
    isLoading,
    isError,
  } = useAuthorsQuery({
    page: Number(pagina) || 1,
    pageSize: Number(tamanho) || 100,
  });

  const handlePageChange = (page: number) => {
    searchParams.set('pagina', String(page));
    setSearchParams(searchParams);
    window?.scrollTo(0, 0);
  };

  return (
    <main className="container">
      <section className={styles.authors}>
        <h1>
          <span className={styles.paper}>Autores</span>
        </h1>
        {isLoading && <Loading />}
        {isError && (
          <DefaultErrorMessage
            title="Erro ao buscar autores :("
            message="Não conseguimos buscar nossos autores no momento. Verifique se o link está correto ou tente novamente mais tarde!"
          />
        )}
        {authors && <AuthorsList authors={authors.data} />}
        {authors?.pagination && (
          <Pagination pagination={authors.pagination} onPageChange={handlePageChange} />
        )}
      </section>
    </main>
  );
}

function normalizeLetter(name: string) {
  const firstChar = name.trim().charAt(0).toUpperCase();

  return firstChar.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function groupAuthorsByLetter(authors: Author[]) {
  return authors.reduce<Record<string, Author[]>>((groups, author) => {
    const letter = normalizeLetter(author.name);

    if (!groups[letter]) {
      groups[letter] = [];
    }

    groups[letter].push(author);
    return groups;
  }, {});
}

function AuthorsList({ authors }: { authors: Author[] }) {
  const groups = useMemo(() => groupAuthorsByLetter(authors), [authors]);
  const letters = Object.keys(groups);

  return (
    <ul className={styles['authors-list']} aria-label="Lista de autores">
      {letters.map((letter) => (
        <section
          key={letter}
          aria-labelledby={`letter-${letter}`}
          className={styles['letter-group']}
        >
          <h2 id={`letter-${letter}`} className={styles.letter}>
            {letter}
          </h2>

          <ul>
            {groups[letter].map((author) => (
              <li key={author.slug}>
                <Link to={`/autores/${author.slug}`} className={styles.author}>
                  <h3 className={styles['author-name']}>{author.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </ul>
  );
}
