import type { StrapiMetaPagination } from '@/api/types';
import styles from './Pagination.module.css';

type PaginationProps = {
  pagination: StrapiMetaPagination;
  onPageChange: (page: number) => void;
};

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, pageCount } = pagination;

  if (pageCount <= 1) {
    return <></>;
  }

  return (
    <nav aria-label="Paginação" className={styles.pagination}>
      <ul>
        <li>
          <button
            className={styles.page}
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            type="button"
          >
            Anterior
          </button>
        </li>

        {Array.from({ length: pageCount }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <li key={pageNumber}>
              <button
                aria-current={pageNumber === page ? 'page' : undefined}
                className={`
                  ${styles.page} ${pageNumber === page ? styles.current : ''}
                `}
                onClick={() => onPageChange(pageNumber)}
                type="button"
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li>
          <button
            className={styles.page}
            disabled={page === pageCount}
            onClick={() => onPageChange(page + 1)}
            type="button"
          >
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
}
