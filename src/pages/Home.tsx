import { BookCatalog } from "../components/BookCatalog";
import { BookCollections } from "../components/BookCollections";

export function Home() {
  return (
    <main>
      <BookCatalog />
      <BookCollections />
    </main>
  );
}
