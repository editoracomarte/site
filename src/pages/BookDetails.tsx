import { useParams, Link } from "react-router-dom";
import booksData from "../db/books.json";
import styles from "./BookDetails.module.css";
import { BookHeader } from "../components/BookHeader";
import { BookTechnicalInfo } from "../components/BookTechnicalInfo";

export function BookDetails() {
  const { slug } = useParams<{ slug: string }>();
  const book = booksData.find((b) => b.slug === slug);

  if (!book) {
    return (
      <main className={styles["not-found"]}>
        <h2>Livro não encontrado</h2>
        <p>Desculpe, não conseguimos encontrar este livro em nosso catálogo.</p>
        <Link to="/" className={styles.backLink}>
          Voltar para início
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <article className={styles.details}>
        <section className={styles["cover-section"]}>
          <img src={`/covers/${book.cover_url}`} alt={book.title} />
        </section>

        <BookHeader
          title={book.title}
          author={book.author}
          genres={book.genres}
        />

        <section className={styles["synopsis-section"]}>
          <h3>Sinopse</h3>
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

        <BookTechnicalInfo
          isbn={book.isbn}
          genres={book.genres}
          pages={book.page_num}
          format={book.format}
          publishingYear={book.publishing_year}
          collection={book.collection}
        />

        <section>
          <h3>Livros Relacionados</h3>
          <div className={styles["related-books-placeholder"]}>
            <p>Espaço reservado para livros relacionados</p>
          </div>
        </section>
      </article>
    </main>
  );
}
