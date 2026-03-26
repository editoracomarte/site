import { useParams, Link } from "react-router-dom";
import booksData from "../db/books.json";
import styles from "../components/BookDetail.module.css";
import { BookHeader } from "../components/BookHeader";
import { BookPriceSection } from "../components/BookPrice";
import { BookTechnicalInfo } from "../components/BookTechnicalInfo";

export function BookDetails() {
  const { slug } = useParams<{ slug: string }>();
  const book = booksData.find((b) => b.slug === slug);

  if (!book) {
    return (
      <main className={styles.container}>
        <div className={styles.notFound}>
          <h1>Livro não encontrado</h1>
          <p>Desculpe, não conseguimos encontrar este livro.</p>
          <Link to="/" className={styles.backLink}>
            Voltar para início
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Voltar
      </Link>

      <article className={styles.detail}>
        {/* Header with Title, Author, and Tags */}

        {/* Cover Image */}
        <div className={styles.coverSection}>
          <img
            src={`/covers/${book.cover_url}`}
            alt={book.title}
            className={styles.cover}
          />
        </div>

        <BookHeader
          title={book.title}
          author={book.author}
          genre={book.gender}
        />

        {/* Price Section with Shopping Cart Button */}
        <BookPriceSection price={book.price} />

        {/* Synopsis Section */}
        <section className={styles.synopsisSection}>
          <h2 className={styles.sectionTitle}>Sinopse</h2>
          <p className={styles.synopsis}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
            blanditiis obcaecati debitis in maxime libero expedita omnis magnam.
            Magnam, pariatur, iusto autem maiores distinctio corrupti
            exercitationem vitae nostrum consequatur, voluptatem illum? Ipsam
            facere numquam fuga magnam ad minus sunt libero at. Expedita, vitae
            aut quidem, deserunt animi corporis consequatur minima eveniet alias
            blanditiis illum inventore dolor molestias, repellat molestiae minus
            tenetur voluptate quod facilis totam sed excepturi impedit. Odio
            dolore labore corporis debitis iste temporibus deserunt ad aut iusto
            nostrum ut, illo corrupti iure quasi enim autem. Eius blanditiis
            assumenda voluptatum repellendus pariatur temporibus consequuntur
            itaque ab nemo facilis cumque reiciendis minima, nobis ex modi
            similique ad necessitatibus optio vero quod distinctio numquam?
            Nisi, aliquam eligendi! Eaque sed doloribus architecto.
          </p>
        </section>

        {/* Technical Information */}
        <BookTechnicalInfo
          isbn={book.isbn}
          genre={book.gender}
          pages={book.page_num}
          format={book.format}
          publishingYear={book.publishing_year}
          collection={book.collection}
        />

        {/* Related Books Section */}
        <section className={styles.relatedBooksSection}>
          <h2 className={styles.sectionTitle}>Livros Relacionados</h2>
          <div className={styles.relatedBooksPlaceholder}>
            <p>Espaço reservado para livros relacionados</p>
          </div>
        </section>
      </article>
    </main>
  );
}
