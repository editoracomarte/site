type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination">
      <ul
        style={{
          display: 'flex',
          gap: '0.5rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          alignItems: 'center',
        }}
      >
        <li>
          <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
        </li>

        {Array.from({ length: pageCount }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <li key={pageNumber}>
              <button
                type="button"
                onClick={() => onPageChange(pageNumber)}
                aria-current={page === pageNumber ? 'page' : undefined}
                style={{
                  fontWeight: page === pageNumber ? 'bold' : 'normal',
                }}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === pageCount}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
