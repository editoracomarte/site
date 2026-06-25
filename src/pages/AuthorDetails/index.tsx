import { useParams, Link } from 'react-router-dom';
import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';
import { useAuthorQuery } from '@/queries/authors';
import { Loading } from '@/components/Loading';

import styles from './AuthorDetails.module.css';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export function AuthorDetails() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: author,
    isLoading,
    isError,
  } = useAuthorQuery({
    slug: slug ?? '',
  });

  return (
    <main className="container">
      {isLoading && <Loading />}
      {isError && (
        <DefaultErrorMessage
          title="Autor não encontrado :("
          message="Desculpe, não conseguimos encontrar este autor em nosso catálogo."
        />
      )}
      {author && author?.data && (
        <>
          <section>
            <h2>{author?.data.name}</h2>
          </section>
          <section>
            <BlocksRenderer content={author?.data.description as any} />
          </section>
        </>
      )}
    </main>
  );
}
