import { useState } from 'react';
import type { FormEvent } from 'react';
import { SearchIcon } from '@/components/SearchIcon';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  term: string;
  onSearch: (term: string) => void;
  label: string;
  placeholder?: string;
  id?: string;
}

export function SearchBar({ term, onSearch, label, placeholder, id = 'busca' }: SearchBarProps) {
  const [value, setValue] = useState(term);
  const [committed, setCommitted] = useState(term);

  // Ressincroniza a caixa quando o termo confirmado muda de fora (voltar/avançar do
  // navegador). Digitar não altera `term`, então isso nunca briga com quem está digitando.
  // Ajuste durante a render, não em efeito: não gera render extra nem tira o foco do campo.
  if (term !== committed) {
    setCommitted(term);
    setValue(term);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form className={styles.search} role="search" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>

      <div className={styles.field}>
        <input
          autoComplete="off"
          className={styles.input}
          id={id}
          name={id}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={value}
        />

        {value.length > 0 && (
          <button className={styles.clear} onClick={handleClear} type="button">
            <span aria-hidden="true">×</span>
            <span className="sr-only">Limpar busca</span>
          </button>
        )}
      </div>

      <button className={styles.submit} type="submit">
        <SearchIcon />
        <span className="sr-only">Buscar</span>
      </button>
    </form>
  );
}
