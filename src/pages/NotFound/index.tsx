import { DefaultErrorMessage } from '@/components/DefaultErrorMessage';

export function NotFound() {
  return (
    <main className="container">
      <DefaultErrorMessage
        title="Não encontramos o que você procura :("
        message="Verifique se o link que você digitou está correto ou tente novamente mais tarde."
      />
    </main>
  );
}
