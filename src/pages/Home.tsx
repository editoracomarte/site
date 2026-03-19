import { BookCatalog } from "../components/BookCatalog";
import { BookCollections } from "../components/BookCollections";
import { InstagramFeed } from "../components/InstagramFeed";

export function Home() {
  return (
    <main>
      <BookCatalog />
      <BookCollections />
      <InstagramFeed />
    </main>
  );
}
