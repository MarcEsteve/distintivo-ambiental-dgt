import type { FormEvent } from "react";

export interface SearchFormProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  cargando?: boolean;
}

export function SearchForm({
  query,
  onQueryChange,
  onSubmit,
  cargando = false,
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="dgt-form">
      <input
        className="dgt-input"
        placeholder="Ej: 1234ABC"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Matrícula"
        disabled={cargando}
      />
      <button className="dgt-button" disabled={cargando} type="submit">
        {cargando ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}

export default SearchForm;
