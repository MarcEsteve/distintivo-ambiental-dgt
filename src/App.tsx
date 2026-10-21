import { useState } from "react";
import { Vehiculo, type VehiculoData, type DistintivoAmbiental } from "./componentes/Vehiculo";
import "./styles/dgt.css";

type Registro = {
  matricula: string;
  codigo: string;
  marca?: string;
  modelo?: string;
  combustible?: string;
  anio?: number | string;
  categoria?: string;
  emisionesEuro?: string;
};

// Normaliza la matrícula: mayúsculas, sin espacios/guiones
const normalizePlate = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

// Decodifica el “código DGT” a distintivo oficial
const decodeDistintivo = (
  codigo: string
): DistintivoAmbiental => {
  const x = codigo.trim().toUpperCase();
  if (x.includes("SIN")) return "SIN";
  if (x.includes("CERO") || x === "0" || x.includes("0 EMISION")) return "CERO";
  // Patrones habituales “16TB/16TC/16TE”, y variantes de moto “16MB/16MC”
  if (x.endsWith("B")) return "B";
  if (x.endsWith("C")) return "C";
  if (x.endsWith("E")) return "ECO";
  // Fallback: SIN
  return "SIN";
};

export default function App() {
  const [query, setQuery] = useState("");
  const [encontrado, setEncontrado] = useState<VehiculoData | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizePlate(query);
    if (!normalized) {
      setEncontrado(null);
      setNoMatch(false);
      setError(null);
      return;
    }

    setCargando(true);
    setError(null);
    setEncontrado(null);
    setNoMatch(false);

    try {
      // Petición asíncrona al endpoint de datos de vehículos
      const response = await fetch("/data/matriculas.json");
      if (!response.ok) {
        throw new Error("No se pudo obtener la base de datos de vehículos.");
      }

      const data: Registro[] = await response.json();
      const row = data.find((r) => normalizePlate(r.matricula) === normalized);

      if (!row) {
        setEncontrado(null);
        setNoMatch(true);
      } else {
        const distintivo = decodeDistintivo(row.codigo);
        setEncontrado({
          matricula: row.matricula,
          distintivo,
          codigo: row.codigo,
          marca: row.marca,
          modelo: row.modelo,
          combustible: row.combustible,
          anio: row.anio,
          categoria: row.categoria,
          emisionesEuro: row.emisionesEuro,
        });
        setNoMatch(false);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al realizar la consulta del distintivo ambiental."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="dgt-app">
      <div className="logo-header">
        <img src="/assets/logo_dgt.svg" alt="DGT" width={222} />
      </div>
      <header className="dgt-header">
        <div className="dgt-brand">
          <h1>Consulta de distintivo ambiental</h1>
        </div>
        <p className="dgt-sub">
          Introduce la matrícula exacta para consultar el distintivo
        </p>
      </header>

      <main className="dgt-main">
        {/* Mejora: generar un componentes de <SearchForm className="tsx"></SearchForm> */}
        <form onSubmit={onSubmit} className="dgt-form">
          <input
            className="dgt-input"
            placeholder="Ej: 1234ABC"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Matrícula"
            disabled={cargando}
          />
          <button className="dgt-button" disabled={cargando}>
            {cargando ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {cargando && (
          <p className="dgt-muted">Consultando registro de vehículos...</p>
        )}

        {error && (
          <p className="dgt-muted" style={{ color: "#dc2626" }}>
            {error}
          </p>
        )}

        {/* 🔽 Resultado mediante el componente modular Vehiculo */}
        {encontrado && <Vehiculo vehiculo={encontrado} />}

        {noMatch && query && !cargando && (
          <p className="dgt-muted">
            No se ha encontrado la matrícula introducida.
          </p>
        )}
      </main>

      <footer className="dgt-footer">
        <small>© DGT · Demo educativa 2026</small>
      </footer>
    </div>
  );
}
